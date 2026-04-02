from sqlalchemy import Column, Date, DateTime, Float, Integer, String, UniqueConstraint
from sqlalchemy.sql import func

from database import Base


class StockRecord(Base):
    __tablename__ = "stock_records"
    __table_args__ = (UniqueConstraint("symbol", "trade_date", name="uq_symbol_trade_date"),)

    id = Column(Integer, primary_key=True, index=True)
    symbol = Column(String(20), index=True, nullable=False)
    company_name = Column(String(100), nullable=False)
    trade_date = Column(Date, index=True, nullable=False)
    open_price = Column(Float, nullable=False)
    high_price = Column(Float, nullable=False)
    low_price = Column(Float, nullable=False)
    close_price = Column(Float, nullable=False)
    volume = Column(Float, nullable=False)
    daily_return = Column(Float, nullable=False)
    moving_average_7 = Column(Float, nullable=True)
    fetched_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
