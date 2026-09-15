/* ==========================================================
   RUSTICA PIERRE — Components (Header / Footer injection)
   ========================================================== */

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
          <span>★ 4.6/5</span> · 11 avis Google
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
      <span>© 2025 Bousquet Carrière & TP — Rustica Pierre · SIREN 421 565 581</span>
      <span>Villefranche-de-Rouergue, Aveyron (12)</span>
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
  }

  // Header scroll shadow
  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
}

document.addEventListener('DOMContentLoaded', injectComponents);
