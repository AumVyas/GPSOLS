/* =======================================================
   main.js
   Page interactions: scroll reveal, hero particle canvas,
   the home-page "journey" progress line, and the contact form.
   ======================================================= */

/* ---------- scroll reveal ---------- */
(function(){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.15 });

  function observeReveals(){
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }

  if(document.readyState !== 'loading'){
    observeReveals();
  }else{
    document.addEventListener('DOMContentLoaded', observeReveals);
  }
})();

/* ---------- home page: journey line-fill on load ---------- */
window.addEventListener('load', () => {
  setTimeout(() => {
    const fill = document.getElementById('journeyFill');
    if(fill) fill.style.width = '100%';
  }, 900);
});

/* ---------- ambient particle canvas (hero) ---------- */
(function(){
  function init(){
    const canvas = document.getElementById('particles');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let particles = [];
    let w, h;

    function resize(){
      const hero = canvas.parentElement;
      w = canvas.width = hero.offsetWidth;
      h = canvas.height = hero.offsetHeight;
    }
    function initParticles(){
      const n = Math.min(46, Math.floor(w / 28));
      particles = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 1.2 + Math.random() * 2.4,
        speed: 6 + Math.random() * 14,
        phase: Math.random() * 6.28,
        alpha: 0.25 + Math.random() * 0.35
      }));
    }
    resize(); initParticles();
    window.addEventListener('resize', () => { resize(); initParticles(); });

    let t = 0;
    function draw(){
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#E4C868';
      particles.forEach(p => {
        const y = ((p.y - t * p.speed * 0.02) % (h + 20) + (h + 20)) % (h + 20) - 10;
        const x = p.x + Math.sin(t * 0.4 + p.phase) * 8;
        ctx.globalAlpha = p.alpha * (0.6 + 0.4 * Math.sin(t * 0.8 + p.phase));
        ctx.beginPath();
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      t += 0.06;
      if(!reduceMotion) requestAnimationFrame(draw);
    }
    draw();
  }

  if(document.readyState !== 'loading'){
    init();
  }else{
    document.addEventListener('DOMContentLoaded', init);
  }
})();

/* ---------- contact form (front-end only placeholder) ---------- */
function handleSubmit(e){
  e.preventDefault();
  const note = document.getElementById('formNote');
  if(note) note.style.display = 'block';
  e.target.reset();
  return false;
}
