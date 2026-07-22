# 供应链产品短视频自动生成工作流

为供应链源头产品自动生成全平台短视频内容包（脚本 + 视觉指导 + 营销策略），输出为桌面 DOCX 文件。

## 触发方式

用户提供产品信息（表单填写或直接描述），即可启动本工作流。

## 工作流架构

```
产品信息输入
    │
    ▼
Phase 1: 产品分析 ── 结构化提取卖点、打分定档 (inline)
    │
    ▼
Phase 2: 市场调研 ── 3 agents 并行 (竞品 | 趋势 | 人群)
    │
    ▼
Phase 3: 策略设计 ── 分流：漫剧 or 数字人 (inline)
    │
    ▼
Phase 4: 脚本生成 ── 每平台1个agent并行
    │
    ▼
Phase 5: 视觉指导 + 标签策略 ── pipeline 两步
    │
    ▼
Phase 6: 合成 DOCX ── Python 脚本输出到桌面
```

## 产品档次判定规则

根据以下 6 个维度打分（每项 0-100），加权平均 ≥50 走**精品/数字人**路线，<50 走**普通品/漫剧**路线：

| 维度 | 权重 | 普通品特征 (<50分) | 精品特征 (≥50分) |
|---|---|---|---|
| 单价 | 25% | < ¥30/斤，日常消费 | ≥ ¥30/斤，礼品属性 |
| 认证 | 20% | 基础食品安全 | 绿色/有机/地理标志 |
| 产量 | 15% | 量产（吨级） | 手工作坊/限量 |
| 产地 | 15% | 常见产区 | 保护产区/独特风土 |
| 用途 | 15% | 日常/B2B大宗 | 送礼/养生/高端 |
| 故事 | 10% | 基础商品信息 | 丰富文化/传承叙事 |

> 用户可手动覆盖判定结果。

## Phase 1 — 产品分析

**执行方式**: Controller inline（不派遣agent，直接分析）

**步骤**:
1. 从用户输入中提取结构化产品信息
2. 若信息不完整，参考 [product_submission_template.md](product_submission_template.md) 向用户追问关键缺失字段
3. 对 6 个维度评分，判定产品档次
4. 输出规范化的产品档案

**输出示例**:
```json
{
  "product": {
    "product_name": "宾川沃柑",
    "category": "水果类",
    "origin": "云南大理宾川县",
    "price_range": "¥12-18/斤",
    "selling_points": ["高原1800米阳光充足", "汁多化渣甜度高", "产地直发新鲜到家"],
    "story": "大理宾川，海拔1800米高原果园...",
    "certifications": ["绿色食品"],
    "production_scale": "量产",
    "target_audience": "25-45岁注重健康的城市女性",
    "target_platforms": ["抖音", "小红书", "视频号"],
    "brand_name": ""
  },
  "tier": "simple",
  "tier_score": 38,
  "tier_rationale": "价格亲民(15分)、绿色认证(40分)、量产(20分)... 加权38分，判定为普通品，走漫剧路线"
}
```

## Phase 2 — 市场调研（3 agents 并行）

使用 Agent 工具并行启动 3 个研究 agent，每个使用对应的 prompt 文件：

1. **竞品研究员**: 加载 [prompts/competitor-researcher.md](prompts/competitor-researcher.md)
   - 搜索同类产品在各平台的短视频内容
   - 分析成功模式

2. **趋势研究员**: 加载 [prompts/trend-researcher.md](prompts/trend-researcher.md)
   - 搜索各平台热门话题/标签/音乐
   - 识别季节性机会

3. **人群研究员**: 加载 [prompts/audience-researcher.md](prompts/audience-researcher.md)
   - 分析目标人群内容偏好和活跃时间
   - 确定最佳发布时间

**并行调度**: 3 个 agent 同时启动，等待全部完成后汇总结果。

## Phase 3 — 策略设计

**执行方式**: Controller inline

**任务**:
1. 确认产品档次（是否手动覆盖）
2. 汇总 Phase 2 的市场调研结果
3. 确定各平台内容定位差异和优先级排序
4. 生成策略摘要

## Phase 4 — 脚本生成（按平台并行）

**执行方式**: 为 `target_platforms` 中的每个平台启动一个 Agent，所有 agent 并行。

每个 agent 加载对应的 prompt 文件并接收完整的上下文（产品档案 + 市场调研汇总 + 档次判定）：

| 平台 | Prompt 文件 |
|---|---|
| 抖音 | [prompts/script-douyin.md](prompts/script-douyin.md) |
| 小红书 | [prompts/script-xiaohongshu.md](prompts/script-xiaohongshu.md) |
| 视频号 | [prompts/script-wechat.md](prompts/script-wechat.md) |

每个 agent 输出完整的平台脚本，包含分镜表（时间轴+画面+口播+音效+文字叠加）。

## Phase 5 — 视觉指导 + 标签策略（pipeline 两步）

### Step 1: 视觉指导
根据产品档次选择 prompt：

- **普通品/漫剧**: 加载 [prompts/visual-comic.md](prompts/visual-comic.md)，生成 6-8 格漫画分镜
- **精品/数字人**: 加载 [prompts/visual-avatar.md](prompts/visual-avatar.md)，生成 AI 数字人演出指导

### Step 2: 标签策略（依赖 Step 1 完成）
加载 [prompts/hashtag-strategist.md](prompts/hashtag-strategist.md)，生成每个平台的标签组合和发布日历。

## Phase 6 — 合成 DOCX

**执行方式**: 运行 Python 脚本

1. 将所有 Phase 的输出汇总为一个 JSON 文件
2. 运行:
```bash
python skills/supply-chain-video-workflow/assemble_docx.py <tmp.json>
```
3. DOCX 保存到 `C:\Users\19821\Desktop\{产品名}_视频内容包_{日期}.docx`
4. 告知用户文件路径

## 测试用例

### 普通品测试：宾川沃柑
```
产品：宾川沃柑 | 品类：水果类 | 产地：云南大理宾川
价格：¥12-18/斤 | 认证：绿色食品 | 规模：量产
卖点：高原阳光、汁多化渣、产地直发
人群：25-45岁城市女性
预期：判定为普通品 → 漫剧路线
```

### 精品测试：文山三七
```
产品：文山三七 | 品类：根茎类 | 产地：云南文山
价格：¥200-500/斤 | 认证：地理标志、有机 | 规模：手工作坊
卖点：道地药材、手工采挖、养生圣品
人群：35-60岁养生人群、送礼人群
预期：判定为精品 → AI数字人路线
```

## 文件结构

```
skills/supply-chain-video-workflow/
├── SKILL.md                           ← 本文件
├── assemble_docx.py                   ← Phase 6 Python 脚本
├── product_submission_template.md     ← 输入表单模板
└── prompts/
    ├── competitor-researcher.md       ← Phase 2: 竞品研究
    ├── trend-researcher.md            ← Phase 2: 趋势研究
    ├── audience-researcher.md         ← Phase 2: 人群研究
    ├── script-douyin.md              ← Phase 4: 抖音脚本
    ├── script-xiaohongshu.md         ← Phase 4: 小红书脚本
    ├── script-wechat.md              ← Phase 4: 视频号脚本
    ├── visual-comic.md               ← Phase 5: 漫剧分镜
    ├── visual-avatar.md              ← Phase 5: 数字人指导
    └── hashtag-strategist.md         ← Phase 5: 标签策略
```
