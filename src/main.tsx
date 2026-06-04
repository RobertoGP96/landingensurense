import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import "./i18n";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CoveragePage from "./pages/CoveragePage";
import CoverageDetailPage from "./pages/CoverageDetailPage";
import QuotePage from "./pages/QuotePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import ContactPage from "./pages/ContactPage";
import AgentAdminPage from "./pages/AgentAdminPage";
import NotFoundPage from "./pages/NotFoundPage";
import { SanityContentProvider } from "./sanity/SanityContentProvider";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <SanityContentProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="coverage" element={<CoveragePage />} />
            <Route path="coverage/:slug" element={<CoverageDetailPage />} />
            <Route path="quote" element={<QuotePage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/:slug" element={<ProductDetailPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="services/:slug" element={<ServiceDetailPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="admin/agent" element={<AgentAdminPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SanityContentProvider>
  </StrictMode>
);
