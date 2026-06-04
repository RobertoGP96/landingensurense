import { useOutletContext } from "react-router";
import type { Translation, Lang } from "../data/types";
import Intro from "../components/Intro";
import Why from "../components/Why";
import Process from "../components/Process";
import Testimonials from "../components/Testimonials";
import CtaBanner from "../components/CtaBanner";

type Ctx = { t: Translation; lang: Lang; setLang: (l: Lang) => void };

export default function AboutPage() {
  const { t } = useOutletContext<Ctx>();
  return (
    <main style={{ paddingTop: 40 }}>
      <Intro t={t} />
      <Why t={t} />
      <Process t={t} />
      <Testimonials t={t} />
      <CtaBanner t={t} />
    </main>
  );
}
