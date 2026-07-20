import { getDb } from "@/lib/db";

const STAGES = [
  { key: "origin_info", icon: "📍", label: "产地信息", color: "border-l-green-500" },
  { key: "production_info", icon: "🏭", label: "生产加工", color: "border-l-blue-500" },
  { key: "testing_info", icon: "🔬", label: "质量检测", color: "border-l-accent" },
  { key: "logistics_info", icon: "📦", label: "仓储物流", color: "border-l-purple-500" },
];

export default async function TraceDetailPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const db = getDb();
  const batch = db.prepare("SELECT t.*, p.name as product_name FROM trace_batches t LEFT JOIN products p ON t.product_id = p.id WHERE t.batch_code = ? AND t.status = 'active'").get(code) as any;

  if (!batch) {
    return (
      <div className="min-h-screen bg-warm pt-28 pb-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">未找到该溯源码</h1>
          <p className="text-text-primary/50 mb-6">批次号 "{code}" 不存在或已归档</p>
          <a href="/trace" className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">返回查询</a>
        </div>
      </div>
    );
  }

  const stagesWithContent = STAGES.map(s => ({
    ...s,
    content: (batch as any)[s.key] || "",
  })).filter(s => s.content.trim());

  return (
    <div className="min-h-screen bg-warm pt-28 pb-20">
      <div className="max-w-2xl mx-auto px-4">
        <a href="/trace" className="text-text-primary/40 hover:text-primary text-sm mb-6 inline-flex items-center gap-1 transition-colors">← 返回查询</a>

        {/* Header card */}
        <div className="bg-white rounded-card p-6 shadow-card mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-lg">🔍</div>
            <div>
              <h1 className="text-xl font-bold text-text-primary">溯源结果</h1>
              <p className="text-text-primary/40 text-xs">Traceability Result</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            <div className="bg-warm rounded-lg p-3">
              <div className="text-text-primary/30 text-xs mb-0.5">溯源码</div>
              <div className="font-mono font-bold text-primary">{batch.batch_code}</div>
            </div>
            <div className="bg-warm rounded-lg p-3">
              <div className="text-text-primary/30 text-xs mb-0.5">产品</div>
              <div className="font-semibold text-text-primary">{batch.product_name}</div>
            </div>
            <div className="bg-warm rounded-lg p-3">
              <div className="text-text-primary/30 text-xs mb-0.5">录入时间</div>
              <div className="font-semibold text-text-primary text-sm">{batch.created_at?.slice(0, 10)}</div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {stagesWithContent.length === 0 ? (
            <div className="bg-white rounded-card p-8 shadow-card text-center text-text-primary/30">暂无溯源详情</div>
          ) : (
            <div className="space-y-0">
              {stagesWithContent.map((stage, i) => (
                <div key={stage.key} className="flex gap-4">
                  {/* Timeline connector */}
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 ${i === 0 ? 'bg-primary/10 ring-2 ring-primary/30' : 'bg-sand'}`}>
                      {stage.icon}
                    </div>
                    {i < stagesWithContent.length - 1 && (
                      <div className="w-0.5 flex-1 bg-sand/50 my-1" />
                    )}
                  </div>
                  {/* Content card */}
                  <div className={`flex-1 bg-white rounded-card p-5 shadow-card mb-4 border-l-4 ${stage.color}`}>
                    <h3 className="font-bold text-text-primary mb-2">{stage.label}</h3>
                    <div className="text-text-primary/70 text-sm leading-relaxed whitespace-pre-wrap">{stage.content}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 bg-primary/5 border border-primary/10 rounded-card p-4 text-center">
          <p className="text-sm text-primary/70">✅ 本溯源数据由供应商提供并审核</p>
        </div>
      </div>
    </div>
  );
}
