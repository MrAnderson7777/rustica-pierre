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

  // -- Contact form → mailto --
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name     = form.querySelector('#name')?.value.trim() || '';
      const phone    = form.querySelector('#phone')?.value.trim() || '';
      const materiau = form.querySelector('#materiau')?.value || '';
      const message  = form.querySelector('#message')?.value.trim() || '';

      if (!name || !message) {
        alert('Merci de renseigner votre nom et votre projet.');
        return;
      }

      const subject = encodeURIComponent('Demande de devis — Rustica Pierre');
      const body = encodeURIComponent(
        `Nom : ${name}\n` +
        (phone    ? `Téléphone : ${phone}\n`      : '') +
        (materiau ? `Matériau : ${materiau}\n`    : '') +
        `\nProjet :\n${message}\n`
      );

      window.location.href = `mailto:contact@bousquet-carriere-tp.fr?subject=${subject}&body=${body}`;
    });
  }

});
