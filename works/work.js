/**
 * 作品详情页渲染：每个 works/<slug>.html 都是此模板的静态副本，
 * 通过 URL 的 #slug 或 <meta name="work-slug"> 指定作品。
 * 为兼容静态托管（无构建步骤），各作品页已内联对应数据；
 * 本文件提供通用渲染函数，供 works/index.html 列表页使用。
 */
function renderWorkPage(slug) {
  const work = WORKS.find((w) => w.slug === slug);
  const root = document.querySelector("[data-work-root]");
  if (!root) return;
  if (!work) {
    root.innerHTML = `<div class="card text-center"><h1>404 · 作品未找到</h1><a class="btn btn--primary mt-4" href="../index.html#works">← 返回作品列表</a></div>`;
    document.title = "作品未找到 · 飞友工作室 WingWorksStudio";
    return;
  }
  document.title = `${work.title} · 飞友工作室 WingWorksStudio`;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute("content", work.desc);
  root.innerHTML = `
    <div class="section__head">
      <span class="work__tag">${work.tag}</span>
      <h1 class="section__title">${work.title}</h1>
      <p class="section__lead">状态：${work.status} · 作者：${escapeHtml(work.author)}</p>
    </div>
    <div class="card" style="max-width:760px;margin:0 auto;">
      <p>${escapeHtml(work.desc)}</p>
      <h3 class="mt-4">✨ 亮点</h3>
      <ul style="padding-left:1.2em;list-style:disc;color:var(--color-text-muted);">
        ${work.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join("")}
      </ul>
      <a class="btn btn--ghost mt-4" href="../index.html#works">← 返回作品列表</a>
    </div>`;
}
