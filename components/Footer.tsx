import { getSettings } from "@/lib/data";
import FooterClient from "./FooterClient";

export default function Footer() {
  const s = getSettings();
  return <FooterClient settings={s} />;
}
