import "dotenv/config";

export const API_KEY = process.env.VITE_API_KEY;
export const BASE_URL = process.env.VITE_BASE_URL;
export const data = JSON.parse(localStorage.getItem("data")) || {};
