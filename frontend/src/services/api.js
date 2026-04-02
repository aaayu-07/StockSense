import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL?.trim() || "/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("StockSense API request failed:", {
      message: error.message,
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

export const fetchCompanies = async () => {
  const response = await api.get("/companies");
  return response.data.companies;
};

export const fetchMarketMovers = async () => {
  const response = await api.get("/market-movers");
  return response.data;
};

export const fetchStockData = async (symbol, days) => {
  const response = await api.get(`/data/${symbol}`, { params: { days } });
  return response.data;
};

export const fetchSummary = async (symbol) => {
  const response = await api.get(`/summary/${symbol}`);
  return response.data;
};

export const fetchComparison = async (symbol1, symbol2, days) => {
  const response = await api.get("/compare", { params: { symbol1, symbol2, days } });
  return response.data;
};
