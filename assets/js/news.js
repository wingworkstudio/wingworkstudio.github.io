/**
 * 飞友工作室 · 工作室动态（时间线）
 * 字段：date 发布日期 / author 作者 / text 内容
 * 新增消息：在数组头部插入一条即可
 */
const NEWS = [
  {
    date: "2026-08-21",
    author: "降落是737gjs八v八",
    text: "最近要准备比赛，有点忙，过了比赛之后就不忙了。",
  },
  {
    date: "2026-08-19",
    author: "一架在香港进近的东航A330",
    text: "我给工作室做了个网页。",
  },
  {
    date: "2026-08-11",
    author: "本命A350",
    text: "我们工作室招新吗？如果招的话我给我的新作品上个宣传。",
  },
  {
    date: "2026-08-07",
    author: "一架DC11",
    text: "但是我不太会制作飞行游戏。",
  },
];

// 渲染：按时间倒序生成时间线
function renderNews(containerSelector) {
  const el = document.querySelector(containerSelector);
  if (!el) return;
  const sorted = [...NEWS].sort((a, b) => (a.date < b.date ? 1 : -1));
  const html = sorted
    .map((n) => {
      const d = new Date(n.date);
      const fmt = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      return `
      <li class="timeline__item">
        <time class="timeline__date">${fmt}</time>
        <div class="timeline__body">
          <p class="timeline__text">${escapeHtml(n.text)}</p>
          <span class="timeline__author">— ${escapeHtml(n.author)}</span>
        </div>
      </li>`;
    })
    .join("");
  el.innerHTML = `<ol class="timeline">${html}</ol>`;
};

window.NEWS = NEWS;
