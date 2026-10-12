if (document.querySelector('.hero-home')) {
  const homeStyles = document.createElement('link');
  homeStyles.rel = 'stylesheet';
  homeStyles.href = 'home.css';
  document.head.append(homeStyles);
}

const refinements = document.createElement('link');
refinements.rel = 'stylesheet';
refinements.href = 'refinements.css';
document.head.append(refinements);

const siteRefinements = document.createElement('link');
siteRefinements.rel = 'stylesheet';
siteRefinements.href = 'site-refinements.css';
document.head.append(siteRefinements);

const headerFix = document.createElement('link');
headerFix.rel = 'stylesheet';
headerFix.href = 'header-fix.css';
document.head.append(headerFix);

const finalLayout = document.createElement('link');
finalLayout.rel = 'stylesheet';
finalLayout.href = 'final-layout.css';
document.head.append(finalLayout);

if (document.querySelector('.hero-home')) {
  const heroLayout = document.createElement('link');
  heroLayout.rel = 'stylesheet';
  heroLayout.href = 'hero-layout.css';
  document.head.append(heroLayout);
  const heroTweak = document.createElement('link');
  heroTweak.rel = 'stylesheet';
  heroTweak.href = 'hero-tweak.css';
  document.head.append(heroTweak);
  const habitatPosition = document.createElement('link');
  habitatPosition.rel = 'stylesheet';
  habitatPosition.href = 'habitat-position.css';
  document.head.append(habitatPosition);
}

if (document.querySelector('.timeline-axis')) {
  const timelineStyles = document.createElement('link');
  timelineStyles.rel = 'stylesheet';
  timelineStyles.href = 'timeline.css';
  document.head.append(timelineStyles);
}

const button = document.querySelector('.menu-button');
const nav = document.querySelector('.navigation');
if (nav) {
  nav.innerHTML = `
    <a href="index.html#about" data-en="ABOUT" data-zh="關於">ABOUT</a>
    <a href="works.html" data-en="WORKS" data-zh="作品">WORKS</a>
    <a href="bio.html" data-en="BIO" data-zh="自傳">BIO</a>
    <a href="index.html#contact" data-en="CONTACT" data-zh="聯絡">CONTACT</a>`;
}

const heroDecor = document.querySelector('.hero-coordinate');
if (heroDecor) heroDecor.innerHTML = '<img src="images/habitat_hero.webp" alt="Primitive Habitat wireframe">';

document.querySelectorAll('footer').forEach((footer) => {
  const notice = footer.querySelector('p');
  if (notice) notice.textContent = 'For educational use only.';
  if (!footer.querySelector('.site-footer-github')) {
    const github = document.createElement('a');
    github.className = 'site-footer-github';
    github.href = 'https://github.com/';
    github.target = '_blank';
    github.rel = 'noopener noreferrer';
    github.textContent = 'GITHUB ↗';
    footer.append(github);
  }
});

const bioGrid = document.querySelector('.bio-grid');
if (bioGrid && !document.querySelector('.bio-timeline')) {
  const bioTimeline = document.createElement('section');
  bioTimeline.className = 'bio-timeline';
  bioTimeline.innerHTML = `<h2>Selected Timeline</h2><div class="bio-axis">
    <article class="bio-event left"><time>2023</time><h3>Primitive Habitat</h3><p>Constructed landscape</p></article>
    <article class="bio-event right"><time>2024</time><h3>Two Meters of Motion</h3><p>Body, measure, sequence</p></article>
    <article class="bio-event left"><time>2025</time><h3>Topology of Perception</h3><p>Optical space / visual research</p></article>
    <article class="bio-event right"><time>2025</time><h3>Threshold</h3><p>Housing and collective edge</p></article>
    <article class="bio-event left"><time>2026</time><h3>Movement</h3><p>Urban choreography / architectural research</p></article>
  </div>`;
  bioGrid.after(bioTimeline);
  const bioTimelineStyles = document.createElement('link');
  bioTimelineStyles.rel = 'stylesheet';
  bioTimelineStyles.href = 'bio-timeline.css';
  document.head.append(bioTimelineStyles);
}

const workMainImages = {
  threshold: ['images/threshold-model-main.webp', 'Threshold — main model'],
  movement: ['images/movement-model-main.webp', 'Movement — main model'],
  topology: ['images/bird-main.webp', 'Topology of Perception — main image'],
  'two-meters': ['images/two-meters-main.webp', 'Two Meters of Motion — main image'],
  primitive: ['images/habitat-render-main.webp', 'Primitive Habitat — main render'],
};
Object.entries(workMainImages).forEach(([project, [source, alt]]) => {
  const slot = document.querySelector(`.${project} .image-slot`);
  if (!slot) return;
  slot.classList.add('has-image');
  const image = document.createElement('img');
  image.src = source;
  image.alt = alt;
  slot.prepend(image);
});
if (button && nav) {
  button.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open');
    button.setAttribute('aria-expanded', 'false');
  }));
}

const languageToggle = document.querySelector('.language-toggle');
const localizedText = {
  'Timeline': '時間軸',
  'Primitive Habitat': '原始棲居',
  'Two Meters of Motion': '兩公尺的運動',
  'Topology of Perception': '感知拓撲',
  'Threshold': '閾限',
  'Movement': '運動',
  'Hsu Hsuan': '許瑄',
  '[ SELECTED TIMELINE ]': '［作品時間軸］',
  '[ BIO ]': '［自傳］',
  'Constructed landscape': '建構的地景',
  'Body, measure, sequence': '身體、尺度、序列',
  'Optical space / visual research': '視覺空間／視覺研究',
  'Housing and collective edge': '居住與集體邊界',
  'Urban choreography / architectural research': '都市編舞／建築研究',
};
document.querySelectorAll('h1, h2, p').forEach((element) => {
  const english = element.textContent.trim();
  if (localizedText[english] && !element.dataset.en) {
    element.dataset.en = element.innerHTML;
    element.dataset.zh = localizedText[english];
  }
});
let language = localStorage.getItem('portfolio-language') || 'en';
const renderLanguage = () => {
  document.documentElement.lang = language === 'zh' ? 'zh-Hant' : 'en';
  document.querySelectorAll('[data-en][data-zh]').forEach((element) => {
    element.innerHTML = element.dataset[language];
  });
};
renderLanguage();
languageToggle?.addEventListener('click', () => {
  language = language === 'en' ? 'zh' : 'en';
  localStorage.setItem('portfolio-language', language);
  renderLanguage();
});
