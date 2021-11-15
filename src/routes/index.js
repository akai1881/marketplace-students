import React from "react";
import { Route, Routes } from "react-router";
import MainPage from "../pages/MainPage";
import Product from "../pages/Product";
import CartPage from "../pages/CartPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
};

export default AppRoutes;
