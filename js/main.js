// Scroll progress bar
const progressEl = document.getElementById('progress');
const updateProgress = () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const pct = Math.max(0, Math.min(1, scrollTop / scrollHeight));
  progressEl.style.width = (pct * 100) + '%';
};
document.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

// Reveal on view
const reveal = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
}, { threshold: .15 });
document.querySelectorAll('.fade-in').forEach((el, i) => {
  el.style.transitionDelay = (i * 40) + 'ms';
  reveal.observe(el);
});

// Right-nav active
const sections = Array.from(document.querySelectorAll('.anchor'));
const navLinks = Array.from(document.querySelectorAll('.navlist a'));
const byId = id => navLinks.find(a => a.getAttribute('href') === `#${id}`);
const highlight = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const id = entry.target.id;
    const link = byId(id);
    if (!link) return;
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.removeAttribute('aria-current'));
      link.setAttribute('aria-current', 'true');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 });
sections.forEach(sec => highlight.observe(sec));

// Smooth focus on nav click
navLinks.forEach(a => a.addEventListener('click', (e) => {
  const id = a.getAttribute('href').slice(1);
  const target = document.getElementById(id);
  if (target) setTimeout(() => target.querySelector('h2')?.focus?.(), 450);
}));

// Background change at Actualités
document.addEventListener("DOMContentLoaded", () => {
  const actualites = document.getElementById("Actualites");
  if (!actualites) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.boundingClientRect.top < window.innerHeight) {
          document.body.classList.add("bg-alt");
        } else if (entry.boundingClientRect.top > 0) {
          document.body.classList.remove("bg-alt");
        }
      });
    }, { threshold: 0.5 }
  );
  observer.observe(actualites);
});

// Scroll to top on load
window.addEventListener("load", () => { window.scrollTo(0, 0); });
