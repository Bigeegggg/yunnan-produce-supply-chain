import { getDb } from "@/lib/db";
import InquiryDetail from "./InquiryDetail";

export default async function InquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDb();
  const inquiry = db.prepare("SELECT * FROM inquiries WHERE id = ?").get(Number(id)) as any;
  if (!inquiry) return <div className="p-6 text-center text-text-primary/40 py-20">咨询记录不存在</div>;

  return <InquiryDetail inquiry={inquiry} />;
}
