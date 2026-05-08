import type { Translation } from "../data/types";
import ProductQuoteForm from "./forms/ProductQuoteForm";

export default function Quote({ t }: { t: Translation }) {
  return <ProductQuoteForm t={t} />;
}
