(() => {
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function ensureProductHeader(){
  if(!document.body.classList.contains('products-page')) return;
  const oldHeader = $('.products-header');
  if(!oldHeader) return;

  const style = document.createElement('style');
  style.id = 'product-shared-header-style';
  style.textContent = `
    .product-site-header{height:116px;position:sticky;top:0;z-index:9999;display:flex;align-items:center;padding:0 5.8%;gap:40px;justify-content:flex-start;background:rgba(33,23,19,.97);background-image:none;border-bottom:1px solid rgba(199,161,90,.42);box-shadow:0 10px 35px rgba(25,15,11,.16);backdrop-filter:blur(14px);isolation:isolate;overflow:visible;}
    .product-site-header .brand-logo{width:164px;height:94px;display:flex;align-items:center;flex:0 0 auto;position:relative;z-index:2;}
    .product-site-header .brand-logo img{width:100%;height:100%;object-fit:contain;display:block;}
    .product-site-header .main-nav{display:flex;align-items:center;justify-content:center;gap:42px;flex:1;margin:0;}
    .product-site-header .main-nav a{color:#eadfce;font-size:13px;font-weight:500;letter-spacing:.5px;text-transform:none;padding:10px 0;position:relative;}
    .product-site-header .main-nav a:after{content:"";position:absolute;left:0;right:100%;bottom:0;height:2px;background:#e1c98f;transition:.25s;}
    .product-site-header .main-nav a:hover,.product-site-header .main-nav a.active{color:#e1c98f;}
    .product-site-header .main-nav a:hover:after,.product-site-header .main-nav a.active:after{right:0;}
    .product-site-header .header-actions{display:flex;align-items:center;gap:13px;margin-left:auto;position:relative;z-index:3;flex:0 0 auto;}
    .product-site-header .icon-button{width:40px;height:40px;display:grid;place-items:center;padding:0;border:0;background:transparent;color:#e1c98f;position:relative;}
    .product-site-header .icon-button svg{width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:1.6;}
    .product-site-header .icon-button .fill{fill:currentColor;stroke:none;}
    .product-site-header .cart-badge{position:absolute;top:1px;right:1px;width:15px;height:15px;border-radius:50%;display:grid;place-items:center;background:#e1c98f;color:#211713;font:700 9px/1 Poppins,Arial,sans-serif;border:2px solid #211713;}
    .product-site-header .header-contact{border:1px solid rgba(199,161,90,.42);color:#e1c98f;background:transparent;box-shadow:none;border-radius:30px;padding:11px 19px;font-size:11px;font-weight:600;white-space:nowrap;}
    .product-site-header .header-contact:hover{background:#e1c98f;color:#171513;border-color:#e1c98f;}
    .product-site-header .menu-toggle{display:none;background:none;border:0;}
    .product-site-header .search-panel{position:absolute;right:5.8%;top:116px;width:min(500px,90vw);opacity:0;visibility:hidden;pointer-events:none;transform:translateY(-8px);transition:.25s;z-index:10005;}
    .product-site-header .search-panel.open{opacity:1;visibility:visible;pointer-events:auto;transform:none;}
    .product-site-header .search-panel-inner{display:flex;align-items:center;gap:10px;background:#fffaf2;border:1px solid rgba(23,21,19,.12);border-radius:14px;padding:10px 12px;box-shadow:0 18px 50px rgba(0,0,0,.2);}
    .product-site-header .search-panel-inner svg{width:21px;height:21px;fill:none;stroke:#c79a3b;stroke-width:1.7;flex:0 0 auto;}
    .product-site-header .search-panel-inner input{border:0;outline:0;background:transparent;color:#171513;width:100%;font:13px Poppins,Arial,sans-serif;}
    .product-site-header .search-panel-inner button{border:0;background:none;color:#75695d;font-size:25px;line-height:1;cursor:pointer;}
    @media(max-width:1150px){.product-site-header{height:84px;padding:0 4%;gap:25px}.product-site-header .brand-logo{width:145px;height:84px}.product-site-header .main-nav{gap:25px}.product-site-header .header-contact{display:none}.product-site-header .header-actions{gap:8px}.product-site-header .search-panel{top:84px}}
    @media(max-width:850px){.product-site-header{height:76px;padding:0 5%;gap:0}.product-site-header .brand-logo{width:118px;height:68px}.product-site-header .header-actions{gap:1px}.product-site-header .icon-button{width:32px;height:36px}.product-site-header .icon-button svg{width:20px;height:20px}.product-site-header .cart-badge{width:13px;height:13px;font-size:8px;top:1px;right:0}.product-site-header .menu-toggle{display:flex;position:relative;z-index:10002;margin-left:6px;width:40px;height:40px;align-items:center;justify-content:center;flex-direction:column;gap:5px}.product-site-header .menu-toggle span{display:block;width:23px;height:2px;background:#f7eddb}.product-site-header .main-nav{display:flex;position:absolute;left:0;right:0;top:76px;width:100%;height:auto;flex-direction:column;align-items:stretch;justify-content:flex-start;gap:0;padding:8px 5% 12px;margin:0;background:#211713;border-top:1px solid rgba(225,201,143,.2);border-bottom:1px solid rgba(225,201,143,.3);box-shadow:0 18px 35px rgba(0,0,0,.25);opacity:0;visibility:hidden;transform:translateY(-10px);pointer-events:none;transition:opacity .22s ease,transform .22s ease,visibility .22s ease;z-index:10001}.product-site-header .main-nav.open{opacity:1;visibility:visible;transform:none;pointer-events:auto}.product-site-header .main-nav a{display:block;width:100%;padding:14px 0;color:#eadfce;font-size:11px;letter-spacing:1.5px;border-bottom:1px solid rgba(225,201,143,.12)}.product-site-header .main-nav a:last-child{border-bottom:0}.product-site-header .main-nav a:after{display:none}.product-site-header .search-panel{top:76px;right:5%;width:90%}}
    @media(max-width:520px){.product-site-header .brand-logo{width:108px;height:62px}.product-site-header .icon-button{width:29px}.product-site-header .menu-toggle{width:38px;margin-left:3px}}
  `;
  document.head.appendChild(style);

  const header = document.createElement('header');
  header.className = 'site-header product-site-header';
  header.id = 'siteHeader';
  header.innerHTML = `
    <a class="brand-logo" href="index.html" aria-label="ARAOUAA Premium — Accueil"><img src="assets/logo-crystal-4k.png" alt="ARAOUAA Premium"></a>
    <button class="menu-toggle" type="button" aria-label="Ouvrir le menu" aria-expanded="false"><span></span><span></span><span></span></button>
    <nav class="main-nav" id="mainNav" aria-label="Navigation principale">
      <a href="index.html">Accueil</a><a href="index.html#apropos">À propos</a><a class="active" href="produits.html">Produits</a><a href="index.html#qualite">Notre qualité</a><a href="index.html#contact">Contact</a>
    </nav>
    <div class="header-actions">
      <button class="icon-button search-toggle" type="button" aria-label="Rechercher" aria-expanded="false"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.2"></circle><path d="M15.4 15.4 21 21"></path></svg></button>
      <a class="icon-button instagram-link" href="https://www.instagram.com/" aria-label="Instagram"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.4" cy="6.7" r="1" class="fill"></circle></svg></a>
      <a class="icon-button cart-link" href="#contact" aria-label="Voir les produits"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 4.5h2l2.3 12.2a2 2 0 0 0 2 1.65h7.35a2 2 0 0 0 1.97-1.65L20.5 8.3H6.2"></path><circle cx="10.2" cy="20" r="1.35" class="fill"></circle><circle cx="17" cy="20" r="1.35" class="fill"></circle></svg></a>
      <a class="header-contact" href="index.html#contact">Nous contacter</a>
    </div>
    <div class="search-panel" aria-hidden="true"><div class="search-panel-inner"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.2"></circle><path d="M15.4 15.4 21 21"></path></svg><input id="siteSearch" type="search" placeholder="Rechercher un produit..." aria-label="Rechercher un produit"><button class="search-close" type="button" aria-label="Fermer la recherche">×</button></div></div>
  `;
  oldHeader.replaceWith(header);
}
ensureProductHeader();

const header = $('#siteHeader');
const menu = $('.menu-toggle');
const nav = $('#mainNav');
function setMenu(open){if(!menu || !nav) return;nav.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Fermer le menu':'Ouvrir le menu');}
menu?.addEventListener('click',()=>setMenu(!nav.classList.contains('open')));
$$('.main-nav a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));

const sections=$$('main section[id]');
const navLinks=$$('.main-nav a');
function updateActiveNav(){if(document.body.classList.contains('products-page')) return;const y=window.scrollY+150;let current='accueil';sections.forEach(section=>{if(section.offsetTop<=y) current=section.id;});navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${current}`));}
window.addEventListener('scroll',()=>{header?.classList.toggle('scrolled',window.scrollY>25);$('.to-top')?.classList.toggle('show',window.scrollY>650);updateActiveNav();},{passive:true});
updateActiveNav();
$('.to-top')?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});},{threshold:.12});
$$('.reveal').forEach(el=>observer.observe(el));

const searchToggle=$('.search-toggle'),searchPanel=$('.search-panel'),searchInput=$('#siteSearch'),searchClose=$('.search-close'),cards=$$('.product-card');
function setSearch(open){if(!searchPanel)return;searchPanel.classList.toggle('open',open);searchPanel.setAttribute('aria-hidden',String(!open));searchToggle?.setAttribute('aria-expanded',String(open));if(open)setTimeout(()=>searchInput?.focus(),80);}
searchToggle?.addEventListener('click',()=>setSearch(!searchPanel.classList.contains('open')));
searchClose?.addEventListener('click',()=>{if(searchInput)searchInput.value='';cards.forEach(c=>{c.classList.remove('search-hidden');c.style.display='';});setSearch(false);});
searchInput?.addEventListener('input',()=>{const q=searchInput.value.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');cards.forEach(card=>{const hay=(card.dataset.search+' '+card.textContent).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');const match=!q||hay.includes(q);card.classList.toggle('search-hidden',!match);card.style.display=match?'':'none';});});

const filterChips=$$('.filter-chip');filterChips.forEach(chip=>chip.addEventListener('click',()=>{const filter=chip.dataset.filter||'all';filterChips.forEach(c=>c.classList.toggle('active',c===chip));cards.forEach(card=>{const matches=filter==='all'||card.dataset.category===filter;card.classList.toggle('search-hidden',!matches);card.style.display=matches?'':'none';});}));

const modal=$('#productModal'),modalTitle=$('#modalTitle'),modalText=$('#modalText');
const productData={cafe:['Café','Un univers autour du café, pensé pour mettre en avant l’arôme, la richesse et le caractère d’une sélection premium.'],epices:['Épices','Des épices aux parfums généreux pour apporter profondeur, couleur et caractère aux recettes du quotidien.'],'fruits-secs':['Fruits secs','Une collection gourmande autour de fruits secs soigneusement présentés, avec une attention particulière portée à la qualité et à la texture.'],argan:['Huile d’argan','Une signature naturelle emblématique du Maroc, mise en valeur dans une présentation sobre, élégante et premium.'],epicerie:['Épicerie','Riz, semoule, couscous et essentiels du garde-manger marocain, réunis dans une présentation à l’image de la collection ARAOUAA.']};
function closeModal(){modal?.classList.remove('open');modal?.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');}
$$('.product-link').forEach(button=>button.addEventListener('click',()=>{const item=productData[button.dataset.product];if(!item||!modal)return;modalTitle.textContent=item[0];modalText.textContent=item[1];modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');}));
$('.modal-close')?.addEventListener('click',closeModal);$('.modal-backdrop')?.addEventListener('click',closeModal);$('.modal-contact')?.addEventListener('click',closeModal);

document.addEventListener('keydown',e=>{if(e.key==='Escape'){setSearch(false);closeModal();setMenu(false);closeFormat();}});
$('#contactForm')?.addEventListener('submit',e=>{e.preventDefault();const msg=$('.form-message',e.currentTarget);if(msg)msg.textContent='Merci. Votre demande est prête à être transmise à l’équipe ARAOUAA.';e.currentTarget.reset();});

(function addRequestedNutProducts(){const grid=document.querySelector('#noix-graines .product-items');if(!grid)return;const existing=[...grid.querySelectorAll('[data-product-name],h3')].map(el=>(el.dataset.productName||el.textContent).trim().toLowerCase());const requested=[['Amande grillée','AMANDE GRILLÉE'],['Amande effilée','AMANDE EFFILÉE'],['Amande hachée','AMANDE HACHÉE'],['Amande en poudre','AMANDE EN POUDRE'],['Arachides','ARACHIDES']];const makeCard=(name,label)=>{const article=document.createElement('article');article.className='product-item catalog-added-item';article.dataset.productName=name;article.innerHTML=`<div class="product-item-image"><div class="product-placeholder"><span>ARAOUAA</span><strong>${label}</strong><small>NOIX &amp; GRAINES</small></div></div><div class="product-item-content"><span class="product-item-tag">NOIX &amp; GRAINES</span><h3>${name}</h3><p>Une référence délicate au profil naturellement généreux et raffiné.</p><div class="product-formats"><span class="formats-label">FORMATS DISPONIBLES</span><div class="format-list"><button class="format-button" data-weight="50 g">50 g</button><button class="format-button" data-weight="100 g">100 g</button><button class="format-button" data-weight="250 g">250 g</button><button class="format-button" data-weight="500 g">500 g</button><button class="format-button" data-weight="1 kg">1 kg</button><button class="format-button" data-weight="5 kg">5 kg</button><button class="format-button custom-format">+ Sur demande</button></div></div></div>`;return article;};requested.forEach(([name,label])=>{if(!existing.includes(name.toLowerCase()))grid.appendChild(makeCard(name,label));});grid.querySelectorAll('.catalog-added-item .format-button:not(.custom-format)').forEach(b=>b.addEventListener('click',()=>{b.classList.add('selected');setTimeout(()=>b.classList.remove('selected'),650);}));})();

(function addOilAmlouCategory(){
  if(!document.body.classList.contains('products-page')) return;
  const nav=document.querySelector('.product-category-nav');
  const story=document.querySelector('.product-story');
  if(!nav || !story || document.querySelector('[data-section="huiles-amlou"]')) return;

  const filter=document.createElement('button');
  filter.className='catalog-filter';
  filter.dataset.category='huiles-amlou';
  filter.textContent='Huiles & Amlou';
  nav.insertBefore(filter,nav.querySelector('[data-category="autres"]'));

  const section=document.createElement('section');
  section.className='product-category-section category-oils';
  section.dataset.section='huiles-amlou';
  section.id='huiles-amlou';
  section.innerHTML=`
    <div class="category-heading"><div class="category-heading-left"><span class="category-number">08</span><div><span class="product-item-tag">UNIVERS ARAOUAA</span><h2>Huiles <em>&amp; Amlou</em></h2></div></div><p>Une sélection autour des huiles alimentaires et de l’Amlou, entre savoir-faire marocain, richesse du terroir et plaisir authentique.</p></div>
    <div class="pantry-intro"><p>L’Amlou est une spécialité traditionnelle du Souss préparée à partir d’amandes grillées, d’huile d’argan alimentaire et de miel.</p></div>
    <div class="product-items">
      <article class="product-item" data-product-name="Huile d’argan alimentaire"><div class="product-item-image"><div class="product-placeholder"><img src="assets/argan-oil.png" alt="Huile d’argan alimentaire" style="max-width:78%;max-height:78%;object-fit:contain"><strong>HUILE D’ARGAN</strong><small>HUILE ALIMENTAIRE</small></div></div><div class="product-item-content"><span class="product-item-tag">HUILES &amp; AMLOU</span><h3>Huile d’argan alimentaire</h3><p>Une huile emblématique du terroir marocain, au caractère délicatement toasté et destinée aux usages culinaires.</p><div class="product-formats"><span class="formats-label">FORMATS DISPONIBLES</span><div class="format-list"><button class="format-button" data-weight="250 ml">250 ml</button><button class="format-button" data-weight="500 ml">500 ml</button><button class="format-button" data-weight="1 L">1 L</button><button class="format-button custom-format">+ Sur demande</button></div></div></div></article>
      <article class="product-item" data-product-name="Huile d’olive"><div class="product-item-image"><div class="product-placeholder"><span>ARAOUAA</span><strong>HUILE D’OLIVE</strong><small>HUILE ALIMENTAIRE</small></div></div><div class="product-item-content"><span class="product-item-tag">HUILES &amp; AMLOU</span><h3>Huile d’olive</h3><p>Une huile alimentaire polyvalente, pensée pour accompagner les préparations et la cuisine du quotidien.</p><div class="product-formats"><span class="formats-label">FORMATS DISPONIBLES</span><div class="format-list"><button class="format-button" data-weight="250 ml">250 ml</button><button class="format-button" data-weight="500 ml">500 ml</button><button class="format-button" data-weight="1 L">1 L</button><button class="format-button custom-format">+ Sur demande</button></div></div></div></article>
      <article class="product-item" data-product-name="Amlou traditionnel"><div class="product-item-image"><div class="product-placeholder"><span>ARAOUAA</span><strong>AMLOU</strong><small>AMANDES · ARGAN · MIEL</small></div></div><div class="product-item-content"><span class="product-item-tag">HUILES &amp; AMLOU</span><h3>Amlou traditionnel</h3><p>Une pâte à tartiner du Souss associant amandes grillées, huile d’argan alimentaire et miel.</p><div class="product-formats"><span class="formats-label">FORMATS DISPONIBLES</span><div class="format-list"><button class="format-button" data-weight="100 g">100 g</button><button class="format-button" data-weight="250 g">250 g</button><button class="format-button" data-weight="500 g">500 g</button><button class="format-button" data-weight="1 kg">1 kg</button><button class="format-button custom-format">+ Sur demande</button></div></div></div></article>
    </div>`;
  story.parentNode.insertBefore(section,story);

  const footerUnivers=document.querySelector('.footer-nav > div:nth-child(2)');
  if(footerUnivers){const link=document.createElement('a');link.href='#huiles-amlou';link.textContent='Huiles & Amlou';const autres=footerUnivers.querySelector('a[href="#autres"]');footerUnivers.insertBefore(link,autres||null);}

  const formats=section.querySelectorAll('.format-button:not(.custom-format)');
  formats.forEach(button=>button.addEventListener('click',()=>{button.classList.add('selected');setTimeout(()=>button.classList.remove('selected'),650);}));
})();

(function normalizeWhatsApp(){
  $$('a.whatsapp,button.whatsapp,[class*="whatsapp"],a[href*="wa.me"],a[href*="whatsapp"]').forEach(el=>{
    el.style.setProperty('background','#25D366','important');el.style.setProperty('background-color','#25D366','important');el.style.setProperty('border-color','#25D366','important');el.style.setProperty('color','#fff','important');
    el.querySelectorAll('svg,svg *').forEach(node=>{node.style.setProperty('stroke','#fff','important');node.style.setProperty('fill','none','important');});
  });
})();

let closeFormat=()=>{};
const formatModal=$('#formatModal'),customWeight=$('#customWeight'),formatConfirmation=$('#formatConfirmation');
if(formatModal){closeFormat=()=>{formatModal.classList.remove('open');formatModal.setAttribute('aria-hidden','true');};$$('.format-button:not(.custom-format)').forEach(button=>button.addEventListener('click',()=>{button.classList.add('selected');setTimeout(()=>button.classList.remove('selected'),650);}));$$('.custom-format').forEach(button=>button.addEventListener('click',()=>{formatModal.classList.add('open');formatModal.setAttribute('aria-hidden','false');if(customWeight)customWeight.value='';if(formatConfirmation)formatConfirmation.textContent='';setTimeout(()=>customWeight?.focus(),80);}));$('.format-modal-close')?.addEventListener('click',closeFormat);$('.format-modal-backdrop')?.addEventListener('click',closeFormat);$('#customWeightSubmit')?.addEventListener('click',()=>{const value=customWeight?.value.trim();if(!value){customWeight?.focus();return;}if(formatConfirmation)formatConfirmation.textContent='Demande enregistrée : '+value+'. Nous pourrons confirmer ce grammage selon vos besoins.';});}
})();