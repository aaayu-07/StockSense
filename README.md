# StockSense SaaS

StockSense is a JWT-authenticated fintech SaaS platform built with FastAPI, SQLite-ready SQLAlchemy models, React, Vite, Chart.js, Axios, and Tailwind CSS. It combines secure user accounts with stock analytics, watchlists, recent activity tracking, market movers, and a modern glassmorphism dashboard.

## SaaS Features

- Secure signup and login with hashed passwords and JWT tokens
- Protected stock data, summary, and comparison APIs
- User-specific watchlists and last viewed stocks
- Dark fintech dashboard with Tailwind CSS, responsive layout, and glass cards
- Toast notifications, loading skeletons, error states, and logout flow
- Pricing/upgrade section and account snapshot UI
- SQLite by default with a PostgreSQL-ready `DATABASE_URL` configuration

## Project Structure

```text
StockSense/
├── backend/
│   ├── data/
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── auth_routes.py
│   │   ├── stock_routes.py
│   │   └── user_routes.py
│   ├── services/
│   │   ├── __init__.py
│   │   ├── stock_service.py
│   │   └── user_service.py
│   ├── auth.py
│   ├── database.py
│   ├── main.py
│   ├── models.py
│   ├── requirements.txt
│   └── schemas.py
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

## Backend Setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Optional environment variables:

- `DATABASE_URL` for PostgreSQL or another SQLAlchemy-supported database
- `JWT_SECRET_KEY` to override the default JWT secret
- `ACCESS_TOKEN_EXPIRE_MINUTES` to control token lifetime

API docs:

- [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend dev server:

- [http://localhost:5173](http://localhost:5173)

The Vite proxy forwards `/api/*` calls to `http://127.0.0.1:8000`.

## API Overview

Public:

- `POST /signup`
- `POST /login`
- `GET /companies`
- `GET /market-movers`

Protected:

- `GET /data/{symbol}`
- `GET /summary/{symbol}`
- `GET /compare`
- `GET /me`
- `GET /watchlist`
- `POST /watchlist/add`
- `DELETE /watchlist/remove`

## Default User Flow

1. Sign up with full name, email, and password.
2. Receive a JWT token and redirect into the dashboard.
3. Explore protected stock analytics.
4. Save favorite stocks to your watchlist.
5. Track recent stock views in your personal workspace.

## Screenshots

- `docs/screenshots/auth-flow.png`
- `docs/screenshots/dashboard-dark-theme.png`
- `docs/screenshots/watchlist-and-compare.png`
