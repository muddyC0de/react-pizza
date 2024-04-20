import Header from "./components/Header";
import Home from "./pages/Home";
import "./scss/app.scss";
import { Route, Routes, Outlet } from "react-router-dom";
import React from "react";
import { Loader } from "./components/Loader";
import History from "./pages/History";
import Information from "./pages/Information";
function MainLayout() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

const Cart = React.lazy(() => import("./pages/Cart"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const FullPizza = React.lazy(() => import("./pages/FulllPizza"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <React.Suspense fallback={<Loader />}>
              <Cart />
            </React.Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <React.Suspense fallback={<Loader />}>
              <FullPizza />
            </React.Suspense>
          }
        />
        <Route
          path="history"
          element={
            <React.Suspense fallback={<Loader />}>
              <History />
            </React.Suspense>
          }
        />
        <Route
          path="information"
          element={
            <React.Suspense fallback={<Loader />}>
              <Information />
            </React.Suspense>
          }
        />
        <Route
          path="*"
          element={
            <React.Suspense fallback={<Loader />}>
              <NotFound />
            </React.Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
