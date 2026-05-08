import { Outlet } from "react-router";
import Topbar from "./Topbar";
import Header from "./Header";
import Footer from "./Footer";
import { useT } from "../hooks/useT";

export default function Layout() {
  const { t, lang, setLang } = useT();
  return (
    <>
      <Topbar t={t} lang={lang} setLang={setLang} />
      <Header t={t} />
      <Outlet context={{ t, lang, setLang }} />
      <Footer t={t} />
    </>
  );
}
