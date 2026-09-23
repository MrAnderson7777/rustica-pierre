/* ==========================================================
   RUSTICA PIERRE — Components (Header / Footer injection)
   ========================================================== */

// -- GA4 — décommenter et remplacer G-XXXXXXXXXX quand le NDD et l'ID sont prêts --
// const GA_ID = 'G-XXXXXXXXXX';
// (function() {
//   var s = document.createElement('script');
//   s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
//   s.async = true;
//   document.head.appendChild(s);
//   window.dataLayer = window.dataLayer || [];
//   function gtag(){dataLayer.push(arguments);}
//   window.gtag = gtag;
//   gtag('js', new Date());
//   gtag('config', GA_ID);
// })();

const HEADER_HTML = `
<header class="site-header" id="site-header">
  <div class="header-inner">
    <a href="/" class="site-logo" aria-label="Rustica Pierre — Accueil">
      <img src="/assets/images/logo.png" alt="Rustica Pierre" height="36">
    </a>
    <button class="nav-toggle" id="nav-toggle" aria-expanded="false" aria-label="Ouvrir le menu">
      <span></span><span></span><span></span>
    </button>
    <nav class="site-nav" id="site-nav" role="navigation" aria-label="Navigation principale">
      <a href="/pierres/">Catalogue</a>
      <a href="/realisations/">Réalisations</a>
      <a href="/l-entreprise/">La carrière</a>
      <a href="/journal/">Journal</a>
      <a href="/contact/" class="btn-nav-devis">Devis gratuit</a>
    </nav>
  </div>
</header>`;

const FOOTER_HTML = `
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <div class="footer-logo">
          <img src="/assets/images/logo.png" alt="Rustica Pierre — Bousquet Carrière & TP">
        </div>
        <p class="footer-tagline">La déco par la pierre —<br>l'alliance du moderne et de l'authentique.</p>
        <div class="footer-contact">
          <p>Lieu dit le Plantou, 12200 Savignac</p>
          <p><a href="tel:0563254717">05 63 25 47 17</a></p>
          <p><a href="mailto:contact@bousquet-carriere-tp.fr">contact@bousquet-carriere-tp.fr</a></p>
        </div>
        <p class="footer-rating" style="margin-top:1rem">
          <span>★ 4.8/5</span> · 6 avis Google
        </p>
      </div>
      <div>
        <span class="footer-label">Catalogue</span>
        <ul class="footer-links">
          <li><a href="/pierres/#blocs">Blocs de pierre</a></li>
          <li><a href="/pierres/#gabions">Pierres à gabions</a></li>
          <li><a href="/pierres/#dalles">Dalles naturelles</a></li>
          <li><a href="/pierres/#granulats">Granulats</a></li>
          <li><a href="/pierres/#drainage">Pierres à drain</a></li>
        </ul>
      </div>
      <div>
        <span class="footer-label">Navigation</span>
        <ul class="footer-links">
          <li><a href="/realisations/">Réalisations</a></li>
          <li><a href="/l-entreprise/">La carrière</a></li>
          <li><a href="/journal/">Journal</a></li>
          <li><a href="/contact/">Contact & Devis</a></li>
        </ul>
      </div>
      <div>
        <span class="footer-label">Horaires</span>
        <p class="footer-hours">
          Lundi – Samedi<br>
          7h30 – 12h00<br>
          14h00 – 18h00
        </p>
        <span class="footer-label" style="margin-top:1.5rem">Zone livraison</span>
        <p class="footer-hours">Occitanie<br>France entière</p>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Bousquet Carrière & TP — Rustica Pierre · SIREN 421 565 581</span>
      <span>
        <a href="/mentions-legales/" style="color:inherit;opacity:.6">Mentions légales</a>
        &nbsp;·&nbsp;
        <a href="/confidentialite/" style="color:inherit;opacity:.6">Confidentialité</a>
      </span>
    </div>
  </div>
</footer>`;

function injectComponents() {
  // Inject header
  const headerMount = document.getElementById('header-mount');
  if (headerMount) headerMount.outerHTML = HEADER_HTML;

  // Inject footer
  const footerMount = document.getElementById('footer-mount');
  if (footerMount) footerMount.outerHTML = FOOTER_HTML;

  // Highlight active nav link
  const path = window.location.pathname;
  document.querySelectorAll('.site-nav a:not(.btn-nav-devis)').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href !== '/' && path.startsWith(href)) {
      link.style.color = 'var(--r-terracotta)';
      link.setAttribute('aria-current', 'page');
    }
  });

  // Hamburger toggle
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !nav.contains(e.target)) {
        nav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
    // Close on nav link click (mobile)
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Header scroll shadow
  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
}

function initLightbox() {
  const lb = document.createElement('div');
  lb.id = 'r-lightbox';
  lb.className = 'r-lightbox';
  lb.innerHTML = '<button class="r-lightbox-close" aria-label="Fermer">&times;</button><img src="" alt="">';
  document.body.appendChild(lb);

  const close = () => { lb.classList.remove('open'); document.body.style.overflow = ''; };
  lb.querySelector('.r-lightbox-close').addEventListener('click', close);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

function initProductGallery() {
  // Thumbnail → swap main image
  document.addEventListener('click', e => {
    const thumb = e.target.closest('.product-thumb');
    if (!thumb) return;
    const container = thumb.closest('.product-images');
    const mainImg = container.querySelector('.product-main-img');
    mainImg.src = thumb.src;
    mainImg.alt = thumb.alt;
    container.querySelectorAll('.product-thumb').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
  });

  // Main image → lightbox
  document.addEventListener('click', e => {
    const mainImg = e.target.closest('.product-main-img');
    if (!mainImg) return;
    const lb = document.getElementById('r-lightbox');
    lb.querySelector('img').src = mainImg.src;
    lb.querySelector('img').alt = mainImg.alt;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
}

function initBackToTop() {
  const btn = document.createElement('button');
  btn.id = 'back-to-top';
  btn.setAttribute('aria-label', 'Retour en haut de page');
  btn.innerHTML = '&#8593;';
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initCookieBanner() {
  // Ne s'affiche que si GA4 est activé (GA_ID décommenté) ET consentement pas encore donné
  if (typeof GA_ID === 'undefined') return;
  if (localStorage.getItem('r_cookie_consent')) return;

  const banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.innerHTML = `
    <p>Ce site utilise Google Analytics pour mesurer l'audience. Aucune donnée personnelle n'est vendue.</p>
    <div class="cookie-actions">
      <button id="cookie-accept" class="btn btn-primary" style="font-size:.85rem;padding:.5rem 1.25rem">Accepter</button>
      <button id="cookie-refuse" style="font-size:.85rem;padding:.5rem 1.25rem;background:none;border:1px solid var(--r-terre);cursor:pointer">Refuser</button>
    </div>`;
  document.body.appendChild(banner);

  document.getElementById('cookie-accept').addEventListener('click', () => {
    localStorage.setItem('r_cookie_consent', 'accepted');
    banner.remove();
  });
  document.getElementById('cookie-refuse').addEventListener('click', () => {
    localStorage.setItem('r_cookie_consent', 'refused');
    banner.remove();
  });
}

document.addEventListener('DOMContentLoaded', () => { injectComponents(); initLightbox(); initProductGallery(); initBackToTop(); initCookieBanner(); });
