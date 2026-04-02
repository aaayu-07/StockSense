import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine
from routes.stock_routes import router as stock_router


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="StockSense API",
    description="Public stock intelligence APIs for the StockSense dashboard.",
    version="3.0.0",
)

default_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://stock-sense-pearl-xi.vercel.app",
    "https://your-frontend-url.vercel.app",
]
configured_origins = [
    origin.strip()
    for origin in os.getenv("CORS_ORIGINS", "").split(",")
    if origin.strip()
]
origins = list(dict.fromkeys(default_origins + configured_origins))

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(stock_router)


@app.get("/")
def health_check():
    return {"message": "StockSense API is running."}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=10000)
