// ===========================
// RAFLY PORTFOLIO - INTERACTIONS
// ===========================
const body = document.body;
const header = document.querySelector('.site-header');
const progress = document.getElementById('scrollProgress');
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navItems = [...document.querySelectorAll('.nav-link')];

// Theme toggle with saved preference
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') body.classList.add('light');
updateThemeIcon();

themeToggle.addEventListener('click', () => {
  body.classList.toggle('light');
  localStorage.setItem('portfolio-theme', body.classList.contains('light') ? 'light' : 'dark');
  updateThemeIcon();
  themeToggle.animate([{transform:'rotate(0deg) scale(1)'},{transform:'rotate(180deg) scale(1.12)'},{transform:'rotate(360deg) scale(1)'}],{duration:420,easing:'ease-out'});
});
function updateThemeIcon(){
  themeToggle.querySelector('.theme-icon').textContent = body.classList.contains('light') ? '☾' : '☼';
  themeToggle.setAttribute('aria-label', body.classList.contains('light') ? 'Aktifkan dark mode' : 'Aktifkan light mode');
}

// Mobile navigation
menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
navItems.forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded','false');
}));

// Scroll progress + sticky header
function handleScroll(){
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
  header.classList.toggle('scrolled', window.scrollY > 20);
}
window.addEventListener('scroll', handleScroll, {passive:true});
handleScroll();

// Reveal sections as they enter the viewport
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:0.12,rootMargin:'0px 0px -35px 0px'});
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Highlight current navigation section
const sections = [...document.querySelectorAll('main section[id]')];
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      navItems.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }
  });
},{rootMargin:'-40% 0px -50% 0px'});
sections.forEach(section => sectionObserver.observe(section));

// Small typing effect
const typedText = document.getElementById('typedText');
const roles = ['Information Systems Student','Web Developer in Progress','Technology Enthusiast'];
let roleIndex = 0, charIndex = roles[0].length, deleting = true;
function typeLoop(){
  const current = roles[roleIndex];
  if(deleting){
    charIndex--;
    typedText.textContent = current.slice(0,Math.max(0,charIndex));
    if(charIndex <= 0){ deleting = false; roleIndex = (roleIndex + 1) % roles.length; setTimeout(typeLoop,350); return; }
  } else {
    const next = roles[roleIndex];
    charIndex++;
    typedText.textContent = next.slice(0,charIndex);
    if(charIndex >= next.length){ deleting = true; setTimeout(typeLoop,1700); return; }
  }
  setTimeout(typeLoop,deleting ? 35 : 65);
}
setTimeout(typeLoop,2200);

// Gentle pointer tilt for project cards on desktop
if (window.matchMedia('(pointer:fine) and (min-width: 900px)').matches) {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - .5;
      const y = (e.clientY - rect.top) / rect.height - .5;
      card.style.transform = `translateY(-3px) perspective(1000px) rotateX(${-y*1.2}deg) rotateY(${x*1.2}deg)`;
    });
    card.addEventListener('mouseleave', () => card.style.transform = '');
  });
}

// Button press feedback
document.querySelectorAll('.button,.project-link,.text-link').forEach(el => {
  el.addEventListener('pointerdown', () => el.animate([{transform:'scale(1)'},{transform:'scale(.96)'},{transform:'scale(1)'}],{duration:220,easing:'ease-out'}));
});

// Current year
document.getElementById('year').textContent = new Date().getFullYear();

// Certificate viewer modal
const certModal = document.getElementById('certModal');
const certModalBody = document.getElementById('certModalBody');
const certModalClose = document.getElementById('certModalClose');

function openCertModal(fileUrl, type){
  certModalBody.innerHTML = type === 'pdf'
    ? `<iframe src="${fileUrl}" title="Sertifikat"></iframe>`
    : `<img src="${fileUrl}" alt="Sertifikat">`;
  certModal.classList.add('open');
}
function closeCertModal(){
  certModal.classList.remove('open');
  certModalBody.innerHTML = '';
}

document.querySelectorAll('.cert-card').forEach(card => {
  const open = () => openCertModal(card.dataset.cert, card.dataset.type);
  card.addEventListener('click', open);
  card.addEventListener('keydown', e => { if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); open(); } });
});
certModalClose.addEventListener('click', closeCertModal);
certModal.addEventListener('click', e => { if(e.target === certModal) closeCertModal(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeCertModal(); });

