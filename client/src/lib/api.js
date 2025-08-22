import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api", // ← כולל /api
});

// הוספת JWT ל־headers אם קיים
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const loginUser     = (email, password) => API.post("/login", { email, password });
export const getUserInfo   = () => API.get("/userInfo");
export const createQuestion= (data) => API.post("/createQuestion", data);
export const getQuestions  = () => API.get("/getQuestions");
