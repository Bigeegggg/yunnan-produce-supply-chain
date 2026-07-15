import ProductForm from "@/components/ProductForm";
import { getDb } from "@/lib/db";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDb();
  const product = db.prepare("SELECT * FROM products WHERE id = ?").get(Number(id)) as any;
  if (!product) return <div className="p-6 text-text-primary/40">产品不存在</div>;
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-text-primary mb-6">编辑产品</h1>
      <ProductForm initial={product} />
    </div>
  );
}
