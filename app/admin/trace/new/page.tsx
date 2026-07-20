import TraceForm from "@/components/TraceForm";

export default function NewTracePage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-text-primary mb-6">新增溯源批次</h1>
      <TraceForm />
    </div>
  );
}
