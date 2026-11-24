import siteConfig from '../config/site.config.js';

const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
    siteNav.classList.toggle('is-open', !isOpen);
  });
  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open menu');
      siteNav.classList.remove('is-open');
    });
  });
}

const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
document.querySelectorAll('.site-nav a').forEach((link) => {
  const linkPath = new URL(link.href).pathname.replace(/\/$/, '') || '/';
  if (linkPath === currentPath || (linkPath !== '/' && currentPath.startsWith(linkPath))) {
    link.setAttribute('aria-current', 'page');
  }
});

const filterButtons = [...document.querySelectorAll('.filter-button')];
const publicationCards = [...document.querySelectorAll('.publication-card')];
const resultsLabel = document.querySelector('.results-label');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    let visible = 0;
    publicationCards.forEach((card) => {
      const matches = filter === 'all' || card.dataset.category === filter;
      card.hidden = !matches;
      if (matches) visible += 1;
    });
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    if (resultsLabel) {
      resultsLabel.textContent = `${visible} ${visible === 1 ? 'selected project' : 'selected projects'}`;
    }
  });
});

const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    const form = new FormData(contactForm);
    const subject = `${form.get('topic')} — ${siteConfig.siteName}`;
    const body = `Name: ${form.get('name')}\nEmail: ${form.get('email')}\n\n${form.get('message')}`;
    const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  });
}
