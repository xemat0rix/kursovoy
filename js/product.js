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

const getParam = name => new URLSearchParams(window.location.search).get(name);

let qty = 1;
let basePrice = 0;

const updatePriceDisplay = () => {
  const priceEl = document.getElementById('productPrice');
  if (priceEl) {
    priceEl.textContent = `${basePrice * qty} BYN`;
  }
};

const renderProduct = product => {
  const id    = product.getAttribute('id');
  const name  = product.querySelector('name')?.textContent || '';
  const price = product.querySelector('price')?.textContent || '0';
  const specs = product.querySelectorAll('spec');
  const img   = IMAGE_MAP[id] || 'img/image (22).png';

  basePrice = parseInt(price, 10) || 0; 

  document.title = `${name} — HomeZone`;

  const imgEl = document.getElementById('productImg');
  if (imgEl) { imgEl.src = img; imgEl.alt = name; }

  const nameEl = document.getElementById('productName');
  if (nameEl) nameEl.textContent = name;

  const specsEl = document.getElementById('productSpecs');
  if (specsEl) specsEl.innerHTML = [...specs].map(s => `<li>${s.textContent}</li>`).join('');

  updatePriceDisplay();
};

const loadProduct = () => {
  const id = getParam('id');
  if (!id) return;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'data/products.xml', true);
  xhr.onload = () => {
    if (xhr.status === 200) {
      const product = xhr.responseXML.querySelector(`product[id="${id}"]`);
      if (product) renderProduct(product);
    }
  };
  xhr.send();
};

document.addEventListener('DOMContentLoaded', () => {
  loadProduct();

  const qtyDisplay = document.getElementById('qtyDisplay');

  document.getElementById('qtyMinus')?.addEventListener('click', () => {
    if (qty > 1) { 
      qty--; 
      if (qtyDisplay) qtyDisplay.textContent = qty; 
      updatePriceDisplay(); 
    }
  });

  document.getElementById('qtyPlus')?.addEventListener('click', () => {
    qty++; 
    if (qtyDisplay) qtyDisplay.textContent = qty; 
    updatePriceDisplay(); 
  });

  const openModal = id => {
    const m = document.getElementById(id);
    if (m) { m.classList.add('open'); document.body.style.overflow = 'hidden'; }
  };

  const closeModal = id => {
    const m = document.getElementById(id);
    if (m) { m.classList.remove('open'); document.body.style.overflow = ''; }
  };

  document.getElementById('orderBtn')?.addEventListener('click', () => openModal('orderModal'));
  document.querySelectorAll('.footer-contact-btn').forEach(b => b.addEventListener('click', () => openModal('contactModal')));

  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.modal-overlay').forEach(m => {
        m.classList.remove('open');
      });
      document.body.style.overflow = '';
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(m => {
    m.addEventListener('click', e => {
      if (e.target === m) { m.classList.remove('open'); document.body.style.overflow = ''; }
    });
  });

  document.getElementById('orderForm')?.addEventListener('submit', e => {
    e.preventDefault();
    
    const nameInput = document.getElementById('orderName');
    const phoneInput = document.getElementById('orderPhone');
    
    const name = nameInput?.value.trim();
    if (!name) return;

    let phone = phoneInput?.value.replace(/[\s\-\(\)]/g, ''); 
    const re = /^\+375\d{9}$/;

    if (phoneInput) phoneInput.classList.remove("input_error");

    if (!phone || !re.test(String(phone))) {
      if (phoneInput) {
        phoneInput.classList.add("input_error");
        phoneInput.value = "";
        phoneInput.placeholder = "Некорректный номер!";
      }
      return; 
    }

    document.querySelector('#orderModal .modal-body').innerHTML =
      `<p class="modal-success">Спасибо, ${name}! <br>Ваш заказ принят.<br> Мы свяжемся с вами в ближайшее время.</p>`;
  });

  document.getElementById('orderPhone')?.addEventListener('input', function() {
    this.classList.remove('input_error');
  });

  document.getElementById('contactForm')?.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('contactName')?.value.trim();
    if (!name) return;
    document.querySelector('#contactModal .modal-body').innerHTML =
      '<p class="modal-success">Спасибо за оставленный комментарий!</p>';
  });

  const mobileNav = document.getElementById('mobileNav');
  document.getElementById('burgerBtn')?.addEventListener('click', () => {
    mobileNav?.classList.add('open'); document.body.style.overflow = 'hidden';
  });
  document.getElementById('closeNavBtn')?.addEventListener('click', () => {
    mobileNav?.classList.remove('open'); document.body.style.overflow = '';
  });
});