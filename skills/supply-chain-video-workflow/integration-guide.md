# Next.js 项目集成指南

> 将本工作流从 Claude Code 对话升级为云南项目 (`yunnan-produce/`) 的 Web 功能模块。

---

## 集成路径（三阶段）

### 阶段一：API 化（最小集成）

在现有项目中新增一个 API 端点，触发工作流。

**新增文件**:
```
app/api/video-generator/route.ts    # POST 端点
app/admin/video-generator/page.tsx  # 管理后台页面
```

**API 设计**:
```typescript
// POST /api/video-generator
// Body: ProductSubmission (见 product_submission_template.md)
// Response: { job_id: string, status: "processing" }

// GET /api/video-generator?job_id=xxx
// Response: { status: "completed", docx_url: "...", summary: {...} }
```

**核心逻辑**:
```typescript
// app/api/video-generator/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  
  // 1. 验证产品信息
  // 2. 调用工作流（通过 CLI 或直接调用 agent）
  // 3. 返回 job_id
  // 4. 异步生成 DOCX
  // 5. 完成后更新状态
  
  const jobId = generateJobId();
  startWorkflow(jobId, body); // 异步执行
  
  return NextResponse.json({ job_id: jobId, status: 'processing' });
}
```

---

### 阶段二：Web 界面（完整体验）

在管理后台新增 `/admin/video-generator` 页面。

**页面布局**:
```
┌──────────────────────────────────────────┐
│  短视频内容生成                           │
├──────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────────────┐│
│  │  产品表单     │  │  预览 & 历史         ││
│  │             │  │                     ││
│  │  产品名: [] │  │  📋 宾川沃柑        ││
│  │  品类:   [] │  │     2026-07-21      ││
│  │  产地:   [] │  │     [下载DOCX]      ││
│  │  卖点:   [] │  │                     ││
│  │  ...       │  │  📋 元谋葡萄        ││
│  │             │  │     2026-07-20      ││
│  │  [生成内容] │  │     [下载DOCX]      ││
│  └─────────────┘  └─────────────────────┘│
└──────────────────────────────────────────┘
```

**组件树**:
```
app/admin/video-generator/
├── page.tsx                   # 主页面（服务端组件）
├── VideoGeneratorClient.tsx   # 客户端交互逻辑
├── ProductForm.tsx            # 产品信息表单（可复用现有 ProductForm 模式）
├── GenerationProgress.tsx     # 生成进度条（6阶段进度）
├── HistoryList.tsx            # 历史记录列表
└── DocxPreview.tsx            # DOCX 在线预览
```

**新增数据库表** (复用 SQLite 模式):
```sql
CREATE TABLE video_generations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_name TEXT NOT NULL,
  product_data TEXT NOT NULL,        -- JSON
  tier TEXT NOT NULL,                -- 'simple' | 'premium'
  tier_score INTEGER,
  status TEXT DEFAULT 'processing',  -- 'processing' | 'completed' | 'failed'
  docx_path TEXT,                    -- 本地路径
  result_summary TEXT,               -- JSON
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);
```

---

### 阶段三：自动化（理想状态）

不再需要手动触发，系统自动化运作。

**触发条件**:
- 新产品上架 → 自动生成首批内容
- 每周一 → 自动生成本周内容日历
- 换季 → 根据季节性日历自动切换内容主题
- 库存清仓 → 自动生成促销类内容

**通知**:
- 生成完成 → 企业微信/飞书通知
- 达到发布时间 → 提醒老板发布
- 视频表现异常 → 预警通知

---

## 技术实现细节

### 1. 复用现有组件

| 现有文件 | 可复用内容 |
|---|---|
| `components/ProductForm.tsx` | 产品表单 UI 模式 |
| `components/AdminSidebar.tsx` | 管理后台侧边栏（新增菜单项） |
| `lib/db.ts` | 数据库连接和迁移模式 |
| `lib/auth.ts` | JWT 认证（已有 admin_token） |
| `app/admin/layout.tsx` | 管理后台布局 |
| `app/admin/products/` | CRUD 操作模式参考 |

### 2. DOCX 生成

**选项 A**: 保持 Python 脚本，Node.js 通过 `child_process` 调用
```typescript
import { exec } from 'child_process';
exec(`python skills/supply-chain-video-workflow/assemble_docx.py ${jsonPath}`);
```

**选项 B**: 用 Node.js 重写（`docx` npm 包）
```
npm install docx
```
优点：不依赖 Python 环境；缺点：需要重写 `assemble_docx.py`

> **建议**: MVP 阶段用选项 A（调 Python），后续再考虑选项 B。

### 3. 工作流执行

在 Next.js 环境中，工作流执行方式：
- **同步**: 直接调用 Agent API（需要 Anthropic API key）
- **异步队列**: 用 Bull/BullMQ 或简单的 SQLite 队列
- **外部触发**: 调用 Claude Code CLI

> MVP 建议：手动在 Claude Code 中触发，生成 DOCX 后手动上传。先不做自动化集成。

---

## 管理后台菜单扩展

在 [AdminSidebar.tsx](C:\Users\19821\yunnan-produce\components\AdminSidebar.tsx) 中新增：

```tsx
// 在现有导航项中添加
{ 
  href: '/admin/video-generator', 
  label: '视频内容生成', 
  icon: '🎬' 
}
```

---

## 环境依赖

如果选择 API 化，需要额外安装：

```bash
# 无额外依赖 — 现有项目已有所有必要的包
# 只需确保 python + python-docx 可用
python -m pip install python-docx
```

---

## 优先级建议

| 优先级 | 功能 | 工作量 | 价值 |
|---|---|---|---|
| P0 | 表单页面 + 触发生成 | 2-3天 | 核心功能 |
| P0 | 历史记录列表 | 1天 | 基本体验 |
| P1 | 生成进度展示 | 1天 | 体验优化 |
| P1 | DOCX 在线预览 | 1天 | 方便查看 |
| P2 | 自动化触发 | 3天 | 提效 |
| P2 | 通知系统 | 1天 | 闭环 |
| P3 | 数据分析看板 | 3-5天 | 长期价值 |
