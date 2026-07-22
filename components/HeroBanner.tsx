import { getSettings } from "@/lib/data";
import HeroBannerClient from "./HeroBannerClient";

export default function HeroBanner() {
  const s = getSettings();
  const heroImage = s.hero_image || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80";
  return <HeroBannerClient heroImage={heroImage} />;
}
