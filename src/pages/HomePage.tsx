import { useOutletContext } from "react-router";
import type { Translation, Lang } from "../data/types";
import Hero from "../components/Hero";
import CarriersMarquee from "../components/CarriersMarquee";
import Intro from "../components/Intro";
import Coverage from "../components/Coverage";
import Why from "../components/Why";
import Process from "../components/Process";
import Quote from "../components/Quote";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import CtaBanner from "../components/CtaBanner";

type Ctx = { t: Translation; lang: Lang; setLang: (l: Lang) => void };

export default function HomePage() {
  const { t } = useOutletContext<Ctx>();
  return (
    <main>
      <Hero t={t} />
      <CarriersMarquee />
      <Intro t={t} />
      <Coverage t={t} />
      <Why t={t} />
      <Process t={t} />
      <Quote t={t} />
      <Testimonials t={t} />
      <Contact t={t} />
      <CtaBanner t={t} />
    </main>
  );
}
