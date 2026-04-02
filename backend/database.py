import os
from pathlib import Path

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker


BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = Path(
    os.getenv("STOCKSENSE_DATA_DIR")
    or os.getenv("RENDER_DISK_PATH")
    or os.getenv("RENDER_DISK_MOUNT_PATH")
    or (BASE_DIR / "data")
)
DATA_DIR.mkdir(parents=True, exist_ok=True)

DATABASE_URL = os.getenv("DATABASE_URL", f"sqlite:///{DATA_DIR / 'stocksense.db'}")

connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(
    DATABASE_URL,
    connect_args=connect_args,
    future=True,
)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)
Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
