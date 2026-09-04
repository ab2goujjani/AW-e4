(() => {
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const header = $('#siteHeader');
const menu = $('.menu-toggle');
const nav = $('#mainNav');

function setMenu(open){
  if(!menu || !nav) return;
  nav.classList.toggle('open', open);
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
}
menu?.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
$$('.main-nav a').forEach(link => link.addEventListener('click', () => setMenu(false)));

const sections = $$('main section[id]');
const navLinks = $$('.main-nav a');
function updateActiveNav(){
  const y = window.scrollY + 150;
  let current = 'accueil';
  sections.forEach(section => { if(section.offsetTop <= y) current = section.id; });
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
}
window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 25);
  $('.to-top')?.classList.toggle('show', window.scrollY > 650);
  updateActiveNav();
}, {passive:true});
updateActiveNav();

$('.to-top')?.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  });
}, {threshold:.12});
$$('.reveal').forEach(el => observer.observe(el));

const searchToggle = $('.search-toggle');
const searchPanel = $('.search-panel');
const searchInput = $('#siteSearch');
const searchClose = $('.search-close');
const cards = $$('.product-card');
function setSearch(open){
  if(!searchPanel) return;
  searchPanel.classList.toggle('open', open);
  searchPanel.setAttribute('aria-hidden', String(!open));
  searchToggle?.setAttribute('aria-expanded', String(open));
  if(open) setTimeout(() => searchInput?.focus(), 80);
}
searchToggle?.addEventListener('click', () => setSearch(!searchPanel.classList.contains('open')));
searchClose?.addEventListener('click', () => { if(searchInput) searchInput.value=''; cards.forEach(c=>{c.classList.remove('search-hidden'); c.style.display='';}); setSearch(false); });
searchInput?.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  cards.forEach(card => {
    const hay = (card.dataset.search + ' ' + card.textContent).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    const match = !q || hay.includes(q);
    card.classList.toggle('search-hidden', !match);
    card.style.display = match ? '' : 'none';
  });
});

// Product category filters — lightweight discovery without changing the reference layout.
const filterChips = $$('.filter-chip');
filterChips.forEach(chip => chip.addEventListener('click', () => {
  const filter = chip.dataset.filter || 'all';
  filterChips.forEach(c => c.classList.toggle('active', c === chip));
  cards.forEach(card => {
    const matches = filter === 'all' || card.dataset.category === filter;
    card.classList.toggle('search-hidden', !matches);
    card.style.display = matches ? '' : 'none';
  });
}));

const modal = $('#productModal');
const modalTitle = $('#modalTitle');
const modalText = $('#modalText');
const productData = {
  cafe: ['Café', 'Un univers autour du café, pensé pour mettre en avant l’arôme, la richesse et le caractère d’une sélection premium.'],
  epices: ['Épices', 'Des épices aux parfums généreux pour apporter profondeur, couleur et caractère aux recettes du quotidien.'],
  'fruits-secs': ['Fruits secs', 'Une collection gourmande autour de fruits secs soigneusement présentés, avec une attention particulière portée à la qualité et à la texture.'],
  argan: ['Huile d’argan', 'Une signature naturelle emblématique du Maroc, mise en valeur dans une présentation sobre, élégante et premium.'],
  epicerie: ['Épicerie', 'Riz, semoule, couscous et essentiels du garde-manger marocain, réunis dans une présentation à l’image de la collection ARAOUAA.']
};
function closeModal(){ modal?.classList.remove('open'); modal?.setAttribute('aria-hidden','true'); document.body.classList.remove('modal-open'); }
$$('.product-link').forEach(button => button.addEventListener('click', () => {
  const item = productData[button.dataset.product];
  if(!item || !modal) return;
  modalTitle.textContent = item[0];
  modalText.textContent = item[1];
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
}));
$('.modal-close')?.addEventListener('click', closeModal);
$('.modal-backdrop')?.addEventListener('click', closeModal);
$('.modal-contact')?.addEventListener('click', closeModal);

document.addEventListener('keydown', e => {
  if(e.key === 'Escape'){ setSearch(false); closeModal(); setMenu(false); }
});

$('#contactForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const msg = $('.form-message', e.currentTarget);
  if(msg) msg.textContent = 'Merci. Votre demande est prête à être transmise à l’équipe ARAOUAA.';
  e.currentTarget.reset();
});

/* Catalogue additions: only add references that are not already present. */
(function addRequestedNutProducts(){
  const grid = document.querySelector('#noix-graines .product-items');
  if(!grid) return;
  const existing = [...grid.querySelectorAll('[data-product-name], h3')].map(el => (el.dataset.productName || el.textContent).trim().toLowerCase());
  const requested = [
    ['Amande grillée','AMANDE GRILLÉE'],
    ['Amande effilée','AMANDE EFFILÉE'],
    ['Amande hachée','AMANDE HACHÉE'],
    ['Amande en poudre','AMANDE EN POUDRE'],
    ['Arachides','ARACHIDES']
  ];
  const makeCard = (name,label) => {
    const article=document.createElement('article');
    article.className='product-item catalog-added-item';
    article.dataset.productName=name;
    article.innerHTML=`<div class="product-item-image"><div class="product-placeholder"><span>ARAOUAA</span><strong>${label}</strong><small>NOIX &amp; GRAINES</small></div></div><div class="product-item-content"><span class="product-item-tag">NOIX &amp; GRAINES</span><h3>${name}</h3><p>Une référence délicate au profil naturellement généreux et raffiné.</p><div class="product-formats"><span class="formats-label">FORMATS DISPONIBLES</span><div class="format-list"><button class="format-button" data-weight="50 g">50 g</button><button class="format-button" data-weight="100 g">100 g</button><button class="format-button" data-weight="250 g">250 g</button><button class="format-button" data-weight="500 g">500 g</button><button class="format-button" data-weight="1 kg">1 kg</button><button class="format-button" data-weight="5 kg">5 kg</button><button class="format-button custom-format">+ Sur demande</button></div></div></div>`;
    return article;
  };
  requested.forEach(([name,label])=>{
    if(!existing.includes(name.toLowerCase())) grid.appendChild(makeCard(name,label));
  });
  grid.querySelectorAll('.catalog-added-item .format-button:not(.custom-format)').forEach(b=>b.addEventListener('click',()=>{b.classList.add('selected');setTimeout(()=>b.classList.remove('selected'),650);}));
})();

/* Shared header-action repair. */
(function repairHeaderActions(){
  const iconSearch = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.2"></circle><path d="M15.4 15.4 21 21"></path></svg>';
  const iconInstagram = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.4" cy="6.7" r="1" class="fill"></circle></svg>';
  const iconCart = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L20.5 8H6"></path><circle cx="9.5" cy="19" r="1.2" class="fill"></circle><circle cx="17.5" cy="19" r="1.2" class="fill"></circle></svg>';

  const style = document.createElement('style');
  style.textContent = `
    .header-actions{display:flex !important;align-items:center !important;visibility:visible !important;opacity:1 !important;z-index:10003 !important;}
    .header-actions .search-toggle,.header-actions .instagram-link,.header-actions .cart-link{display:grid !important;visibility:visible !important;opacity:1 !important;}
    .header-actions .icon-button{position:relative !important;z-index:10004 !important;flex:0 0 auto !important;}
    .site-header,.products-header{position:sticky !important;z-index:10000 !important;}
    .site-header:after,.products-header:after{pointer-events:none !important;}
    .products-header-actions{display:flex;align-items:center;gap:4px;margin-left:auto;position:relative;z-index:10004;}
    .products-header-actions .products-action{display:grid;place-items:center;width:40px;height:40px;padding:0;border:0;background:transparent;color:#eadfce;cursor:pointer;position:relative;}
    .products-header-actions .products-action svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.6;}
    .products-header-actions .products-action .fill{fill:currentColor;stroke:none;}
    .products-header-actions .products-cart-badge{position:absolute;top:0;right:0;width:14px;height:14px;border-radius:50%;display:grid;place-items:center;background:#c7a15a;color:#211713;font:700 8px/1 Poppins,Arial,sans-serif;border:2px solid #211713;}
    .products-header-search{position:absolute;right:5.8%;top:92px;width:min(500px,90vw);opacity:0;visibility:hidden;transform:translateY(-8px);transition:.22s ease;z-index:10005;}
    .products-header-search.open{opacity:1;visibility:visible;transform:none;}
    .products-header-search-inner{display:flex;align-items:center;gap:10px;background:#fffaf2;border:1px solid rgba(33,23,19,.13);border-radius:4px;padding:10px 12px;box-shadow:0 18px 50px rgba(0,0,0,.22);}
    .products-header-search-inner svg{width:21px;height:21px;fill:none;stroke:#a67f3e;stroke-width:1.7;flex:0 0 auto;}
    .products-header-search-inner input{border:0;outline:0;background:transparent;color:#211713;width:100%;font:13px Poppins,Arial,sans-serif;}
    .products-header-search-inner button{border:0;background:none;color:#6d5e51;font-size:24px;line-height:1;cursor:pointer;}
    @media(max-width:900px){
      .site-header{padding-left:5% !important;padding-right:5% !important;gap:0 !important;}
      .header-actions{margin-left:auto !important;right:auto !important;position:relative !important;gap:1px !important;}
      .header-actions .icon-button{width:32px !important;height:36px !important;padding:0 !important;}
      .header-actions .icon-button svg{width:20px !important;height:20px !important;}
      .header-actions .cart-badge{width:13px !important;height:13px !important;font-size:8px !important;top:1px !important;right:0 !important;}
      .products-header{padding-left:5% !important;padding-right:5% !important;gap:0 !important;}
      .products-header-actions{gap:0;margin-left:auto;}
      .products-header-actions .products-action{width:32px;height:36px;}
      .products-header-actions .products-action svg{width:20px;height:20px;}
      .products-header-actions .products-cart-badge{width:13px;height:13px;font-size:7px;top:1px;right:0;}
      .products-header-search{top:76px;right:5%;width:90%;}
    }
    @media(max-width:520px){
      .brand-logo{width:108px !important;}
      .header-actions .icon-button{width:29px !important;}
      .products-logo{max-width:108px;}
      .products-header-actions .products-action{width:29px;}
    }
  `;
  document.head.appendChild(style);

  const homeActions = document.querySelector('.site-header .header-actions');
  if(homeActions){
    homeActions.style.display='flex';
    homeActions.style.visibility='visible';
    homeActions.style.opacity='1';
    homeActions.style.zIndex='10003';
    homeActions.querySelectorAll('.icon-button').forEach(el=>{
      el.style.visibility='visible';
      el.style.opacity='1';
      el.style.position='relative';
      el.style.zIndex='10004';
    });
  }

  const productsHeader = document.querySelector('.products-header');
  if(!productsHeader || productsHeader.querySelector('.products-header-actions')) return;

  const actions = document.createElement('div');
  actions.className='products-header-actions';
  actions.innerHTML = `
    <button class="products-action products-search-toggle" type="button" aria-label="Rechercher" aria-expanded="false">${iconSearch}</button>
    <a class="products-action" href="https://www.instagram.com/" aria-label="Instagram">${iconInstagram}</a>
    <a class="products-action" href="#contact" aria-label="Produits et contact">${iconCart}<span class="products-cart-badge">0</span></a>
  `;
  const contact = productsHeader.querySelector('.products-header-contact');
  const menuButton = productsHeader.querySelector('.menu-toggle');
  if(contact) productsHeader.insertBefore(actions, contact);
  else if(menuButton) productsHeader.insertBefore(actions, menuButton);
  else productsHeader.appendChild(actions);

  const panel = document.createElement('div');
  panel.className='products-header-search';
  panel.setAttribute('aria-hidden','true');
  panel.innerHTML=`<div class="products-header-search-inner">${iconSearch}<input id="productsHeaderSearch" type="search" placeholder="Rechercher un produit..." aria-label="Rechercher un produit"><button type="button" aria-label="Fermer la recherche">×</button></div>`;
  productsHeader.appendChild(panel);

  const toggle = actions.querySelector('.products-search-toggle');
  const input = panel.querySelector('#productsHeaderSearch');
  const close = panel.querySelector('button');
  const productItems = $$('.product-item');
  const normalize = value => (value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const setProductSearch = open => {
    panel.classList.toggle('open',open);
    panel.setAttribute('aria-hidden',String(!open));
    toggle.setAttribute('aria-expanded',String(open));
    if(open) setTimeout(()=>input.focus(),80);
  };
  toggle.addEventListener('click',()=>setProductSearch(!panel.classList.contains('open')));
  close.addEventListener('click',()=>{input.value='';productItems.forEach(item=>item.style.display='');setProductSearch(false);});
  input.addEventListener('input',()=>{
    const q=normalize(input.value.trim());
    productItems.forEach(item=>{
      const match=!q || normalize(item.textContent).includes(q);
      item.style.display=match?'':'none';
    });
  });
})();
})();
