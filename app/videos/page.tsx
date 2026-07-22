"use client";

import { useT } from "@/lib/i18n";
import { useState, useEffect } from "react";
import Link from "next/link";

function getVideoEmbed(url: string, platform: string): string {
  if (platform === "youtube") { const m = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/); if (m) return `https://www.youtube.com/embed/${m[1]}`; }
  if (platform === "bilibili") { const m = url.match(/BV[a-zA-Z0-9]+/); if (m) return `https://player.bilibili.com/player.html?bvid=${m[0]}&page=1&high_quality=1`; }
  return url;
}

export default function VideosPage() {
  const { t } = useT();
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/videos").then(r => r.json()).then(d => { if (Array.isArray(d)) setVideos(d.filter((v: any) => v.status === "approved")); });
  }, []);

  return (
    <div className="min-h-screen bg-warm pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 rounded-full text-accent text-xs font-medium mb-4">🎬 {t.nav_videos}</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-wide mb-2">{t.videos_title}</h1>
          <p className="text-xs font-light tracking-[0.2em] uppercase text-text-primary/25 mb-4">{t.videos_title_en}</p>
          <p className="text-text-primary/50 max-w-xl mx-auto">{t.videos_subtitle}</p>
        </div>
        {videos.length === 0 ? (
          <div className="bg-white rounded-card p-16 text-center text-text-primary/30">{t.videos_empty}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((v: any) => {
              const embedUrl = getVideoEmbed(v.url, v.platform);
              const isEmbed = v.platform === "youtube" || v.platform === "bilibili";
              return (
                <div key={v.id} className="bg-white rounded-card shadow-card overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all group">
                  <div className="relative aspect-video bg-black">
                    {isEmbed ? <iframe src={embedUrl} title={v.title} className="w-full h-full" allowFullScreen /> : <video src={v.url} controls className="w-full h-full object-cover" poster={v.thumbnail || undefined} preload="metadata" />}
                  </div>
                  <div className="p-4">
                    {v.product_name && <Link href={`/products/${v.product_id}`} className="text-xs text-accent font-medium hover:underline">{v.product_name}</Link>}
                    <h3 className="font-bold text-text-primary text-sm mt-1 line-clamp-1">{v.title}</h3>
                    {v.notes && <p className="text-text-primary/40 text-xs mt-1 line-clamp-2">{v.notes}</p>}
                    {v.submitted_by && <p className="text-text-primary/20 text-[10px] mt-2">{t.videos_submitted_by}{v.submitted_by}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
