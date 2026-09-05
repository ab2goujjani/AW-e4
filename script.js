(() => {
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

/* --------------------------------------------------------------------------
   Shared header
   Product pages use the exact Accueil header structure. The only intentional
   difference is the product-page espresso surface, controlled by produits.css.
   -------------------------------------------------------------------------- */
function ensureProductHeader(){
  if(!document.body.classList.contains('products-page')) return;
  const oldHeader = $('.products-header');
  if(!oldHeader) return;

  const header = document.createElement('header');
  header.className = 'site-header product-site-header';
  header.id = 'siteHeader';
  header.innerHTML = `
    <a class="brand-logo" href="index.html" aria-label="ARAOUAA Premium — Accueil">
      <img src="assets/logo-crystal-4k.png" alt="ARAOUAA Premium">
    </a>
    <button class="menu-toggle" type="button" aria-label="Ouvrir le menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
    <nav class="main-nav" id="mainNav" aria-label="Navigation principale">
      <a href="index.html">Accueil</a>
      <a href="index.html#apropos">À propos</a>
      <a class="active" href="produits.html">Produits</a>
      <a href="index.html#qualite">Notre qualité</a>
      <a href="index.html#contact">Contact</a>
    </nav>
    <div class="header-actions">
      <button class="icon-button search-toggle" type="button" aria-label="Rechercher" aria-expanded="false">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.2"></circle><path d="M15.4 15.4 21 21"></path></svg>
      </button>
      <a class="icon-button instagram-link" href="https://www.instagram.com/" aria-label="Instagram">
        <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.4" cy="6.7" r="1" class="fill"></circle></svg>
      </a>
      <a class="icon-button cart-link" href="#contact" aria-label="Voir les produits">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L20.5 8H6"></path><circle cx="9.5" cy="19" r="1.2" class="fill"></circle><circle cx="17.5" cy="19" r="1.2" class="fill"></circle></svg>
        <span class="cart-badge">0</span>
      </a>
      <a class="header-contact" href="index.html#contact">Nous contacter</a>
    </div>
    <div class="search-panel" aria-hidden="true">
      <div class="search-panel-inner">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.2"></circle><path d="M15.4 15.4 21 21"></path></svg>
        <input id="siteSearch" type="search" placeholder="Rechercher un produit..." aria-label="Rechercher un produit">
        <button class="search-close" type="button" aria-label="Fermer la recherche">×</button>
      </div>
    </div>
  `;
  oldHeader.replaceWith(header);
}
ensureProductHeader();

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
  if(document.body.classList.contains('products-page')) return;
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
  if(e.key === 'Escape'){ setSearch(false); closeModal(); setMenu(false); closeFormat?.(); }
});

$('#contactForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const msg = $('.form-message', e.currentTarget);
  if(msg) msg.textContent = 'Merci. Votre demande est prête à être transmise à l’équipe ARAOUAA.';
  e.currentTarget.reset();
});

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

/* Keep any real WhatsApp control green, regardless of legacy inline styling. */
(function normalizeWhatsApp(){
  const candidates = $$('a.whatsapp,button.whatsapp,[class*="whatsapp"],a[href*="wa.me"],a[href*="whatsapp"]');
  candidates.forEach(el => {
    el.style.setProperty('background-color','#25D366','important');
    el.style.setProperty('background','#25D366','important');
    el.style.setProperty('border-color','#25D366','important');
    el.style.setProperty('color','#fff','important');
    el.querySelectorAll('svg,svg *').forEach(node => {
      node.style.setProperty('stroke','#fff','important');
      node.style.setProperty('fill','none','important');
    });
  });
})();

/* Product format modal is owned by the product page's inline markup. */
let closeFormat = () => {};
const formatModal = $('#formatModal');
const customWeight = $('#customWeight');
const formatConfirmation = $('#formatConfirmation');
if(formatModal){
  closeFormat = () => { formatModal.classList.remove('open'); formatModal.setAttribute('aria-hidden','true'); };
  $$('.format-button:not(.custom-format)').forEach(button => button.addEventListener('click',()=>{
    button.classList.add('selected');
    setTimeout(()=>button.classList.remove('selected'),650);
  }));
  $$('.custom-format').forEach(button => button.addEventListener('click',()=>{
    formatModal.classList.add('open');
    formatModal.setAttribute('aria-hidden','false');
    if(customWeight) customWeight.value='';
    if(formatConfirmation) formatConfirmation.textContent='';
    setTimeout(()=>customWeight?.focus(),80);
  }));
  $('.format-modal-close')?.addEventListener('click',closeFormat);
  $('.format-modal-backdrop')?.addEventListener('click',closeFormat);
  $('#customWeightSubmit')?.addEventListener('click',()=>{
    const value=customWeight?.value.trim();
    if(!value){customWeight?.focus();return;}
    if(formatConfirmation) formatConfirmation.textContent='Demande enregistrée : '+value+'. Nous pourrons confirmer ce grammage selon vos besoins.';
  });
}
})();