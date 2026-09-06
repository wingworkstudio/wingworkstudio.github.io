/**
 * 公共工具
 * - escapeHtml：防 XSS（数据驱动渲染必备）
 * - BRAND：统一品牌名
 * - 复制按钮、Web Audio 彩蛋初始化
 */
const BRAND = "飞友工作室 WingWorksStudio";

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (s) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[s]));
}

// 联系方式：复制按钮（用于邮箱 / 协作信息）
function initCopyButtons() {
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const text = btn.dataset.copy;
      try {
        await navigator.clipboard.writeText(text);
        const original = btn.textContent;
        btn.textContent = "已复制 ✓";
        setTimeout(() => (btn.textContent = original), 2000);
      } catch (e) {
        btn.textContent = text; // 降级：直接显示
      }
    });
  });
}

// 彩蛋：Web Audio 合成《Counting Stars》简单旋律
// 兼容浏览器「首次交互后才允许播放音频」策略：绑定在用户点击事件上
function initAudioEasterEgg() {
  const btn = document.querySelector("[data-audio-play]");
  if (!btn) return;
  let ctx = null;
  let playing = false;

  // 《Counting Stars》主旋律片段（简化音高序列，单位：半音偏移，基于 A4=440）
  const melody = [
    0, 0, 5, 3, 2, 0, 3, 0,
    0, 0, 5, 3, 2, 0, 7, 5,
  ];
  const baseFreq = 220; // A3

  function playNote(freq, startTime, duration) {
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(0.2, startTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration - 0.02);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  function start() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === "suspended") ctx.resume();
    const now = ctx.currentTime;
    const beat = 0.28;
    melody.forEach((semi, i) => {
      const freq = baseFreq * Math.pow(2, semi / 12);
      playNote(freq, now + i * beat, beat * 0.9);
    });
  }

  btn.addEventListener("click", () => {
    if (playing) return;
    playing = true;
    btn.textContent = "🎵 播放中…";
    start();
    setTimeout(() => {
      playing = false;
      btn.textContent = "🎵 点击播放";
    }, melody.length * 280 + 200);
  });
}

// 页面初始化：品牌名、当前年份、复制按钮、彩蛋
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-brand]").forEach((el) => (el.textContent = BRAND));
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  initCopyButtons();
  initAudioEasterEgg();
});
