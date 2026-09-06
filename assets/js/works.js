/**
 * 飞友工作室 · 代表作品数据
 * 字段：slug 对应 works/<slug>.html / title / tag / desc / author / status / highlights
 */
const WORKS = [
  {
    slug: "c919",
    title: "C919 模拟飞行 2026",
    tag: "开源",
    desc: "由本命A350开发，面向未来的国产大飞机模拟项目。",
    author: "本命A350",
    status: "开发中",
    highlights: ["国产大飞机 C919", "面向未来的模拟架构", "开源协作"],
  },
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

// 渲染：主页精彩瞬间（取全部）
function renderWorksHighlights(containerSelector) {
  const el = document.querySelector(containerSelector);
  if (!el) return;
  const html = WORKS.map(
    (w) => `
    <article class="card work">
      <span class="work__tag">${w.tag}</span>
      <h3 class="work__title">${w.title}</h3>
      <p class="work__desc">${escapeHtml(w.desc)}</p>
      <a class="work__link" href="works/${w.slug}.html">查看详情 →</a>
    </article>`
  ).join("");
  el.innerHTML = html;
};

window.WORKS = WORKS;
