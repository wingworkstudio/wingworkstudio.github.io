# 飞友工作室 · WingWorksStudio

> 编程猫社区 · 航空 & 模拟飞行 & 编程创作  
> 官方站点：`https://wingworkstudio.github.io`

## 这是什么
飞友工作室（WingWorksStudio）是编程猫社区内的航空爱好者创作团队，专注飞行模拟、航空题材编程作品及相关创意开发。  
本仓库是工作室的官方静态站点，托管于 GitHub Pages。

## 目录结构
```
wingworkstudio.github.io/
├── index.html              # 主页（着陆页，精彩瞬间 + 入口）
├── gateway.html            # 滑动解锁入口（原 index.html 验证页）
├── about.html              # 工作室介绍
├── members.html            # 人员名单（members.js 驱动）
├── news.html               # 工作室动态（news.js 时间线）
├── join.html               # 招新说明
├── faq.html                # 常见问题
├── contact.html            # 联系我们
├── 404.html
├── works/
│   ├── c919.html           # C919 模拟飞行 2026
│   ├── atc.html            # 模拟空管 V0.3.7
│   ├── airport-express.html # 港铁机场快线模拟驾驶
│   └── dc10.html           # DC-10 模拟飞行
├── pages/                  # 保留：旧 wws.html 归档
│   └── wws.html
├── admin/                  # 未公开管理入口（含口令遮挡，非鉴权）
│   └── index.html
├── assets/
│   ├── css/
│   │   ├── reset.css
│   │   ├── tokens.css       # 设计变量（颜色/字号）
│   │   ├── layout.css
│   │   └── components.css
│   ├── js/
│   │   ├── entropy-gate.js  # 熵值检测（香农信息熵 CAPTCHA，index/gateway 共用）
│   │   ├── members.js       # 人员数据
│   │   ├── news.js          # 动态数据
│   │   ├── works.js         # 作品数据
│   │   ├── contact.js       # 复制按钮
│   │   └── audio-easter-egg.js  # Counting Stars 彩蛋
│   └── img/
└── README.md
```

## 本地开发
1. 克隆：`git clone https://github.com/wingworkstudio/wingworkstudio.github.io.git`
2. 进入目录：`cd wingworkstudio.github.io`
3. 本地预览（任选其一）：
   - `python3 -m http.server 8000` → 打开 `http://localhost:8000`
   - VS Code：Live Server 插件右键 `index.html` → Open with Live Server
4. 修改后提交推送，GitHub Pages 自动部署。

## 部署（GitHub Pages）
1. 仓库 Settings → Pages → Source：`main` 分支 → `/ (root)`
2. 自定义域名（可选）：在仓库根放 `CNAME` 文件写域名
3. 访问 `https://wingworkstudio.github.io`

## 规范说明
- **品牌名统一**：WingWorksStudio（写作/显示用）、wingworkstudio（技术/URL 用小写连写）
- **静态站无服务端**：`admin/` 仅有口令遮挡，**不是鉴权**，请勿存放敏感数据
- **隐私**：联系方式中 QQ 以图片/中转呈现，避免爬虫抓取

## 熵值检测（CAPTCHA）
主页 `index.html` 与入口 `gateway.html` 共用一套**香农信息熵**判定（见 `assets/js/entropy-gate.js`）：

- **原理**：拖动过程中按时间采样拇指位置 → 对位置序列**差分得到速度（相邻位移）序列** → 速度除以「本次拖动的最大单步位移」归一化后均匀分桶得概率分布 pᵢ → 计算  
  `H = −Σ pᵢ · log₂(pᵢ)`，归一化到 `Ĥ ∈ [0, 1]`
- **为什么用速度 + 自适应归一化**：若直接对「位置」分桶，拖到尽头时匀速/抖动都会填满所有桶而误判；若速度除以滑块行程（数百 px），单步位移（几 px）会被压到第 0 桶致熵恒≈0。故除以「本次最大单步位移」自适应展开
- **放行逻辑**：匀速轨迹速度恒定 → 分布尖锐 → 低熵被拦截；只有自然抖动/变速（速度分散 → 平坦分布 → 高熵）才能达标
- **放行**：拖到尽头 **且** `Ĥ ≥ 0.85`（真实人手实测 H≈0.87–0.92，稳定通过；匀速/脚本直线 H≈0.2 被拦截）
- **两种模式**（由 `data-entropy-mode` 切换）：
  - `gateway`（默认）：解锁后跳转 `index.html`
  - `inline`（`index.html`）：解锁后揭示被遮挡的主内容（`[data-entropy-content]`）
- **界面**：实时显示 H 数值、进度条、公式 `H = −Σ pᵢ log₂pᵢ · 归一化 · 进度 p`

> ⚠️ 仅为入口交互趣味性，**不构成鉴权 / 安全防护**。静态前端可绕，请勿据此保护真实数据。

## License
CC BY-NC-SA 4.0
