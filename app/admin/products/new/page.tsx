import ProductForm from "@/components/ProductForm";

export default function NewProductPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-text-primary mb-6">新增产品</h1>
      <ProductForm />
    </div>
  );
}
