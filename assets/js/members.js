/**
 * 飞友工作室 · 人员名单数据
 * 字段：nickname 昵称 / aircraft 机型 / role 职务 / works 代表作品
 */
const MEMBERS = [
  { nickname: "降落是737gjs八v八", aircraft: "B737", role: "室长", works: ["工作室管理", "审核"] },
  { nickname: "B747", aircraft: "B747", role: "副室长", works: [] },
  { nickname: "我是ITNW", aircraft: "—", role: "副室长", works: [] },
  { nickname: "利库扩孔", aircraft: "—", role: "成员", works: [] },
  { nickname: "一架海南航空的A320", aircraft: "A320", role: "成员", works: [] },
  { nickname: "一架在香港进近的东航A330", aircraft: "A330", role: "网页制作", works: ["本工作室主页"] },
  { nickname: "一架在停机坪上国航空客A350", aircraft: "A350", role: "成员", works: [] },
  { nickname: "KOREAN737", aircraft: "B737", role: "成员", works: [] },
  { nickname: "一架正在起飞的联邦MD11", aircraft: "MD-11", role: "成员", works: [] },
  { nickname: "一架正在收起落架的A330", aircraft: "A330", role: "成员", works: [] },
  { nickname: "33DONGJUNKAI", aircraft: "—", role: "成员", works: [] },
  { nickname: "喵系统", aircraft: "—", role: "成员", works: [] },
  { nickname: "飞友C919", aircraft: "C919", role: "成员", works: ["DC-10 模拟飞行", "协作码说明"] },
  { nickname: "本命A350", aircraft: "A350", role: "成员", works: ["C919 模拟飞行 2026"] },
  { nickname: "日本春秋737", aircraft: "B737", role: "成员", works: [] },
  { nickname: "果断的花粉蝶bl54", aircraft: "—", role: "成员", works: [] },
  { nickname: "一架DC11", aircraft: "DC-11", role: "成员", works: ["飞行游戏制作中"] },
  { nickname: "所有的恐惧都源于火力不足", aircraft: "—", role: "成员", works: ["模拟空管 V0.3.7"] },
  { nickname: "耐心的雷电猴40x5", aircraft: "—", role: "成员", works: [] },
];

// 渲染：遍历 MEMBERS 生成卡片
function renderMembers(containerSelector) {
  const el = document.querySelector(containerSelector);
  if (!el) return;
  const html = MEMBERS.map((m) => `
    <article class="card member">
      <header class="member__head">
        <span class="member__role">${m.role}</span>
        <h3 class="member__name">${escapeHtml(m.nickname)}</h3>
      </header>
      <p class="member__aircraft">✈️ ${escapeHtml(m.aircraft)}</p>
      ${m.works.length ? `<ul class="member__works">${m.works.map((w) => `<li>${escapeHtml(w)}</li>`).join("")}</ul>` : ""}
    </article>`).join("");
  el.innerHTML = html;
};

// 显式挂载到全局，确保跨 <script> 可访问
window.MEMBERS = MEMBERS;
