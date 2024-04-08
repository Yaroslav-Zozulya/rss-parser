import { FC, useEffect, useState } from "react";
import { Container } from "@mui/material";
import { LoginForm } from "../../components/LoginForm/LoginForm";
import { RegistrationForm } from "../../components/RegistrationForm/RegistrationForm";
import { useQuery } from "react-query";
import axios from "axios";
import { AdminPanel } from "./components/AdminPanel/AdminPanel";
import { authAPI } from "../../services/authAPI";

const Admin: FC = () => {
  const [token, setToken] = useState<string | null>(null);

  const { data, isLoading, isError } = useQuery(
    "isAdminUser",
    authAPI.checkIsAdminUser,
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      (async () => {
        try {
          const isToken = await authAPI.verifyToken(storedToken);
          if (isToken) {
            setToken(storedToken);
          }
        } catch (error) {
          console.log("Here must be some notify");
        }
      })();
    }
  }, []);

  return (
    <Container sx={{ padding: "24px" }}>
      {isLoading && <h1>IS LOADING...</h1>}
      {isError && <h1>Something is wrong</h1>}
      {data && !token && !isError && !isLoading && (
        <LoginForm setToken={setToken} />
      )}
      {!token && !data && !isError && !isLoading && <RegistrationForm />}
      {token && !isError && !isLoading && <AdminPanel />}
    </Container>
  );
};

export default Admin;
