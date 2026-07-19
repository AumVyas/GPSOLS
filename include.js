/* =======================================================
   include.js
   Loads the shared header & footer partials into every page,
   sets the active nav link, wires up the mobile menu toggle,
   and hides the page loader once everything is ready.
   ======================================================= */

async function loadPartial(url, targetId){
  const target = document.getElementById(targetId);
  if(!target) return;
  try{
    const res = await fetch(url, { cache: 'no-cache' });
    if(!res.ok) throw new Error('Failed to load ' + url);
    target.innerHTML = await res.text();
  }catch(err){
    console.error(err);
  }
}

function setActiveNavLink(){
  const current = document.body.dataset.page;
  document.querySelectorAll('nav.tabs a').forEach(link => {
    link.classList.toggle('active', link.dataset.page === current);
  });
}

function wireMobileNav(){
  const toggle = document.getElementById('navToggle');
  const tabNav = document.getElementById('tabNav');
  if(!toggle || !tabNav) return;
  toggle.addEventListener('click', () => {
    const isOpen = tabNav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  tabNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => tabNav.classList.remove('open'));
  });
}

function hideLoader(){
  const loader = document.getElementById('pageLoader');
  if(loader) loader.classList.add('loaded');
}

document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([
    loadPartial('partials/header.html', 'siteHeader'),
    loadPartial('partials/footer.html', 'siteFooter')
  ]);
  setActiveNavLink();
  wireMobileNav();
  document.dispatchEvent(new CustomEvent('partialsReady'));
});

window.addEventListener('load', () => {
  // small delay so the loader never just "flashes"
  setTimeout(hideLoader, 250);
});
