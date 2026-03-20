import { BrowserRouter, Routes, Route } from "react-router";
import React from "react";
import { Home } from "src/routes/Home";
import { Census } from "src/routes/Census";
import { Layout } from "./Layout";
import { LayoutProvider } from "./useLayout";
import { Pfog } from "src/routes/Pfog";
import { UnstyledLayout } from "./UnstyledLayout";

export const App = () => {
  return (
    <BrowserRouter>
      <LayoutProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="census" element={<Census />} />
          </Route>
          <Route element={<UnstyledLayout />}>
            <Route index element={<Home />} />
            <Route path="pfog" element={<Pfog />} />
          </Route>
        </Routes>
      </LayoutProvider>
    </BrowserRouter>
  );
};
