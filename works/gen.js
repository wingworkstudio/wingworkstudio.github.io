const fs = require("fs");
const path = require("path");

// 作品数据（与 works.js 保持一致）
const WORKS = [
  {
    slug: "atc",
    title: "模拟空管 V0.3.7",
    tag: "测试版",
    desc: "由所有的恐惧都源于火力不足制作，体验真实空中交通管制。",
    author: "所有的恐惧都源于火力不足",
    status: "测试版 V0.3.7",
    highlights: ["真实空管逻辑", "多席位协作", "持续迭代中"],
  },
  {
    slug: "airport-express",
    title: "港铁机场快线模拟驾驶",
    tag: "上线",
    desc: "由一架在香港进近的东航A330开发。",
    author: "一架在香港进近的东航A330",
    status: "已上线",
    highlights: ["港铁机场快线", "模拟驾驶体验", "轨道交通题材"],
  },
  {
    slug: "dc10",
    title: "DC-10-10 模拟飞行",
    tag: "经典复刻",
    desc: "由飞友C919制作，经典三发客机模拟体验。",
    author: "飞友C919",
    status: "已完成",
    highlights: ["经典三发客机 DC-10", "DC 系列复刻", "飞行模拟"],
  },
];

const tpl = (w) => `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${w.title} · 飞友工作室 WingWorksStudio</title>
  <meta name="description" content="${w.desc}">
  <meta name="author" content="飞友工作室 WingWorksStudio">
  <link rel="canonical" href="https://wingworkstudio.github.io/works/${w.slug}.html">
  <link rel="stylesheet" href="../assets/css/reset.css">
  <link rel="stylesheet" href="../assets/css/tokens.css">
  <link rel="stylesheet" href="../assets/css/layout.css">
  <link rel="stylesheet" href="../assets/css/components.css">
</head>
<body>

  <header class="site-header">
    <div class="container site-header__inner">
      <a class="brand" href="../index.html"><span class="brand__logo">✈️</span><span data-brand>飞友工作室</span></a>
      <nav class="nav" aria-label="主导航">
        <a href="../about.html">工作室</a>
        <a href="../members.html">人员</a>
        <a href="../index.html#works">作品</a>
        <a href="../news.html">动态</a>
        <a href="../join.html">招新</a>
        <a href="../faq.html">FAQ</a>
        <a href="../contact.html">联系</a>
      </nav>
    </div>
  </header>

  <main class="main">
    <section class="section container" data-work-root>
      <div class="section__head">
        <span class="work__tag">${w.tag}</span>
        <h1 class="section__title">${w.title}</h1>
        <p class="section__lead">状态：${w.status} · 作者：${w.author}</p>
      </div>
      <div class="card" style="max-width:760px;margin:0 auto;">
        <p>${w.desc}</p>
        <h3 class="mt-4">✨ 亮点</h3>
        <ul style="padding-left:1.2em;list-style:disc;color:var(--color-text-muted);">
          ${w.highlights.map((h) => `<li>${h}</li>`).join("")}
        </ul>
        <a class="btn btn--ghost mt-4" href="../index.html#works">← 返回作品列表</a>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container">
      <p>✈️ <span data-brand>飞友工作室 WingWorksStudio</span></p>
      <p>基于编程猫社区 · © <span data-year>2026</span> 保留所有权利 · 未备案</p>
    </div>
  </footer>

  <script src="../assets/js/common.js"></script>
</body>
</html>
`;

WORKS.forEach((w) => {
  const file = path.join(__dirname, `${w.slug}.html`);
  fs.writeFileSync(file, tpl(w), "utf8");
  console.log("generated:", file);
});
