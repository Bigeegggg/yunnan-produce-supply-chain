import { getSettings } from "@/lib/data";

export default function AboutPage() {
  const s = getSettings();
  const aboutText = s.about_text || "我们深耕云南高原蔬果供应链多年，在大理、昭通、楚雄、红河、玉溪等核心农业产区建立了稳定的合作种植基地...";

  return (
    <>
      <section className="pt-28 pb-12 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-text-primary tracking-wide mb-4">关于我们</h1>
          <p className="text-text-primary/50 max-w-xl mx-auto">立足云南高原，连接全国餐桌</p>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-text-primary tracking-wide mb-6">{s.company_name || "云南高原供应链"}</h2>
              <div className="space-y-4 text-text-primary/70 leading-relaxed">
                {aboutText.split("\n").filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
            <div className="bg-sand rounded-card aspect-[4/3] flex items-center justify-center overflow-hidden">
              {s.about_image ? <img src={s.about_image} alt="" className="w-full h-full object-cover" /> : <span className="text-text-primary/30 text-lg">企业形象图（待提供）</span>}
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-wide mb-4">种植基地</h2>
            <p className="text-text-primary/50 max-w-xl mx-auto">覆盖云南六大核心产区</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "大理宾川", product: "葡萄、紫皮蒜、柑橘", altitude: "海拔 1400-1800m" },
              { name: "昭通", product: "糖心苹果、马铃薯", altitude: "海拔 1800-2500m" },
              { name: "楚雄元谋", product: "番茄、洋葱、豆类", altitude: "海拔 1000-1300m" },
              { name: "红河蒙自", product: "石榴、枇杷", altitude: "海拔 1200-1500m" },
              { name: "玉溪通海", product: "叶菜类蔬菜", altitude: "海拔 1700-1900m" },
              { name: "丽江", product: "雪桃、苹果", altitude: "海拔 2200-2800m" },
            ].map((base) => (
              <div key={base.name} className="bg-white rounded-card p-6 shadow-card terrace-edge">
                <h3 className="text-lg font-bold text-text-primary mb-2">{base.name}</h3>
                <p className="text-sm text-text-primary/50 mb-1">主产：{base.product}</p>
                <p className="text-xs text-accent font-medium">{base.altitude}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-wide mb-4">资质证书</h2>
            <p className="text-text-primary/50 max-w-xl mx-auto">品质保证，值得信赖</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {["绿色食品认证", "有机产品认证", "农产品地理标志", "ISO 质量管理"].map((cert) => (
              <div key={cert} className="bg-sand rounded-card aspect-[3/4] flex items-center justify-center p-4">
                <span className="text-text-primary/30 text-sm text-center">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
