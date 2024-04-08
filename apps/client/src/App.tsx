import { FC, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";

const Home = lazy(() => import("./pages/Home/Home"));
const Admin = lazy(() => import("./pages/Admin/Admin"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
