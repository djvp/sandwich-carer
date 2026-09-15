// Links come from src/_data/site.json. Empty = not set up yet: the click shows a preview note instead.
const LINKS = window.SITE_LINKS || {};
const NAMES = { substack: 'Substack', shop: 'the Shopify store', facebook: 'the Facebook page', instagram: 'Instagram' };

const toast = document.getElementById('toast');
let toastTimer;
function say(msg) {
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

document.querySelectorAll('[data-link]').forEach((a) => {
  const key = a.dataset.link;
  const url = LINKS[key];
  if (url) { a.href = url; a.target = '_blank'; a.rel = 'noopener'; return; }
  a.addEventListener('click', (e) => { e.preventDefault(); say(`Preview: this will open ${NAMES[key] || key} once it's set up.`); });
});

const form = document.getElementById('subscribeForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email');
    if (!email.value || !email.checkValidity()) { email.focus(); say('Pop your email in first.'); return; }
    if (LINKS.substack) { window.open(LINKS.substack, '_blank', 'noopener'); return; }
    say("Preview: subscriptions will run through Substack once it's set up.");
  });
}

// Sam: side-eye the jargon until the stamp lands, then relax. Pupils follow the cursor.
const sam = document.getElementById('heroSam');
if (sam) {
  setTimeout(() => sam.classList.remove('side'), 2000);
  const pupils = sam.querySelectorAll('.pupils');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) {
    addEventListener('pointermove', (e) => {
      const r = sam.getBoundingClientRect();
      const nx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 2)));
      const ny = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height * 0.38)) / (r.height / 2)));
      pupils.forEach((p) => { p.style.transform = `translate(${nx * 5}px, ${ny * 4.5}px)`; });
    }, { passive: true });
  }
}
