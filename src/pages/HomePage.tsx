import { useOutletContext } from "react-router";
import type { Translation, Lang } from "../data/types";
import Hero from "../components/Hero";
import CarriersMarquee from "../components/CarriersMarquee";
import LifeFocus from "../components/LifeFocus";
import CtaBanner from "../components/CtaBanner";

type Ctx = { t: Translation; lang: Lang; setLang: (l: Lang) => void };

export default function HomePage() {
  const { t } = useOutletContext<Ctx>();
  return (
    <main>
      <Hero t={t} />
      <CarriersMarquee />
      <LifeFocus t={t} />
      <CtaBanner t={t} />
    </main>
  );
}
