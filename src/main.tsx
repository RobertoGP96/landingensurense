import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import "./i18n";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import CoveragePage from "./pages/CoveragePage";
import QuotePage from "./pages/QuotePage";
import NotFoundPage from "./pages/NotFoundPage";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="coverage/:slug" element={<CoveragePage />} />
          <Route path="quote" element={<QuotePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
