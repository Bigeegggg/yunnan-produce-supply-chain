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
    <section className="py-20 bg-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-wide mb-2">
            视频展示
          </h2>
          <p className="text-xs sm:text-sm font-light tracking-[0.2em] uppercase text-text-primary/25 mb-4">
            Video Gallery
          </p>
          <p className="text-text-primary/50 max-w-xl mx-auto">
            走进云南高原，看见真实的源头产地
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map(v => {
            const embedUrl = getVideoEmbed(v.url, v.platform);
            const isEmbed = v.platform === "youtube" || v.platform === "bilibili";

            return (
              <div key={v.id} className="bg-white rounded-card shadow-card overflow-hidden group hover:shadow-card-hover transition-all">
                <div className="relative aspect-video bg-black">
                  {isEmbed ? (
                    <iframe src={embedUrl} title={v.title} className="w-full h-full" allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
                  ) : (
                    <video src={v.url} controls className="w-full h-full object-cover" poster={v.thumbnail || undefined} preload="metadata" />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-text-primary text-sm mb-1 line-clamp-1">{v.title}</h3>
                  {v.notes && <p className="text-text-primary/40 text-xs line-clamp-2">{v.notes}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
