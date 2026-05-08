import { useOutletContext } from "react-router";
import type { Translation, Lang } from "../data/types";
import Quote from "../components/Quote";

type Ctx = { t: Translation; lang: Lang; setLang: (l: Lang) => void };

export default function QuotePage() {
  const { t } = useOutletContext<Ctx>();
  return (
    <main>
      <Quote t={t} />
    </main>
  );
}
