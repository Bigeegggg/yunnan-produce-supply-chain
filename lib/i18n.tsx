"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Lang = "en" | "zh";

// Full translation dictionary type
export interface Translations {
  // Nav
  nav_home: string; nav_products: string; nav_about: string; nav_contact: string; nav_videos: string; nav_trace: string;
  // Hero
  hero_title: string; hero_tagline: string; hero_subtitle: string; hero_cta_contact: string; hero_cta_products: string; hero_cta_contact_en: string; hero_cta_products_en: string;
  // Stats
  stat_regions: string; stat_regions_en: string; stat_farms: string; stat_farms_en: string; stat_delivery: string; stat_delivery_en: string; stat_categories: string; stat_categories_en: string;
  // Advantages
  adv_title: string; adv_title_en: string; adv_subtitle: string;
  // Procurement flow
  flow_title: string; flow_title_en: string; flow_subtitle: string;
  flow_step1_title: string; flow_step1_desc: string; flow_step2_title: string; flow_step2_desc: string; flow_step3_title: string; flow_step3_desc: string; flow_step4_title: string; flow_step4_desc: string;
  // Products
  products_title: string; products_title_en: string; products_subtitle: string; products_view_all: string; products_seasonal: string;
  // Trust
  trust_title: string; trust_item1_title: string; trust_item1_desc: string; trust_item2_title: string; trust_item2_desc: string; trust_item3_title: string; trust_item3_desc: string;
  // Product card
  card_trace: string; card_inquire: string; card_season: string;
  // Contact
  contact_title: string; contact_title_en: string; contact_subtitle: string;
  contact_coop_title: string; contact_coop_title_en: string; contact_coop_subtitle: string;
  contact_form_title: string; contact_form_success: string; contact_form_success_desc: string;
  contact_info_title: string; contact_form_name: string; contact_form_phone: string; contact_form_company: string; contact_form_desc: string; contact_form_submit: string;
  contact_wechat: string; contact_address: string; contact_phone: string; contact_email: string;
  // FAQ
  faq_title: string; faq_title_en: string;
  faq_q1: string; faq_a1: string; faq_q2: string; faq_a2: string; faq_q3: string; faq_a3: string; faq_q4: string; faq_a4: string; faq_q5: string; faq_a5: string;
  // About
  about_title: string; about_title_en: string; about_subtitle: string;
  about_company_title: string; about_desc_p1: string; about_desc_p2: string; about_desc_p3: string; about_image_placeholder: string;
  about_bases_title: string; about_bases_subtitle: string;
  about_certs_title: string; about_certs_subtitle: string;
  // Inquire
  inquire_title: string; inquire_title_en: string; inquire_product: string; inquire_name: string; inquire_phone: string; inquire_qty: string; inquire_notes: string; inquire_submit: string; inquire_success: string; inquire_success_desc: string; inquire_back: string;
  inquire_placeholder_name: string; inquire_placeholder_phone: string; inquire_placeholder_qty: string; inquire_placeholder_notes: string;
  // Trace
  trace_title: string; trace_title_en: string; trace_subtitle: string; trace_placeholder: string; trace_search: string; trace_recent: string;
  trace_result: string; trace_result_en: string; trace_code: string; trace_product: string; trace_date: string; trace_verified: string; trace_not_found: string; trace_back: string;
  trace_stage_origin: string; trace_stage_production: string; trace_stage_testing: string; trace_stage_logistics: string;
  // Product detail
  pdetail_back: string; pdetail_trace: string; pdetail_inquire: string; pdetail_videos_title: string; pdetail_videos_subtitle: string;
  // Videos
  videos_title: string; videos_title_en: string; videos_subtitle: string; videos_empty: string; videos_submitted_by: string;
  // Partner
  partner_title: string; partner_subtitle: string; partner_form_title: string; partner_title_field: string; partner_url_field: string; partner_product_field: string; partner_notes_field: string; partner_submit: string; partner_my_submissions: string; partner_empty: string; partner_status_approved: string; partner_status_rejected: string; partner_status_pending: string;
  partner_name_prompt: string; partner_success: string; partner_fail: string;
  // Footer
  footer_brand: string; footer_desc: string; footer_desc_en: string; footer_nav: string; footer_nav_en: string; footer_contact: string; footer_contact_en: string;
  // Common
  common_loading: string; common_error: string; common_save: string; common_cancel: string; common_edit: string; common_delete: string; common_confirm_delete: string; common_no_data: string; common_back: string;
  // Admin (minimal — mostly stays Chinese)
  admin_login: string; admin_password: string; admin_login_btn: string; admin_login_error: string;
  // Cooperation modes
  coop_dealer: string; coop_dealer_desc: string; coop_supermarket: string; coop_supermarket_desc: string; coop_group: string; coop_group_desc: string; coop_dropship: string; coop_dropship_desc: string;
  // Product categories
  cat_all: string; cat_fruit: string; cat_leafy: string; cat_solanum: string; cat_root: string; cat_mushroom: string;
  // Seasonal badge
  seasonal_badge: string;
  // Yunnan badge (origins stay Chinese)
  origin_label: string;
}

const en: Translations = {
  nav_home: "Home", nav_products: "Products", nav_about: "About", nav_contact: "Contact", nav_videos: "Videos", nav_trace: "Traceability",
  hero_title: "Yunnan Plateau Supply Chain", hero_tagline: "Yunnan Plateau · Fresh Produce · Global Supply", hero_subtitle: "Direct Sourcing · Cold Chain · Quality Traceability\nFrom the Yunnan Highlands to your table, we guard every bite of freshness", hero_cta_contact: "Get in Touch", hero_cta_products: "View Products", hero_cta_contact_en: "", hero_cta_products_en: "",
  stat_regions: "Growing Regions", stat_regions_en: "", stat_farms: "Partner Farms", stat_farms_en: "", stat_delivery: "Cold Chain Delivery", stat_delivery_en: "", stat_categories: "Categories", stat_categories_en: "",
  adv_title: "Why Choose Us", adv_title_en: "", adv_subtitle: "Three core advantages building a reliable supply chain from plateau fields to tables nationwide",
  flow_title: "How We Work", flow_title_en: "", flow_subtitle: "Four steps to start cooperation, worry-free from origin to shelf",
  flow_step1_title: "Consult & Select", flow_step1_desc: "Tell us your needs, we recommend suitable products and pricing",
  flow_step2_title: "Confirm Quality", flow_step2_desc: "Confirm product specifications and quality standards, lock in supply plan",
  flow_step3_title: "Sign & Schedule", flow_step3_desc: "Sign contract, lock in pricing and supply timeline",
  flow_step4_title: "Cold Chain Delivery", flow_step4_desc: "Direct from origin, 48-hour cold chain delivery nationwide",
  products_title: "Featured Products", products_title_en: "", products_subtitle: "Covering Yunnan's six major growing regions, highland quality, direct supply", products_view_all: "View All Products", products_seasonal: "",
  trust_title: "Why Customers Choose Us", trust_item1_title: "Direct Sourcing", trust_item1_desc: "Self-operated partner bases across Yunnan's 6 major regions, transparent pricing with no middlemen", trust_item2_title: "Quality Assurance", trust_item2_desc: "Every batch is traceable, certified by national green food standards, public residue testing", trust_item3_title: "Professional Service", trust_item3_desc: "Dedicated account manager, end-to-end support from selection to delivery, 24/7 response",
  card_trace: "Traceability", card_inquire: "Inquire", card_season: "Season",
  contact_title: "Get in Touch", contact_title_en: "", contact_subtitle: "We look forward to bringing Yunnan's finest produce to your customers",
  contact_coop_title: "Cooperation Models", contact_coop_title_en: "", contact_coop_subtitle: "Flexible models for different channels",
  contact_form_title: "Online Inquiry", contact_form_success: "Submitted!", contact_form_success_desc: "Thank you for your inquiry. We will contact you shortly.",
  contact_info_title: "Contact Info", contact_form_name: "Name", contact_form_phone: "Phone", contact_form_company: "Company", contact_form_desc: "Message", contact_form_submit: "Submit",
  contact_wechat: "WeChat", contact_address: "Address", contact_phone: "Phone", contact_email: "Email",
  faq_title: "FAQ", faq_title_en: "",
  faq_q1: "How to start?", faq_a1: "Contact us via the form or phone. Tell us your needs and we'll respond within 24 hours with a quote and samples.",
  faq_q2: "What's the minimum order?", faq_a2: "MOQ varies by product, typically 100kg minimum. We support small trial orders, negotiable.",
  faq_q3: "How is logistics handled?", faq_a3: "We provide full cold chain logistics, 48-hour delivery from Yunnan to major Chinese cities. You can also designate your own carrier.",
  faq_q4: "How is quality guaranteed?", faq_a4: "Every batch is traceable with third-party testing reports. All our partner farms are certified for green food production.",
  faq_q5: "Can you issue invoices?", faq_a5: "Yes. We support standard and special VAT invoices with corporate bank transfers.",
  about_title: "About Us", about_title_en: "", about_subtitle: "Rooted in the Yunnan Plateau, connecting to tables nationwide",
  about_company_title: "Yunnan Plateau Supply Chain", about_desc_p1: "We have deep roots in Yunnan's highland produce supply chain, with stable partner farms across Dali, Zhaotong, Chuxiong, Honghe, and Yuxi — covering leafy greens, solanaceous fruits, root vegetables, fruits, and wild mushrooms.", about_desc_p2: "Leveraging Yunnan's unique highland climate — abundant sunshine, wide day-night temperature variation, pristine ecology — our produce excels in quality, flavor, and safety.", about_desc_p3: "From field pre-cooling, sorting and packaging to cold chain transport, we've built a complete post-harvest system ensuring products reach our partners in optimal condition.", about_image_placeholder: "Company Photo (to be provided)",
  about_bases_title: "Growing Regions", about_bases_subtitle: "Covering Yunnan's six core growing areas",
  about_certs_title: "Certifications", about_certs_subtitle: "Quality you can trust",
  inquire_title: "Inquiry & Order", inquire_title_en: "", inquire_product: "Product of Interest", inquire_name: "Your Name *", inquire_phone: "Contact Info *", inquire_qty: "Estimated Quantity", inquire_notes: "Notes", inquire_submit: "Submit Inquiry", inquire_success: "Submitted Successfully!", inquire_success_desc: "We will contact you shortly. Thank you for your inquiry.", inquire_back: "Back to Products",
  inquire_placeholder_name: "Your name", inquire_placeholder_phone: "Phone or WeChat", inquire_placeholder_qty: "e.g. 100kg/month", inquire_placeholder_notes: "Additional requirements...",
  trace_title: "Traceability", trace_title_en: "", trace_subtitle: "Enter the batch code from your product packaging to view complete traceability information", trace_placeholder: "Enter batch code, e.g. YN240720A3F2", trace_search: "Search", trace_recent: "Recently Added Batches",
  trace_result: "Traceability Result", trace_result_en: "", trace_code: "Batch Code", trace_product: "Product", trace_date: "Date", trace_verified: "This traceability data is provided and verified by our suppliers", trace_not_found: "Batch code not found or archived", trace_back: "Back to Search",
  trace_stage_origin: "Origin Info", trace_stage_production: "Processing", trace_stage_testing: "Quality Testing", trace_stage_logistics: "Logistics",
  pdetail_back: "Back to Products", pdetail_trace: "View Traceability", pdetail_inquire: "Inquire Now", pdetail_videos_title: "Videos", pdetail_videos_subtitle: "Origin footage",
  videos_title: "Origin Gallery", videos_title_en: "", videos_subtitle: "Step into the Yunnan highlands and see the source for yourself", videos_empty: "No videos yet, coming soon", videos_submitted_by: "Submitted by",
  partner_title: "Partner Portal", partner_subtitle: "Submit your product video content", partner_form_title: "Submit Video Content", partner_title_field: "Video Title *", partner_url_field: "Video Link *", partner_product_field: "Related Product", partner_notes_field: "Notes", partner_submit: "Submit Video", partner_my_submissions: "My Submissions", partner_empty: "No submissions yet", partner_status_approved: "Approved", partner_status_rejected: "Rejected", partner_status_pending: "Under Review",
  partner_name_prompt: "Please enter your name / company name:", partner_success: "Submitted! Awaiting review before appearing on the site.", partner_fail: "Submission failed, please try again.",
  footer_brand: "Yunnan Plateau Supply Chain", footer_desc: "Yunnan highland produce, direct sourcing, cold chain delivery.", footer_desc_en: "From field to table, we guard every bite of freshness.", footer_nav: "Navigation", footer_nav_en: "", footer_contact: "Contact Us", footer_contact_en: "",
  common_loading: "Loading...", common_error: "Network error", common_save: "Save", common_cancel: "Cancel", common_edit: "Edit", common_delete: "Delete", common_confirm_delete: "Confirm delete?", common_no_data: "No data", common_back: "Back",
  admin_login: "Admin Login", admin_password: "Password", admin_login_btn: "Login", admin_login_error: "Incorrect password",
  coop_dealer: "Distribution Partner", coop_dealer_desc: "Stable supply and pricing for wholesale market distributors, small trial orders supported.",
  coop_supermarket: "Supermarket Direct", coop_supermarket_desc: "Customized supply plans for supermarket chains and fresh produce stores, including pre-packaging and private labeling.",
  coop_group: "Community Group Buy", coop_group_desc: "Direct fulfillment for community group-buy platforms, origin-to-doorstep, fewer middlemen.",
  coop_dropship: "Dropshipping", coop_dropship_desc: "Origin dropshipping service, ideal for e-commerce sellers and livestream channels.",
  cat_all: "All", cat_fruit: "Fruits", cat_leafy: "Leafy Greens", cat_solanum: "Solanaceous", cat_root: "Root Vegetables", cat_mushroom: "Mushrooms",
  seasonal_badge: "Seasonal Picks",
  origin_label: "Origin",
};

const zh: Translations = {
  nav_home: "首页", nav_products: "产品展示", nav_about: "关于我们", nav_contact: "合作咨询", nav_videos: "视频展示", nav_trace: "溯源查询",
  hero_title: "云南高原蔬果供应链", hero_tagline: "Yunnan Plateau · Fresh Produce · Global Supply", hero_subtitle: "源头种植 · 冷链直发 · 品控溯源\n从云岭高原到您的餐桌，我们守护每一口新鲜", hero_cta_contact: "合作咨询", hero_cta_products: "查看产品", hero_cta_contact_en: "Get in Touch", hero_cta_products_en: "View Products",
  stat_regions: "核心产区", stat_regions_en: "Growing Regions", stat_farms: "合作基地", stat_farms_en: "Partner Farms", stat_delivery: "冷链直达", stat_delivery_en: "Cold Chain Delivery", stat_categories: "产品品类", stat_categories_en: "Categories",
  adv_title: "为什么选择我们", adv_title_en: "Why Choose Us", adv_subtitle: "三大核心能力，构建从高原田间到全国餐桌的可靠供应链",
  flow_title: "合作流程", flow_title_en: "How We Work", flow_subtitle: "四步开启合作，从产地到货架全程无忧",
  flow_step1_title: "咨询选品", flow_step1_desc: "告知需求，我们推荐合适产品与报价",
  flow_step2_title: "确定品质", flow_step2_desc: "确认产品规格与质量标准，锁定供应方案",
  flow_step3_title: "签约排产", flow_step3_desc: "签订合同，锁定价格与供应周期",
  flow_step4_title: "冷链发货", flow_step4_desc: "产地直发，48小时内冷链送达",
  products_title: "精选产品", products_title_en: "Featured Products", products_subtitle: "覆盖云南六大核心产区，高原品质，源头直供", products_view_all: "查看全部产品", products_seasonal: "当季推荐",
  trust_title: "为什么客户选择我们", trust_item1_title: "源头直供", trust_item1_desc: "云南6大产区自有合作基地，去除中间环节，价格透明", trust_item2_title: "品质保障", trust_item2_desc: "每批次可溯源，通过国家绿色食品认证，农残检测公开", trust_item3_title: "专业服务", trust_item3_desc: "一对一客户经理，从选品到物流全程跟进，7×24h响应",
  card_trace: "溯源查询", card_inquire: "咨询下单", card_season: "供应季节",
  contact_title: "合作咨询", contact_title_en: "Get in Touch", contact_subtitle: "期待与您携手，让云南高原的优质蔬果走进千家万户",
  contact_coop_title: "合作方式", contact_coop_title_en: "Cooperation Models", contact_coop_subtitle: "灵活多样的合作模式，满足不同渠道需求",
  contact_form_title: "在线咨询", contact_form_success: "提交成功！", contact_form_success_desc: "感谢您的咨询，我们将尽快与您联系。",
  contact_info_title: "联系方式", contact_form_name: "姓名", contact_form_phone: "手机号", contact_form_company: "公司名称", contact_form_desc: "需求描述", contact_form_submit: "提交咨询",
  contact_wechat: "微信", contact_address: "地址", contact_phone: "电话", contact_email: "邮箱",
  faq_title: "常见问题", faq_title_en: "FAQ",
  faq_q1: "怎么开始合作？", faq_a1: "通过合作咨询表单或直接电话联系我们，告诉我们您的需求，我们会在24小时内回复并提供产品报价和样品。",
  faq_q2: "最小起订量是多少？", faq_a2: "不同产品起订量不同，一般为100kg起。我们支持小批量试单，具体可协商。",
  faq_q3: "物流怎么解决？", faq_a3: "我们提供全程冷链物流服务，48小时内从云南产地直达全国主要城市。也可由您指定物流公司。",
  faq_q4: "品质如何保证？", faq_a4: "每批次产品均可溯源，提供第三方检测报告。我们所有合作基地均通过国家绿色食品认证。",
  faq_q5: "可以开发票吗？", faq_a5: "可以。我们支持增值税普通发票和专用发票，对公账户结算。",
  about_title: "关于我们", about_title_en: "About Us", about_subtitle: "立足云南高原，连接全国餐桌",
  about_company_title: "云南高原供应链", about_desc_p1: "我们深耕云南高原蔬果供应链多年，在大理、昭通、楚雄、红河、玉溪等核心农业产区建立了稳定的合作种植基地，覆盖叶菜、茄果、根茎、水果、野生菌等全品类。", about_desc_p2: "依托云南独特的高原气候优势——日照充足、昼夜温差大、生态环境优良——我们的产品在品质、口感、安全性上均具有显著优势。", about_desc_p3: "从产地预冷、分拣包装到冷链运输，我们建立了完整的采后处理体系，确保产品在最佳状态下送达合作伙伴手中。", about_image_placeholder: "企业形象图（待提供）",
  about_bases_title: "种植基地", about_bases_subtitle: "覆盖云南六大核心产区",
  about_certs_title: "资质证书", about_certs_subtitle: "品质保证，值得信赖",
  inquire_title: "咨询下单", inquire_title_en: "Inquiry & Order", inquire_product: "意向产品", inquire_name: "称呼 *", inquire_phone: "联系方式 *", inquire_qty: "预计数量", inquire_notes: "备注", inquire_submit: "提交咨询", inquire_success: "提交成功！", inquire_success_desc: "我们会尽快与您联系，感谢您的咨询。", inquire_back: "返回产品页",
  inquire_placeholder_name: "您的称呼", inquire_placeholder_phone: "手机号或微信", inquire_placeholder_qty: "如：100kg", inquire_placeholder_notes: "其他需求...",
  trace_title: "溯源查询", trace_title_en: "Traceability Query", trace_subtitle: "输入产品包装上的溯源码或批次号，查看完整溯源信息", trace_placeholder: "输入溯源码，如 YN240720A3F2", trace_search: "查询", trace_recent: "最近录入的批次",
  trace_result: "溯源结果", trace_result_en: "Traceability Result", trace_code: "溯源码", trace_product: "产品", trace_date: "录入时间", trace_verified: "本溯源数据由供应商提供并审核", trace_not_found: "未找到该溯源码或已归档", trace_back: "返回查询",
  trace_stage_origin: "产地信息", trace_stage_production: "生产加工", trace_stage_testing: "质量检测", trace_stage_logistics: "仓储物流",
  pdetail_back: "返回产品列表", pdetail_trace: "查看溯源", pdetail_inquire: "咨询下单", pdetail_videos_title: "视频展示", pdetail_videos_subtitle: "产地实拍",
  videos_title: "产地实拍", videos_title_en: "Origin Gallery", videos_subtitle: "走进云南高原，看见真实的源头产地", videos_empty: "暂无视频，敬请期待", videos_submitted_by: "投稿：",
  partner_title: "合作伙伴", partner_subtitle: "提交您的产品视频素材", partner_form_title: "提交视频素材", partner_title_field: "视频标题 *", partner_url_field: "视频链接 *", partner_product_field: "关联产品", partner_notes_field: "备注", partner_submit: "提交视频素材", partner_my_submissions: "我的提交记录", partner_empty: "暂无提交记录", partner_status_approved: "已通过", partner_status_rejected: "未通过", partner_status_pending: "审核中",
  partner_name_prompt: "请输入您的姓名/公司名（用于标识您的提交）：", partner_success: "提交成功！等待审核通过后将展示在网站上。", partner_fail: "提交失败，请重试",
  footer_brand: "云南高原供应链", footer_desc: "专注云南高原蔬果供应链，源头直采，冷链直达。", footer_desc_en: "From field to table, we guard every bite of freshness.", footer_nav: "快速导航", footer_nav_en: "Navigation", footer_contact: "联系我们", footer_contact_en: "Contact Us",
  common_loading: "加载中...", common_error: "网络错误", common_save: "保存", common_cancel: "取消", common_edit: "编辑", common_delete: "删除", common_confirm_delete: "确定删除？", common_no_data: "暂无数据", common_back: "返回",
  admin_login: "后台管理", admin_password: "管理密码", admin_login_btn: "登 录", admin_login_error: "密码错误",
  coop_dealer: "经销合作", coop_dealer_desc: "面向各地批发市场经销商，提供稳定供应和价格保障，支持小批量试单。",
  coop_supermarket: "商超直供", coop_supermarket_desc: "为连锁超市、生鲜门店提供定制化供货方案，含预包装、品牌代工。",
  coop_group: "社区团购", coop_group_desc: "支持社区团购平台一件代发，产地直发，减少中间环节。",
  coop_dropship: "一件代发", coop_dropship_desc: "产地一件代发服务，适合电商卖家、直播带货渠道。",
  cat_all: "全部", cat_fruit: "水果类", cat_leafy: "叶菜类", cat_solanum: "茄果类", cat_root: "根茎类", cat_mushroom: "菌类",
  seasonal_badge: "当季推荐",
  origin_label: "产地",
};

const translations: Record<Lang, Translations> = { en, zh };

// Context
interface LangContextType {
  lang: Lang;
  t: Translations;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  t: en,
  setLang: () => {},
  toggleLang: () => {},
});

export function useT() {
  return useContext(LangContext);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang;
    if (stored === "zh" || stored === "en") setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };

  const toggleLang = () => {
    setLang(lang === "en" ? "zh" : "en");
  };

  return (
    <LangContext.Provider value={{ lang, t: translations[lang], setLang, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}
