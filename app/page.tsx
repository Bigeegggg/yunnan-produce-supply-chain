import { getPublishedProducts, getSettings } from "@/lib/data";
import HomeClient from "./HomeClient";

export default function Home() {
  const products = getPublishedProducts();
  const settings = getSettings();
  return <HomeClient products={products} settings={settings} />;
}
