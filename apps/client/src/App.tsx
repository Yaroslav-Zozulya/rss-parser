import { FC, lazy } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./compoments/Layout/Layout";

const Home = lazy(() => import("./pages/Home/Home"));
const Admin = lazy(() => import("./pages/Admin/Admin"));

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  );
};

export default App;
