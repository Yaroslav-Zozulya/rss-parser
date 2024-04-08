import { fetchInstance } from "./fetchInstance";
import { LoginData, AdminUserData } from "./dto.types";

const registerAdmin = async (data: AdminUserData) => {
  const response = await fetchInstance.post("/auth/registration/admin", data);
  return response.data;
};

const login = async (data: LoginData) => {
  const response = await fetchInstance.post("/auth/login", data);
  return response.data;
};

const verifyToken = async (token: string) => {
  fetchInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  try {
    const response = await fetchInstance.post("/auth/token/verify", token);
    return response.data;
  } catch {
    localStorage.removeItem("token");
    fetchInstance.defaults.headers.common["Authorization"] = null;
  }
};

const checkIsAdminUser = async () => {
  const response = await fetchInstance.get("/users/admin");
  return response.data;
};

export const authAPI = { login, registerAdmin, verifyToken, checkIsAdminUser };
