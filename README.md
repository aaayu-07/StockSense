# 🚀 StockSense – Stock Data Intelligence Dashboard

StockSense is a full-stack stock analytics platform that provides real-time insights, stock comparisons, and interactive visualizations. It combines a modern React frontend with a FastAPI backend to deliver a smooth, scalable, and production-ready SaaS experience.

---

## 🌐 Live Demo

* **Frontend:** https://stock-sense-pearl-xi.vercel.app/
* **Backend API:** https://stocksense-3jyv.onrender.com/docs

---

## 📌 Overview

StockSense helps users analyze stock performance, compare companies, and visualize trends using real-time data. The platform is designed with a clean UI, fast backend processing, and scalable architecture.

---

## ⚙️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Chart.js
* Axios

### Backend

* FastAPI
* SQLAlchemy
* SQLite (PostgreSQL-ready)
* JWT Authentication

### Data Source

* Yahoo Finance (yfinance)

### Deployment

* Frontend: Vercel
* Backend: Render

---

## ✨ Features

* 📊 Real-time stock data visualization
* 📈 Interactive charts (30-day, 90-day trends)
* 🔍 Stock comparison (performance & volatility)
* 📉 Market movers (top gainers & losers)
* 👤 JWT-based authentication system
* ⭐ Watchlist & recent activity tracking
* 🌙 Futuristic UI with dark/light mode
* ⚡ Fast API with caching support

---

## 📁 Project Structure

```text
StockSense/
├── backend/
│   ├── routes/
│   ├── services/
│   ├── main.py
│   ├── models.py
│   ├── database.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   ├── components/
│   ├── App.jsx
│   └── package.json
└── README.md
```

---

## 🛠️ Backend Setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

API Docs:
http://127.0.0.1:8000/docs

---

## 💻 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend:
http://localhost:5173

---

## 🔐 Environment Variables

### Backend

* `DATABASE_URL` → Database connection
* `JWT_SECRET_KEY` → Secret for authentication

### Frontend

* `VITE_API_URL` → Backend URL

---

## 📸 Screenshots

(Add your project screenshots here)

---

## 🧠 How It Works

1. User selects a company
2. Backend fetches stock data using yfinance
3. Data is processed (returns, volatility, trends)
4. Frontend displays charts and insights

---

## 🚀 Deployment

* Backend deployed on Render
* Frontend deployed on Vercel
* Environment-based API integration
* CORS configured for secure communication

---

## 📄 License

This project is for educational and portfolio purposes.

---

## 👨‍💻 Author

**Ayush Raj**

* GitHub: https://github.com/aaayu-07
* LinkedIn: https://linkedin.com/in/ayush--raj

---
