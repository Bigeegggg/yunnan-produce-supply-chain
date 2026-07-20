import { getDb } from "@/lib/db";

interface Video {
  id: number; title: string; url: string; platform: string;
  thumbnail: string; notes: string; created_at: string;
}

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

export default function VideoShowcase() {
  const db = getDb();
  const videos = db.prepare("SELECT * FROM videos ORDER BY created_at DESC LIMIT 4").all() as Video[];
  if (videos.length === 0) return null;

  return (
    <section className="relative py-24 bg-primary-dark overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 mountain-bg opacity-10" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-white/80 text-xs font-medium mb-6">
            🎬 视频展示
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-wide mb-4">
            走进云南高原
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            看见真实的源头产地，感受从田间到餐桌的每一步
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((v, i) => {
            const embedUrl = getVideoEmbed(v.url, v.platform);
            const isEmbed = v.platform === "youtube" || v.platform === "bilibili";
            return (
              <div key={v.id} className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 hover:-translate-y-2 transition-all duration-300">
                <div className="relative aspect-video bg-black/50">
                  {isEmbed ? (
                    <iframe src={embedUrl} title={v.title} className="w-full h-full" allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
                  ) : (
                    <video src={v.url} controls className="w-full h-full object-cover" poster={v.thumbnail || undefined} preload="metadata" />
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-white/40 text-[10px] uppercase tracking-widest">
                      {v.platform === "youtube" ? "YouTube" : v.platform === "bilibili" ? "Bilibili" : "视频"}
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-base mb-1 group-hover:text-accent-light transition-colors">{v.title}</h3>
                  {v.notes && <p className="text-white/40 text-sm line-clamp-2">{v.notes}</p>}
                </div>
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 bg-accent/90 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-white/30 text-sm">
            更多产地实拍视频持续更新中
          </p>
        </div>
      </div>
    </section>
  );
}
