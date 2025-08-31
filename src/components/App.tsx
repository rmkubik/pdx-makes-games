import { BrowserRouter, Routes, Route } from "react-router";
import React from "react";
import { Home } from "src/routes/Home";
import { Census } from "src/routes/Census";
import { Layout } from "./Layout";
import { LayoutProvider } from "./useLayout";
import { Unconference } from "src/routes/Unconference";

export const App = () => {
  return (
    <BrowserRouter>
      <LayoutProvider>
        <Layout>
          <Routes>
            <Route index element={<Home />} />
            <Route path="census" element={<Census />} />
            <Route path="unconference" element={<Unconference />} />
          </Routes>
        </Layout>
      </LayoutProvider>
    </BrowserRouter>
  );
};
