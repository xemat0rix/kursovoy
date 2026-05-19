const IMAGE_MAP = {
  'gorenje-nrk6192acr4':          'img/image(12).png',
  'indesit-ewsb5085bkcis':        'img/image(11).png',
  'hansa-fccws8240':              'img/image(55).png',
  'gefest-6500030244':            'img/image(39).png',
  'schlutt-sva45106a':            'img/image(56).png',
  'enchen-boost2':                'img/image(37).png',
  'enchen-yoyo':                  'img/image(38).png',
  'enchen-air5':                  'img/image(36).png',
  'enchen-air-hairdryer':         'img/image(35).png',
  'enchen-hair-curler':           'img/image(34).png',
  'enchen-enrollor-straightener': 'img/image(33).png',
  'enchen-aurora1':               'img/image(32).png',
  'enchen-mint5':                 'img/image(24).png',
  'enchen-flosser3':              'img/image(23).png',
  'enchen-aurora-t3':             'img/image(22).png',
  'enchen-coco1':                 'img/image(31).png',
  'enchen-coco2':                 'img/image(30).png',
  'enchen-vacuum-v1':             'img/image(28).png',
  'enchen-vacuum-v2':             'img/image(29).png',
  'enchen-vacuum-r1':             'img/image(26).png',
  'samsung-vc20m251awbev':        'img/image(15).png',
  'aresa-ar1614':                 'img/aresa.png',
  'philips-hr3020':               'img/image(27).png',
  'kitfort-kt4605':               'img/image(25).png',
};

const getImg = id => IMAGE_MAP[id] || 'img/placeholder.png';

const openMainMenu = () => {
  document.getElementById('mobileNav').classList.add('open');
  document.body.style.overflow = 'hidden';
};

const closeMainMenu = () => {
  document.getElementById('mobileNav').classList.remove('open');
  document.body.style.overflow = '';
};

const openCatalogMenu = () => {
  document.getElementById('catalogMobileNavOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
};

const closeCatalogMenu = () => {
  document.getElementById('catalogMobileNavOverlay').classList.remove('open');
  document.body.style.overflow = '';
};

const renderCatalog = xml => {
  const categories = xml.querySelectorAll('category');
  const content    = document.getElementById('catalogContent');
  const mobileNav  = document.getElementById('catalogMobileNav');

  let menuHTML = '';
  let bodyHTML = '';

  categories.forEach(cat => {
    const catId   = cat.getAttribute('id');
    const catName = cat.getAttribute('name');

    menuHTML += `<li><a href="#cat-${catId}" class="cat-link" style="text-transform: uppercase;">${catName}</a></li>`;

    bodyHTML += `<section class="catalog-category" id="cat-${catId}">`;
    bodyHTML += `<h2 class="category-title">${catName}</h2>`;
    bodyHTML += `<div class="products-grid">`;

    cat.querySelectorAll('product').forEach(p => {
      const id    = p.getAttribute('id');
      const name  = p.querySelector('name')?.textContent || '';
      const price = p.querySelector('price')?.textContent || '';
      const old   = p.querySelector('oldPrice')?.textContent || '';
      const img   = getImg(id);

      bodyHTML += `<div class="product-card">`;
      bodyHTML += `<p class="product-name">${name}</p>`;
      bodyHTML += `<a href="product.html?id=${id}" class="product-image-wrap">`;
      bodyHTML += `<img src="${img}" alt="${name}" loading="lazy">`;
      bodyHTML += `</a>`;
      bodyHTML += `<div class="product-price-row">`;
      bodyHTML += `<span class="price">${price} BYN</span>`;
      if (old) bodyHTML += `<span class="old-price">${old} BYN</span>`;
      bodyHTML += `</div>`;
      bodyHTML += `<a href="product.html?id=${id}" class="btn-card">Подробнее</a>`;
      bodyHTML += `</div>`;
    });

    bodyHTML += `</div></section>`;
  });

  if (mobileNav) mobileNav.innerHTML = menuHTML;
  if (content)   content.innerHTML   = bodyHTML;

  document.querySelectorAll('.cat-link').forEach(link => {
    link.addEventListener('click', closeCatalogMenu);
  });
};

const loadCatalog = () => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'data/products.xml', true);
  xhr.onload = () => { if (xhr.status === 200) renderCatalog(xhr.responseXML); };
  xhr.send();
};

const openContactModal = () => {
  const m = document.getElementById('contactModal');
  if (m) { m.classList.add('open'); document.body.style.overflow = 'hidden'; }
};

const closeContactModal = () => {
  const m = document.getElementById('contactModal');
  if (m) { m.classList.remove('open'); document.body.style.overflow = ''; }
};

document.addEventListener('DOMContentLoaded', () => {
  loadCatalog();

  document.getElementById('burgerBtn')?.addEventListener('click', openMainMenu);
  document.getElementById('closeNavBtn')?.addEventListener('click', closeMainMenu);
  document.getElementById('mobileNav')?.addEventListener('click', e => {
    if (e.target === document.getElementById('mobileNav')) closeMainMenu();
  });

  document.getElementById('menuTrigger')?.addEventListener('click', openCatalogMenu);
  document.getElementById('closeCatalogNavBtn')?.addEventListener('click', closeCatalogMenu);
  document.getElementById('catalogMobileNavOverlay')?.addEventListener('click', e => {
    if (e.target === document.getElementById('catalogMobileNavOverlay')) closeCatalogMenu();
  });

  document.querySelectorAll('.footer-contact-btn').forEach(b => b.addEventListener('click', openContactModal));
  document.querySelector('#contactModal .modal-close')?.addEventListener('click', closeContactModal);
  document.getElementById('contactModal')?.addEventListener('click', e => {
    if (e.target === document.getElementById('contactModal')) closeContactModal();
  });

  document.getElementById('contactForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('contactName').value.trim();
    if (!name) return;
    document.querySelector('#contactModal .modal-body').innerHTML =
      '<p class="modal-success">Спасибо за оставленный комментарий!</p>';
  });
});
