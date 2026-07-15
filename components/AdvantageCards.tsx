import advantages from "@/data/advantages.json";
import type { Advantage } from "@/data/types";

function AdvantageCard({ advantage }: { advantage: Advantage }) {
  return (
    <div className="bg-white rounded-card p-8 shadow-card hover:shadow-card-hover transition-shadow terrace-edge">
      <div className="text-4xl mb-4">{advantage.icon}</div>
      <h3 className="text-xl font-bold text-text-primary mb-3">{advantage.title}</h3>
      <p className="text-text-primary/60 leading-relaxed">{advantage.description}</p>
    </div>
  );
}

export default function AdvantageCards() {
  return (
    <section className="py-20 bg-warm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary tracking-wide mb-4">
            为什么选择我们
          </h2>
          <p className="text-text-primary/50 max-w-xl mx-auto">
            三大核心能力，构建从高原田间到全国餐桌的可靠供应链
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {advantages.map((adv, i) => (
            <AdvantageCard key={i} advantage={adv} />
          ))}
        </div>
      </div>
    </section>
  );
}
