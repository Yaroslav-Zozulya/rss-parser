import { FC, Suspense } from "react";
import { Outlet } from "react-router-dom";

export const Layout: FC = () => {
  return (
    <div className="container">
      <Suspense fallback={<div> Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};
