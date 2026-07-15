import ProductsClient from "./ProductsClient";
import { getPublishedProducts, type Product } from "@/lib/data";

export default function ProductsPage() {
  const products = getPublishedProducts();
  return <ProductsClient products={products} />;
}
