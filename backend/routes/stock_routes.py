from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from database import get_db
from services.stock_service import (
    compare_performance,
    get_market_movers,
    get_stock_data,
    get_summary,
    list_companies,
)


router = APIRouter(tags=["Stocks"])


@router.get("/companies")
def companies():
    return {"companies": list_companies()}


@router.get("/market-movers")
def market_movers(db: Session = Depends(get_db)):
    try:
        return get_market_movers(db)
    except Exception as error:
        raise HTTPException(status_code=500, detail=f"Unable to fetch market movers: {error}") from error


@router.get("/data/{symbol}")
def stock_data(
    symbol: str,
    days: int = Query(default=30, ge=30, le=90),
    db: Session = Depends(get_db),
):
    try:
        return get_stock_data(db, symbol, days)
    except ValueError as error:
        raise HTTPException(status_code=404, detail=str(error)) from error
    except Exception as error:
        raise HTTPException(status_code=500, detail=f"Unable to fetch stock data: {error}") from error


@router.get("/summary/{symbol}")
def stock_summary(
    symbol: str,
    db: Session = Depends(get_db),
):
    try:
        return get_summary(db, symbol)
    except ValueError as error:
        raise HTTPException(status_code=404, detail=str(error)) from error
    except Exception as error:
        raise HTTPException(status_code=500, detail=f"Unable to build stock summary: {error}") from error


@router.get("/compare")
def compare_stocks(
    symbol1: str = Query(..., min_length=1),
    symbol2: str = Query(..., min_length=1),
    days: int = Query(default=30, ge=30, le=90),
    db: Session = Depends(get_db),
):
    try:
        return compare_performance(db, symbol1, symbol2, days)
    except ValueError as error:
        raise HTTPException(status_code=404, detail=str(error)) from error
    except Exception as error:
        raise HTTPException(status_code=500, detail=f"Unable to compare stocks: {error}") from error
