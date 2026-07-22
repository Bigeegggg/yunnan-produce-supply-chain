import { getSettings } from "@/lib/data";
import AdvantageCardsClient from "./AdvantageCardsClient";

export default function AdvantageCards() {
  const s = getSettings();
  return <AdvantageCardsClient settings={s} />;
}
