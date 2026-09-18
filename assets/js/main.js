/* ==========================================================
   RUSTICA PIERRE — Interactions
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // -- FAQ Accordion --
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      // Open clicked (unless was already open)
      if (!wasOpen) item.classList.add('open');
    });
  });

  // -- Web3Forms contact --
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btn = form.querySelector('[type="submit"]');
      btn.textContent = 'Envoi en cours…';
      btn.disabled = true;

      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: new FormData(form),
        });
        const json = await res.json();

        if (json.success) {
          form.reset();
          const successEl = document.getElementById('form-success');
          if (successEl) successEl.style.display = 'block';

          if (typeof gtag === 'function') {
            gtag('event', 'devis_envoye', {
              event_category: 'contact',
              event_label: 'formulaire_rustica',
            });
          }

          if (typeof fbq === 'function') {
            fbq('track', 'Lead');
          }

          setTimeout(() => {
            window.location.href = '/merci/';
          }, 1500);

        } else {
          throw new Error(json.message || 'Erreur Web3Forms');
        }

      } catch (err) {
        console.error('Formulaire :', err);
        alert('Une erreur est survenue. Appelez-nous directement au 05 63 25 47 17.');
        btn.textContent = 'Envoyer ma demande';
        btn.disabled = false;
      }
    });
  }

});
