import axios from "axios";

export const fetchInstance = axios.create({
  baseURL: "https://rss-parser.up.railway.app/api",
});
