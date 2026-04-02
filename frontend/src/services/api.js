import axios from "axios";

const rawApiBaseUrl = import.meta.env.VITE_API_URL?.trim();

function normalizeApiBaseUrl(value) {
  if (!value) {
    return import.meta.env.DEV ? "http://127.0.0.1:8000" : "https://your-backend-url.onrender.com";
  }

  if (!import.meta.env.DEV && value.startsWith("http://")) {
    return value.replace("http://", "https://");
  }

  return value.replace(/\/+$/, "");
}

const API_BASE_URL = normalizeApiBaseUrl(rawApiBaseUrl);

console.info("StockSense API_BASE_URL:", API_BASE_URL);

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
});

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function shouldRetry(error, attempt) {
  if (attempt >= 2) {
    return false;
  }

  const status = error.response?.status;
  return (
    error.code === "ERR_NETWORK" ||
    error.code === "ECONNABORTED" ||
    [502, 503, 504].includes(status)
  );
}

function createFriendlyError(error) {
  const backendMessage = error.response?.data?.detail;

  let message =
    backendMessage ||
    "We couldn't reach the StockSense server. If the backend is hosted on Render, it may still be waking up. Please try again in a moment.";

  if (error.code === "ECONNABORTED") {
    message = "The request took too long. The StockSense backend may still be starting up. Please retry.";
  }

  if (error.response?.status === 404) {
    message = backendMessage || "The requested StockSense API endpoint was not found.";
  }

  const wrappedError = new Error(message);
  wrappedError.name = "StockSenseApiError";
  wrappedError.response = error.response;
  wrappedError.code = error.code;
  wrappedError.originalError = error;
  return wrappedError;
}

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

async function requestWithRetry(requestFactory, requestLabel) {
  let attempt = 0;

  while (attempt <= 2) {
    try {
      return await requestFactory();
    } catch (error) {
      console.error(`StockSense API ${requestLabel} failed on attempt ${attempt + 1}:`, {
        baseURL: API_BASE_URL,
        message: error.message,
        code: error.code,
        status: error.response?.status,
        data: error.response?.data,
      });

      if (!shouldRetry(error, attempt)) {
        throw createFriendlyError(error);
      }

      attempt += 1;
      await wait(1500 * attempt);
    }
  }

  throw new Error("Unexpected API retry failure.");
}

export const fetchCompanies = async () => {
  const response = await requestWithRetry(() => api.get("/companies"), "GET /companies");
  return response.data.companies;
};

export const fetchMarketMovers = async () => {
  const response = await requestWithRetry(() => api.get("/market-movers"), "GET /market-movers");
  return response.data;
};

export const fetchStockData = async (symbol, days) => {
  const response = await requestWithRetry(
    () => api.get(`/data/${symbol}`, { params: { days } }),
    `GET /data/${symbol}`
  );
  return response.data;
};

export const fetchSummary = async (symbol) => {
  const response = await requestWithRetry(() => api.get(`/summary/${symbol}`), `GET /summary/${symbol}`);
  return response.data;
};

export const fetchComparison = async (symbol1, symbol2, days) => {
  const response = await requestWithRetry(
    () => api.get("/compare", { params: { symbol1, symbol2, days } }),
    "GET /compare"
  );
  return response.data;
};
