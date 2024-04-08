import axios from "axios";

export const fetchInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});
