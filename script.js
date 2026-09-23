const CHECKOUT_URL = "https://pay.hotmart.com/B107729661U";
// The first viewport must never wait for an observer before becoming readable.
document.querySelectorAll('.hero .reveal').forEach((element) => element.classList.add('visible'));
const track = document.querySelector('#problem-track');
const dots = document.querySelector('#problem-dots');
const count = document.querySelector('#problem-count');
let page = 0;
let perPage = 5;

function card([number, title, description, image]) {
  return `<article class="problem-card"><img loading="lazy" src="public/images/${image}" alt="${title}"><div><small>PROBLEMA ${number}</small><h3>${title}</h3><p>${description}</p><a href="#oferta">MIRA LA SEÑAL&nbsp; →</a></div></article>`;
}
function refreshCarousel() {
  perPage = innerWidth <= 680 ? 1 : innerWidth <= 1000 ? 2 : 5;
  const total = Math.ceil(PROBLEMS.length / perPage);
  page = Math.min(page, total - 1);
  track.innerHTML = PROBLEMS.map(card).join('');
  dots.innerHTML = Array.from({ length: total }, (_, index) => `<span class="${index === page ? 'active' : ''}" data-page="${index}" aria-label="Grupo ${index + 1}"></span>`).join('');
  moveCarousel();
}
function moveCarousel() {
  const firstCard = track.firstElementChild;
  const gap = Number.parseFloat(getComputedStyle(track).gap) || 0;
  const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : 0;
  track.style.transform = `translateX(-${page * perPage * (cardWidth + gap)}px)`;
  [...dots.children].forEach((dot, index) => dot.classList.toggle('active', index === page));
  count.textContent = `${page + 1} / ${Math.ceil(PROBLEMS.length / perPage)}`;
}
function step(delta) {
  const total = Math.ceil(PROBLEMS.length / perPage);
  page = (page + delta + total) % total;
  moveCarousel();
}
document.querySelector('.prev').addEventListener('click', () => {
  if (!moveMobileRail(track, 'problem', PROBLEMS.length, -1)) track.classList.toggle('reverse');
});
document.querySelector('.next').addEventListener('click', () => {
  if (!moveMobileRail(track, 'problem', PROBLEMS.length, 1)) track.classList.toggle('paused');
});
dots.addEventListener('click', (event) => { if (event.target.dataset.page) { page = Number(event.target.dataset.page); moveCarousel(); } });
window.addEventListener('keydown', (event) => { if (event.key === 'ArrowLeft') moveMobileRail(track, 'problem', PROBLEMS.length, -1) || step(-1); if (event.key === 'ArrowRight') moveMobileRail(track, 'problem', PROBLEMS.length, 1) || step(1); });
let touchStart = 0;
track.addEventListener('touchstart', (event) => { touchStart = event.touches[0].clientX; }, { passive: true });
track.addEventListener('touchend', (event) => { const distance = event.changedTouches[0].clientX - touchStart; if (Math.abs(distance) > 45) { const direction = distance < 0 ? 1 : -1; if (!moveMobileRail(track, 'problem', PROBLEMS.length, direction)) step(direction); } }, { passive: true });
refreshCarousel();

// A continuous conveyor for the 15 diagnosis cards, with an identical second run for a seamless loop.
const problemsStyles = document.createElement('link');
problemsStyles.rel = 'stylesheet';
problemsStyles.href = 'problems-marquee.css?v=1';
document.head.append(problemsStyles);
const mobileFixes = document.createElement('link');
mobileFixes.rel = 'stylesheet';
mobileFixes.href = 'mobile-fixes.css?v=5';
document.head.append(mobileFixes);
const carouselPolish = document.createElement('link');
carouselPolish.rel = 'stylesheet';
carouselPolish.href = 'carousel-polish.css?v=2';
document.head.append(carouselPolish);
track.innerHTML = [...PROBLEMS, ...PROBLEMS].map(card).join('');

// Motion is handled only by the CSS marquee; the former page-by-page timer is disabled.

document.querySelectorAll('.checkout-link').forEach((link) => { if (CHECKOUT_URL) { link.href = CHECKOUT_URL; link.target = '_blank'; link.rel = 'noopener noreferrer'; } });

// Real testimonials authorized by the product owner. The photo source is kept as an approved asset.
const testimonialStyles = document.createElement('link');
testimonialStyles.rel = 'stylesheet';
testimonialStyles.href = 'testimonials.css?v=3';
document.head.append(testimonialStyles);
const testimonials = [
  ['María G.','México','mx','“Muy claro y práctico. Me ayudó a entender por qué mis plantas se ponían tristes. Ahora están mucho más sanas y bonitas.”'],
  ['Luis R.','Colombia','co','“Tenía problemas con mis tomates y este libro me explicó exactamente qué hacer. Soluciones simples que realmente funcionan.”'],
  ['Carmen M.','España','es','“La hoja de compras me encantó. Ya no gasto de más y sé exactamente qué necesita cada planta. Lo recomiendo totalmente.”'],
  ['Jorge P.','Argentina','ar','“Las fotos y ejemplos son excelentes. Es directo, sin complicaciones. Ya he salvado varias plantas con los consejos de Keiko.”'],
  ['Valentina S.','Chile','cl','“Ya no me siento perdida cuando algo le pasa a mis plantas. Este botiquín es una guía indispensable. Lo llevo siempre en mi celular.”']
];
const community = document.querySelector('.community');
community.className = 'testimonials';
community.innerHTML = `<div class="shell"><div class="section-center"><p class="eyebrow">HISTORIAS REALES</p><h2>Personas reales, resultados reales</h2><p>El Botiquín de Keiko ya está en manos de miles de personas que aman sus plantas.</p><p class="testimonial-handnote">“Plantas reales, historias reales,<br>vidas más verdes.”<br><b>— Keiko&nbsp; ♡</b></p></div><div class="testimonial-carousel" aria-label="Testimonios reales en movimiento continuo"><button class="testimonial-controls testimonial-prev" aria-label="Mover testimonios hacia la izquierda">←</button><div class="testimonial-window"><div class="testimonial-track">${[...testimonials, ...testimonials].map(([name,country,flag,quote], index) => `<article class="testimonial-card testimonial-card-${index % testimonials.length}"><div class="testimonial-photo" role="img" aria-label="${name} usando El Botiquín de Keiko en su dispositivo"></div><div class="testimonial-copy"><div class="testimonial-stars" aria-label="5 de 5 estrellas">★★★★★</div><blockquote>${quote}</blockquote><div class="testimonial-author"><p><span class="testimonial-flag flag-${flag}" aria-label="${country}" role="img"></span><strong>${name}</strong><span class="testimonial-country">${country}</span></p></div></div></article>`).join('')}</div></div><button class="testimonial-controls testimonial-next" aria-label="Mover testimonios hacia la derecha">→</button></div><div class="testimonial-footer"><span class="testimonial-dots" aria-hidden="true"><i class="active"></i><i></i><i></i><i></i><i></i></span></div></div>`;
const testimonialTrack = community.querySelector('.testimonial-track');
community.querySelector('.testimonial-prev').addEventListener('click', () => testimonialTrack.classList.toggle('reverse'));
community.querySelector('.testimonial-next').addEventListener('click', () => testimonialTrack.classList.toggle('paused'));

// Phones use a calm, reliable auto-advance rather than the desktop conveyor.
// This prevents half cards, flicker and empty frames on Safari/iOS.
const narrowRail = window.matchMedia('(max-width: 680px)');
const railState = { problem: 0, testimonial: 0, problemTimer: null, testimonialTimer: null };

function railStepSize(rail) {
  const first = rail.firstElementChild;
  const gap = Number.parseFloat(getComputedStyle(rail).gap) || 0;
  return first ? first.getBoundingClientRect().width + gap : 0;
}

function moveMobileRail(rail, name, total, delta) {
  if (!narrowRail.matches || !rail) return false;
  railState[name] = (railState[name] + delta + total) % total;
  rail.style.transform = `translate3d(-${railState[name] * railStepSize(rail)}px,0,0)`;
  return true;
}

function configureMobileRails() {
  clearInterval(railState.problemTimer);
  clearInterval(railState.testimonialTimer);
  railState.problemTimer = null;
  railState.testimonialTimer = null;
  if (!narrowRail.matches) {
    track.style.removeProperty('transform');
    testimonialTrack.style.removeProperty('transform');
    return;
  }
  railState.problem = 0;
  railState.testimonial = 0;
  track.style.transform = 'translate3d(0,0,0)';
  testimonialTrack.style.transform = 'translate3d(0,0,0)';
  railState.problemTimer = setInterval(() => moveMobileRail(track, 'problem', PROBLEMS.length, 1), 6500);
  railState.testimonialTimer = setInterval(() => moveMobileRail(testimonialTrack, 'testimonial', testimonials.length, 1), 7500);
}

community.querySelector('.testimonial-prev').addEventListener('click', () => moveMobileRail(testimonialTrack, 'testimonial', testimonials.length, -1));
community.querySelector('.testimonial-next').addEventListener('click', () => moveMobileRail(testimonialTrack, 'testimonial', testimonials.length, 1));
narrowRail.addEventListener('change', configureMobileRails);
window.addEventListener('load', configureMobileRails, { once: true });
configureMobileRails();
document.querySelector('#year').textContent = new Date().getFullYear();

const header = document.querySelector('.header');
addEventListener('scroll', () => header.classList.toggle('is-stuck', scrollY > 40), { passive: true });
const menu = document.querySelector('#menu');
document.querySelector('.menu-button').addEventListener('click', (event) => { const isOpen = menu.classList.toggle('open'); event.currentTarget.setAttribute('aria-expanded', isOpen); });
document.querySelectorAll('nav a').forEach((link) => link.addEventListener('click', () => { menu.classList.remove('open'); document.querySelector('.menu-button').setAttribute('aria-expanded', 'false'); }));
const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
