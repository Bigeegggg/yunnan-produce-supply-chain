# 供应链产品短视频自动生成系统

> v1.0 MVP — Claude Code 工作流版本

为供应链源头产品自动生成全平台短视频内容包：**脚本 + 视觉指导 + 营销策略**，输出为桌面 DOCX 文件。

---

## 快速开始

### 1. 准备产品信息

老板填写 [product_submission_template.md](product_submission_template.md) 模板，或直接向你描述产品。

### 2. 启动工作流

在 Claude Code 中说：

```
我有一个产品需要生成短视频内容：
产品：宾川沃柑
品类：水果类
产地：云南大理宾川县
价格：12-18元/斤
核心卖点：高原阳光充足、汁多化渣、产地直发
认证：绿色食品
规模：量产
目标人群：25-45岁城市女性
目标平台：抖音、小红书、视频号
```

### 3. 等待生成

工作流自动运行 6 个阶段（约 3-5 分钟），最终 DOCX 出现在桌面。

### 4. 交付

桌面文件 `{产品名}_视频内容包_{日期}.docx` 可直接发送给老板或内容制作团队。

---

## 系统组成

```
supply-chain-video-workflow/
├── README.md                         ← 本文件
├── SKILL.md                          ← 主编排逻辑
├── assemble_docx.py                  ← DOCX 生成脚本
├── product_submission_template.md    ← 产品信息表单模板
├── brand-ip-characters.md            ← IP角色体系（4个可复用角色）
├── category-playbooks.md             ← 品类内容策略手册（5大品类）
├── batch-processor.md                ← 批量处理指南
├── performance-tracker.md            ← 视频效果追踪模板
├── integration-guide.md              ← Next.js 项目集成指南
└── prompts/
    ├── competitor-researcher.md      ← 竞品分析 Agent
    ├── trend-researcher.md           ← 平台趋势 Agent
    ├── audience-researcher.md        ← 人群洞察 Agent
    ├── script-douyin.md             ← 抖音脚本 Agent
    ├── script-xiaohongshu.md        ← 小红书脚本 Agent
    ├── script-wechat.md             ← 视频号脚本 Agent
    ├── visual-comic.md              ← 漫剧分镜 Agent
    ├── visual-avatar.md             ← 数字人指导 Agent
    └── hashtag-strategist.md        ← 标签策略 Agent
```

---

## 产品档次判定速查

| 特征 | 普通品 → 漫剧 | 精品 → 数字人 |
|---|---|---|
| 价格 | < ¥30/斤 | ≥ ¥30/斤 或礼盒 |
| 认证 | 基础或无 | 绿色/有机/地理标志 |
| 产量 | 大规模量产 | 手工作坊/限量 |
| 用途 | 日常消费 | 送礼/养生/高端 |
| IP角色 | 宾川阿伯/昆阳大嫂/山间老农 | 云品推荐官 |

---

## 各平台差异化一览

| 维度 | 抖音 | 小红书 | 视频号 |
|---|---|---|---|
| 时长 | 15-35秒 | 30-60秒 | 20-40秒 |
| 风格 | 快节奏、高能量 | 慢种草、精致 | 温情、信任 |
| 钩子 | 价格冲击/视觉冲击 | 精美画面+文字 | 真实故事 |
| 受众 | 泛人群 | 25-40岁女性 | 30-55岁家庭 |
| 标签 | 3-5个精准 | 5-8个搜索优化 | 2-3个即可 |

---

## 成本路径

| 阶段 | 方案 | 月成本 | 适合 |
|---|---|---|---|
| MVP | 剪映图文成片 | ¥0 | 验证想法 |
| 批量化 | 来画动画 | ¥99 | 跑通模式 |
| 品牌化 | 外包插画师 | ¥500-2000 | 建立IP |
| 规模化 | AI API+模板 | ¥500-2000 | 持续产出 |

---

## 常见问题

**Q: 生成的脚本可以直接用吗？**
A: 脚本是专业级的，可以直接交给制作团队执行。但建议人工过一遍，根据实际情况微调。

**Q: 漫剧动画怎么做出来？**
A: 将分镜方案导入剪映"图文成片"或来画动画，选择角色和场景，自动生成。一个视频约 5-15 分钟。

**Q: 数字人视频怎么做出来？**
A: 将脚本导入 HeyGen 或商汤如影，选择数字人形象，生成口播视频。再导入剪映加入 B-roll 和字幕。

**Q: 能批量处理多个产品吗？**
A: 见 [batch-processor.md](batch-processor.md)。同品类产品可以共享市场调研结果，大幅提效。

**Q: 怎么知道视频效果好不好？**
A: 见 [performance-tracker.md](performance-tracker.md)。记录每个视频的播放量、互动率、转化率，持续优化。
