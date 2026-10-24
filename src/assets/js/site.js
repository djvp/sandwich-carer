// Anything not set up yet carries data-facade="<what it will open>" and shows a
// preview note instead of a dead link. Real URLs go in src/_data/*.json.
const toast = document.getElementById('toast');
let toastTimer;
function say(msg) {
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}
document.addEventListener('click', (e) => {
  const a = e.target.closest('[data-facade]');
  if (!a) return;
  e.preventDefault();
  say(`Preview: this will open ${a.dataset.facade} once it's set up.`);
});

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Posts play their move (strike draws, stamp slams) as they scroll into view.
const posts = document.querySelectorAll('.post');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add('play');
      io.unobserve(en.target);
    });
  }, { threshold: 0.35 });
  posts.forEach((p) => io.observe(p));
} else {
  posts.forEach((p) => p.classList.add('play'));
}

// Sam. Bobs and blinks on his own (CSS); eyes follow the cursor; side-eyes the
// jargon, takes the stamp, then says the translation. Each tap shows another move.
const sam = document.getElementById('heroSam');
const samBtn = document.getElementById('samBtn');
if (sam && samBtn) {
  const MOODS = ['calm', 'side', 'over', 'talk'];
  const setMood = (m) => MOODS.forEach((x) => sam.classList.toggle(`mood-${x}`, x === m));
  const squishG = sam.querySelector('.sam-squish');
  const stamp = document.querySelector('.stamp-hero');
  const clamp = (v) => Math.max(-1, Math.min(1, v));

  const poke = () => squishG.animate([
    { transform: 'scale(1, 1)' },
    { transform: 'scale(1.12, .6)', offset: 0.25 },
    { transform: 'scale(.97, 1.06)', offset: 0.55 },
    { transform: 'scale(1.01, .99)', offset: 0.8 },
    { transform: 'scale(1, 1)' },
  ], { duration: 520, easing: 'ease-out' });

  const reslam = () => stamp && stamp.animate([
    { transform: 'rotate(-8deg) scale(1.9)', opacity: 0 },
    { transform: 'rotate(-8deg) scale(.96)', opacity: 1, offset: 0.6 },
    { transform: 'rotate(-8deg) scale(1.03)', opacity: 1, offset: 0.8 },
    { transform: 'rotate(-8deg) scale(1)', opacity: 1 },
  ], { duration: 420, easing: 'ease-out', fill: 'forwards' });

  const timers = [];
  const later = (ms, fn) => timers.push(setTimeout(fn, ms));
  const cancelAll = () => { timers.forEach(clearTimeout); timers.length = 0; };

  if (!reduceMotion) {
    addEventListener('pointermove', (e) => {
      const r = sam.getBoundingClientRect();
      const nx = clamp((e.clientX - (r.left + r.width / 2)) / (r.width / 2));
      const ny = clamp((e.clientY - (r.top + r.height * 0.42)) / (r.height / 2));
      sam.style.setProperty('--cx', `${(nx * 5.5).toFixed(2)}px`);
      sam.style.setProperty('--cy', `${(ny * 4.5).toFixed(2)}px`);
    }, { passive: true });

    later(500, () => setMood('side'));    // jargon appears: side-eye
    later(1700, poke);                     // stamp lands: he takes the hit
    later(2100, () => setMood('talk'));   // says the translation
    later(3500, () => setMood('calm'));
  }

  const reactions = [
    () => { // show the five layers
      sam.classList.add('exploded');
      later(950, () => { sam.classList.remove('exploded'); later(320, poke); });
      return 1600;
    },
    () => { // over it: squeezed flat
      setMood('over');
      sam.classList.add('squeezed');
      later(1300, () => { sam.classList.remove('squeezed'); setMood('calm'); });
      return 1600;
    },
    () => { // talking
      setMood('talk');
      later(1400, () => setMood('calm'));
      return 1500;
    },
    () => { // side-eye, and the stamp comes down again
      setMood('side');
      later(350, reslam);
      later(560, poke);
      later(1500, () => setMood('calm'));
      return 1700;
    },
  ];
  let next = 0;
  let busy = false;
  samBtn.addEventListener('click', () => {
    if (busy) return;
    busy = true;
    cancelAll();
    sam.classList.remove('exploded', 'squeezed');
    setMood('calm');
    const ms = reactions[next]();
    next = (next + 1) % reactions.length;
    setTimeout(() => { busy = false; }, ms);
  });
}

// Back catalogue: filter by topic, and honour ?topic= from the landing page chips.
const filter = document.querySelector('[data-filter]');
if (filter) {
  const chips = [...filter.querySelectorAll('[data-topic]')];
  const cards = [...document.querySelectorAll('.post[data-topic]')];
  const apply = (topic) => {
    chips.forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.topic === topic)));
    cards.forEach((p) => { p.hidden = topic !== 'all' && p.dataset.topic !== topic; });
    const url = new URL(location.href);
    if (topic === 'all') url.searchParams.delete('topic');
    else url.searchParams.set('topic', topic);
    history.replaceState(null, '', url);
  };
  filter.addEventListener('click', (e) => {
    const chip = e.target.closest('[data-topic]');
    if (chip) apply(chip.dataset.topic);
  });
  const initial = new URLSearchParams(location.search).get('topic');
  if (initial && chips.some((c) => c.dataset.topic === initial)) apply(initial);
}
