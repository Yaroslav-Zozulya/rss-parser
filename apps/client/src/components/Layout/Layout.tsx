import { Container } from "@mui/material";
import { FC, Suspense } from "react";
import { Outlet } from "react-router-dom";

export const Layout: FC = () => {
  return (
    <Container>
      <Suspense fallback={<div> Loading...</div>}>
        <Outlet />
      </Suspense>
    </Container>
  );
};
