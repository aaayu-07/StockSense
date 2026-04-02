from __future__ import annotations

from datetime import date, timedelta

import numpy as np
import pandas as pd
import yfinance as yf
from sqlalchemy import delete, select
from sqlalchemy.orm import Session

from models import StockRecord


COMPANIES = {
    "INFY": {"ticker": "INFY.NS", "name": "Infosys"},
    "TCS": {"ticker": "TCS.NS", "name": "Tata Consultancy Services"},
    "RELIANCE": {"ticker": "RELIANCE.NS", "name": "Reliance Industries"},
    "HDFCBANK": {"ticker": "HDFCBANK.NS", "name": "HDFC Bank"},
    "ICICIBANK": {"ticker": "ICICIBANK.NS", "name": "ICICI Bank"},
    "WIPRO": {"ticker": "WIPRO.NS", "name": "Wipro"},
}


def normalize_symbol(symbol: str) -> str:
    normalized = symbol.strip().upper()
    if normalized not in COMPANIES:
        raise ValueError(f"Unsupported stock symbol: {symbol}")
    return normalized


def list_companies() -> list[dict]:
    return [
        {
            "symbol": symbol,
            "name": details["name"],
        }
        for symbol, details in COMPANIES.items()
    ]


def _prepare_dataframe(raw_df: pd.DataFrame) -> pd.DataFrame:
    if raw_df.empty:
        raise ValueError("No stock data returned from yfinance.")

    if isinstance(raw_df.columns, pd.MultiIndex):
        raw_df.columns = [column[0] for column in raw_df.columns]

    df = raw_df.reset_index().copy()
    df.columns = [str(column).lower().replace(" ", "_") for column in df.columns]

    required_columns = ["date", "open", "high", "low", "close", "volume"]
    missing = [column for column in required_columns if column not in df.columns]
    if missing:
        raise ValueError(f"Missing expected columns from data source: {missing}")

    df = df[required_columns]
    df["date"] = pd.to_datetime(df["date"]).dt.date
    df[["open", "high", "low", "close", "volume"]] = df[
        ["open", "high", "low", "close", "volume"]
    ].replace([np.inf, -np.inf], np.nan)
    df = df.dropna(subset=["open", "high", "low", "close"]).sort_values("date")
    df["volume"] = df["volume"].fillna(0)

    df["daily_return"] = np.where(
        df["open"] != 0,
        (df["close"] - df["open"]) / df["open"],
        0.0,
    )
    df["moving_average_7"] = df["close"].rolling(window=7, min_periods=1).mean()
    return df


def _cache_records(db: Session, symbol: str, dataframe: pd.DataFrame) -> None:
    company_name = COMPANIES[symbol]["name"]
    dates = dataframe["date"].tolist()

    if dates:
        db.execute(
            delete(StockRecord).where(
                StockRecord.symbol == symbol,
                StockRecord.trade_date.in_(dates),
            )
        )

    for row in dataframe.to_dict(orient="records"):
        db.add(
            StockRecord(
                symbol=symbol,
                company_name=company_name,
                trade_date=row["date"],
                open_price=float(row["open"]),
                high_price=float(row["high"]),
                low_price=float(row["low"]),
                close_price=float(row["close"]),
                volume=float(row["volume"]),
                daily_return=float(row["daily_return"]),
                moving_average_7=float(row["moving_average_7"])
                if pd.notna(row["moving_average_7"])
                else None,
            )
        )

    db.commit()


def _load_cached_dataframe(db: Session, symbol: str, min_date: date) -> pd.DataFrame:
    records = db.execute(
        select(StockRecord)
        .where(StockRecord.symbol == symbol, StockRecord.trade_date >= min_date)
        .order_by(StockRecord.trade_date.asc())
    ).scalars()

    rows = [
        {
            "date": record.trade_date,
            "open": record.open_price,
            "high": record.high_price,
            "low": record.low_price,
            "close": record.close_price,
            "volume": record.volume,
            "daily_return": record.daily_return,
            "moving_average_7": record.moving_average_7,
        }
        for record in records
    ]
    return pd.DataFrame(rows)


def _needs_refresh(dataframe: pd.DataFrame) -> bool:
    if dataframe.empty:
        return True
    return dataframe["date"].max() < date.today() - timedelta(days=1)


def _fetch_and_cache(db: Session, symbol: str, lookback_days: int) -> pd.DataFrame:
    ticker = COMPANIES[symbol]["ticker"]
    period_days = max(lookback_days + 10, 370)
    raw_df = yf.download(ticker, period=f"{period_days}d", interval="1d", progress=False)
    prepared_df = _prepare_dataframe(raw_df)
    _cache_records(db, symbol, prepared_df)
    return prepared_df


def get_stock_dataframe(db: Session, symbol: str, days: int = 30) -> pd.DataFrame:
    normalized_symbol = normalize_symbol(symbol)
    min_date = date.today() - timedelta(days=max(days + 7, 370))
    cached_df = _load_cached_dataframe(db, normalized_symbol, min_date)

    if _needs_refresh(cached_df):
        cached_df = _fetch_and_cache(db, normalized_symbol, max(days, 365))

    cutoff_date = date.today() - timedelta(days=days)
    filtered_df = (
        cached_df[cached_df["date"] >= cutoff_date]
        .sort_values("date")
        .reset_index(drop=True)
    )
    if filtered_df.empty:
        raise ValueError(f"No stock data available for {normalized_symbol}.")
    return filtered_df


def get_stock_data(db: Session, symbol: str, days: int = 30) -> dict:
    df = get_stock_dataframe(db, symbol, days)
    normalized_symbol = normalize_symbol(symbol)

    return {
        "symbol": normalized_symbol,
        "company_name": COMPANIES[normalized_symbol]["name"],
        "days": days,
        "data": [
            {
                "date": row["date"].isoformat(),
                "open": round(float(row["open"]), 2),
                "high": round(float(row["high"]), 2),
                "low": round(float(row["low"]), 2),
                "close": round(float(row["close"]), 2),
                "volume": int(row["volume"]),
                "daily_return": round(float(row["daily_return"]), 4),
                "moving_average_7": round(float(row["moving_average_7"]), 2),
            }
            for row in df.to_dict(orient="records")
        ],
    }


def calculate_volatility_score(df: pd.DataFrame) -> float:
    volatility = float(df["daily_return"].std(ddof=0) or 0.0)
    annualized = volatility * np.sqrt(252) * 100
    return round(annualized, 2)


def get_summary(db: Session, symbol: str) -> dict:
    full_year_df = get_stock_dataframe(db, symbol, 365)
    normalized_symbol = normalize_symbol(symbol)

    return {
        "symbol": normalized_symbol,
        "company_name": COMPANIES[normalized_symbol]["name"],
        "fifty_two_week_high": round(float(full_year_df["high"].max()), 2),
        "fifty_two_week_low": round(float(full_year_df["low"].min()), 2),
        "average_close_price": round(float(full_year_df["close"].mean()), 2),
        "volatility_score": calculate_volatility_score(full_year_df),
        "latest_close": round(float(full_year_df["close"].iloc[-1]), 2),
        "latest_daily_return": round(float(full_year_df["daily_return"].iloc[-1] * 100), 2),
    }


def compare_performance(db: Session, symbol1: str, symbol2: str, days: int = 30) -> dict:
    first_df = get_stock_dataframe(db, symbol1, days)
    second_df = get_stock_dataframe(db, symbol2, days)
    normalized_symbol1 = normalize_symbol(symbol1)
    normalized_symbol2 = normalize_symbol(symbol2)

    def performance(df: pd.DataFrame) -> float:
        start_close = float(df["close"].iloc[0])
        end_close = float(df["close"].iloc[-1])
        if start_close == 0:
            return 0.0
        return round(((end_close - start_close) / start_close) * 100, 2)

    def chart_rows(df: pd.DataFrame) -> list[dict]:
        return [
            {"date": row["date"].isoformat(), "close": round(float(row["close"]), 2)}
            for row in df.to_dict(orient="records")
        ]

    return {
        "days": days,
        "symbol1": {
            "symbol": normalized_symbol1,
            "company_name": COMPANIES[normalized_symbol1]["name"],
            "performance_percent": performance(first_df),
            "volatility_score": calculate_volatility_score(first_df),
            "data": chart_rows(first_df),
        },
        "symbol2": {
            "symbol": normalized_symbol2,
            "company_name": COMPANIES[normalized_symbol2]["name"],
            "performance_percent": performance(second_df),
            "volatility_score": calculate_volatility_score(second_df),
            "data": chart_rows(second_df),
        },
    }


def get_market_movers(db: Session) -> dict:
    movers = []

    for symbol in COMPANIES:
        df = get_stock_dataframe(db, symbol, 7)
        if len(df) < 2:
            continue

        previous_close = float(df["close"].iloc[-2])
        current_close = float(df["close"].iloc[-1])
        change_percent = 0.0
        if previous_close != 0:
            change_percent = ((current_close - previous_close) / previous_close) * 100

        movers.append(
            {
                "symbol": symbol,
                "company_name": COMPANIES[symbol]["name"],
                "current_close": round(current_close, 2),
                "change_percent": round(change_percent, 2),
            }
        )

    sorted_movers = sorted(movers, key=lambda item: item["change_percent"], reverse=True)
    return {
        "top_gainers": sorted_movers[:2],
        "top_losers": sorted(sorted_movers[-2:], key=lambda item: item["change_percent"]),
    }
