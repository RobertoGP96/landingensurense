import { Outlet, ScrollRestoration, useLocation } from "react-router";
import Topbar from "./Topbar";
import Header from "./Header";
import Footer from "./Footer";
import { useT } from "../hooks/useT";

export default function Layout() {
  const { t, lang, setLang } = useT();
  const { pathname } = useLocation();
  return (
    <>
      {/* Scrolls to top on new navigations, restores position on back/forward. */}
      <ScrollRestoration />
      <Topbar t={t} lang={lang} setLang={setLang} />
      <Header t={t} />
      {/* Keyed by pathname so every route change replays the entry animation. */}
      <div key={pathname} className="page-enter">
        <Outlet context={{ t, lang, setLang }} />
      </div>
      <Footer t={t} />
    </>
  );
}
