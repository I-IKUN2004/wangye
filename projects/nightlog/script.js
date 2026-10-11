const posts = {
  code: { category: '开发手记 / 001', title: '从一个想法，到能打开的网页', paragraphs: [
    '很多时候，一个项目并不是从完整的计划开始的。可能只是脑海里突然出现一个画面：如果把这个想法做成网页，会是什么样？',
    '我喜欢从结构和视觉开始，一边写代码，一边在浏览器里观察它的变化。按钮的反馈、页面的间距、手机上的阅读体验，这些细节让作品慢慢有了自己的性格。',
    '「拾鲜集」就是一次这样的尝试：把购物流程拆成不同页面，再让搜索、收藏和购物车真的能点、能用。下一次，也许会是完全不同的主题。' ] },
  game: { category: '游戏世界 / 002', title: '在方块世界里，继续建造', paragraphs: [
    'Minecraft 吸引我的地方，是它总能给一个想法留下实现的空间。一座建筑、一条规则，甚至一个很小的交互，都能改变玩家在世界里的体验。',
    '我会研究服务器玩法，也会写插件去解决实际遇到的问题。一个功能从想法、调试到有人使用，这个过程和做网页有些相似。',
    '好的世界会一直生长。慢慢做，认真打磨，让每个后来的人都能找到属于自己的故事。' ] },
  idea: { category: '灵感碎片 / 003', title: '为什么我喜欢深夜的灵感', paragraphs: [
    '深夜安静下来时，很多零散的想法反而会连在一起。一段音乐、一幅动漫场景，或者游戏里的一束光，都能让我想起还可以做点什么。',
    '我把这些念头留在笔记里，不急着让每一个都变成项目。有些只是好玩的画面，有些会在很久以后成为网页、插件或一段文字。',
    '这个空间也一样。它会随着新作品慢慢变化，记录当下正在喜欢和尝试的事情。' ] }
};

const search = document.querySelector('#search');
const cards = [...document.querySelectorAll('.story')];
search.addEventListener('input', () => {
  const query = search.value.trim().toLocaleLowerCase();
  let count = 0;
  cards.forEach(card => {
    const visible = card.dataset.text.toLocaleLowerCase().includes(query);
    card.hidden = !visible;
    if (visible) count++;
  });
  document.querySelector('.no-results').hidden = count !== 0;
});
document.addEventListener('keydown', event => {
  if (event.key === '/' && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) {
    event.preventDefault(); search.focus();
  }
});

const dialog = document.querySelector('.post-dialog');
let lastTrigger;
document.querySelectorAll('.read-note').forEach(button => button.addEventListener('click', () => {
  const post = posts[button.dataset.note];
  lastTrigger = button;
  document.querySelector('#post-category').textContent = post.category;
  document.querySelector('#post-title').textContent = post.title;
  document.querySelector('#post-body').replaceChildren(...post.paragraphs.map(text => { const p = document.createElement('p'); p.textContent = text; return p; }));
  dialog.showModal();
}));
document.querySelector('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => lastTrigger?.focus());

const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? '关闭导航菜单' : '打开导航菜单');
  nav.classList.toggle('open', open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', '打开导航菜单'); }));

const audio = document.querySelector('#ambient');
const play = document.querySelector('#play');
const elapsed = document.querySelector('#elapsed');
const progress = document.querySelector('.progress span');
play.addEventListener('click', async () => {
  if (audio.paused) {
    try { await audio.play(); } catch { play.setAttribute('aria-label', '音乐无法播放'); }
  } else audio.pause();
});
audio.addEventListener('play', () => {
  play.textContent = 'Ⅱ'; play.setAttribute('aria-label', '暂停背景音乐'); play.setAttribute('aria-pressed', 'true');
});
audio.addEventListener('pause', () => {
  play.textContent = '▶'; play.setAttribute('aria-label', '播放背景音乐'); play.setAttribute('aria-pressed', 'false');
});
audio.addEventListener('timeupdate', () => {
  elapsed.textContent = `0:${String(Math.floor(audio.currentTime) % 60).padStart(2, '0')}`;
  progress.style.width = `${audio.duration ? audio.currentTime / audio.duration * 100 : 0}%`;
});
audio.addEventListener('ended', () => { audio.currentTime = 0; });

document.querySelectorAll('.copy-contact').forEach(button => button.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(button.dataset.copy);
    document.querySelector('#copy-status').textContent = '已复制到剪贴板';
    const original = button.textContent;
    button.textContent = '已复制 ✓';
    setTimeout(() => { button.textContent = original; }, 1800);
  } catch {
    document.querySelector('#copy-status').textContent = '复制失败，请长按号码复制';
  }
}));
