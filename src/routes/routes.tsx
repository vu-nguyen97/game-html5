import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { GameRoutes } from "../utils/ProtectedRoutes/ProtectedRoutes";

const Layout = React.lazy(() => import("../partials/layouts/layout"));

const getPage = (comp) => <Suspense fallback={<Layout />}>{comp}</Suspense>;

const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const Home = React.lazy(() => import("../pages/Home/Home"));
const GamePlay = React.lazy(() => import("../pages/GamePlay/GamePlay"));
const PageNotFound = React.lazy(() => import("../pages/404/PageNotFound"));
const GamesByCategory = React.lazy(
  () => import("../pages/GamesByCategory/GamesByCategory")
);

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={getPage(<Home />)} />
    <Route path="/dashboard" element={getPage(<Dashboard />)} />
    <Route element={<GameRoutes />}>
      <Route path="/game/:gameCode/p" element={getPage(<GamePlay />)} />
    </Route>
    <Route
      // thêm "games" vì có category là ".IO" => khi lên params làm browser tưởng tên miền .IO
      path="/category/:categoryCode/games"
      element={getPage(<GamesByCategory />)}
    />
    <Route path="/colection/:colectionCode" element={getPage(<Home />)} />
    {/* Todo: PageNotFound */}
    <Route path="*" element={getPage(<Home />)} />
  </Routes>
);

export default AppRoutes;
