import { BrowserRouter, Routes, Route } from "react-router";
import React from "react";
import { Home } from "src/routes/Home";
import { Census } from "src/routes/Census";
import { Layout } from "./Layout";

export const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="census" element={<Census />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
