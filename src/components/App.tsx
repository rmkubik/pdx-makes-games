import { BrowserRouter, Routes, Route } from "react-router";
import React from "react";
import { Home } from "src/routes/Home";
import { Census } from "src/routes/Census";
import { Layout } from "./Layout";
import { LayoutProvider } from "./useLayout";

export const App = () => {
  return (
    <BrowserRouter>
      <LayoutProvider>
        <Layout>
          <Routes>
            <Route index element={<Home />} />
            <Route path="census" element={<Census />} />
          </Routes>
        </Layout>
      </LayoutProvider>
    </BrowserRouter>
  );
};
