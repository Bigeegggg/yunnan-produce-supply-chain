import { getPublishedProducts } from "@/lib/data";
import HomeClient from "./HomeClient";

export default function Home() {
  const products = getPublishedProducts();
  return <HomeClient products={products} />;
}
