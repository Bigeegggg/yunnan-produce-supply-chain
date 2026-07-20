import { getDb } from "@/lib/db";
import Link from "next/link";

function getVideoEmbed(url: string, platform: string): string {
  if (platform === "youtube") {
    const match = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/);
    if (match) return `https://www.youtube.com/embed/${match[1]}`;
  }
  if (platform === "bilibili") {
    const match = url.match(/BV[a-zA-Z0-9]+/);
    if (match) return `https://player.bilibili.com/player.html?bvid=${match[0]}&page=1&high_quality=1`;
  }
  return url;
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = getDb();
  const product = db.prepare("SELECT * FROM products WHERE id = ?").get(Number(id)) as any;
  if (!product) return <div className="min-h-screen pt-28 text-center text-text-primary/40">产品不存在</div>;

  const videos = db.prepare("SELECT * FROM videos WHERE product_id = ? ORDER BY created_at DESC").all(Number(id)) as any[];
  const traceBatches = db.prepare("SELECT * FROM trace_batches WHERE product_id = ? AND status = 'active' ORDER BY created_at DESC").all(Number(id)) as any[];

  return (
    <div className="min-h-screen bg-warm">
      {/* Product Info Header */}
      <section className="pt-28 pb-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/products" className="text-text-primary/40 hover:text-primary text-sm mb-4 inline-flex items-center gap-1 transition-colors">← 返回产品列表</Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-4">
            <div className="aspect-[4/3] bg-sand rounded-card overflow-hidden">
              {product.image ? (
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-text-primary/20">暂无图片</div>
              )}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">{product.name}</h1>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full">📍 {product.origin}</span>
                <span className="text-text-primary/40 text-sm">🕐 {product.season}</span>
                <span className="text-text-primary/40 text-sm">📦 {product.spec}</span>
              </div>
              <p className="text-text-primary/70 leading-relaxed mb-6">{product.description}</p>
              <div className="flex flex-wrap gap-3">
                <Link href={`/inquire?product=${encodeURIComponent(product.name)}`} className="px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors">
                  咨询下单
                </Link>
                {traceBatches.length > 0 && (
                  <Link href={`/api/trace/redirect?product_id=${product.id}`} className="px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark transition-colors">
                    查看溯源
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Gallery */}
      {videos.length > 0 && (
        <section className="py-16 bg-primary-dark relative overflow-hidden">
          <div className="absolute inset-0 mountain-bg opacity-10" />
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-white/80 text-xs font-medium mb-4">
                🎬 视频展示
              </div>
              <h2 className="text-3xl font-bold text-white tracking-wide">{product.name} · 产地实拍</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {videos.map(v => {
                const embedUrl = getVideoEmbed(v.url, v.platform);
                const isEmbed = v.platform === "youtube" || v.platform === "bilibili";
                return (
                  <div key={v.id} className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 hover:-translate-y-2 transition-all duration-300">
                    <div className="relative aspect-video bg-black/50">
                      {isEmbed ? (
                        <iframe src={embedUrl} title={v.title} className="w-full h-full" allowFullScreen />
                      ) : (
                        <video src={v.url} controls className="w-full h-full object-cover" poster={v.thumbnail || undefined} preload="metadata" />
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-white text-sm">{v.title}</h3>
                      {v.notes && <p className="text-white/40 text-xs mt-1">{v.notes}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
