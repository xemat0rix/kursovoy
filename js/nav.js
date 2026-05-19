document.addEventListener('DOMContentLoaded', () => {
  const mobileNav   = document.getElementById('mobileNav');
  const burgerBtn   = document.getElementById('burgerBtn');
  const closeNavBtn = document.getElementById('closeNavBtn');

  const openNav = () => {
    if (mobileNav) { mobileNav.classList.add('open'); document.body.style.overflow = 'hidden'; }
  };

  const closeNav = () => {
    if (mobileNav) { mobileNav.classList.remove('open'); document.body.style.overflow = ''; }
  };

  burgerBtn?.addEventListener('click', openNav);
  closeNavBtn?.addEventListener('click', closeNav);
  mobileNav?.addEventListener('click', e => { if (e.target === mobileNav) closeNav(); });

  const contactModal = document.getElementById('contactModal');

  const openContact = () => {
    if (contactModal) { contactModal.classList.add('open'); document.body.style.overflow = 'hidden'; }
  };

  const closeContact = () => {
    if (contactModal) { contactModal.classList.remove('open'); document.body.style.overflow = ''; }
  };

  document.querySelectorAll('.footer-contact-btn, .write-us-btn').forEach(b => b.addEventListener('click', openContact));
  document.querySelector('#contactModal .modal-close')?.addEventListener('click', closeContact);
  contactModal?.addEventListener('click', e => { if (e.target === contactModal) closeContact(); });

  document.getElementById('contactForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('contactName')?.value.trim();
    if (!name) return;
    document.querySelector('#contactModal .modal-body').innerHTML =
      '<p class="modal-success">Спасибо за оставленный комментарий!</p>';
  });
});
