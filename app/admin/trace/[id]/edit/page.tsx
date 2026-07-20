import TraceForm from "@/components/TraceForm";
import { getDb } from "@/lib/db";

export default async function EditTracePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDb();
  const batch = db.prepare("SELECT * FROM trace_batches WHERE id = ?").get(Number(id)) as any;
  if (!batch) return <div className="p-6 text-text-primary/40">批次不存在</div>;
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-text-primary mb-6">编辑溯源批次</h1>
      <TraceForm initial={batch} />
    </div>
  );
}
