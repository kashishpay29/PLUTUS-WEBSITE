function toggleMenu() {
  const m = document.getElementById('mobileMenu');
  m.classList.toggle('open');
}

function handleSubmit(btn) {
  btn.textContent = 'Sending…';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = '✓ Message Sent';
    btn.style.background = '#0F6E56';
  }, 1500);
}

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) cur = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--blue-600)' : '';
  });
});

const CATS = ['All', 'Computing', 'Printing', 'Storage', 'Networking & Power', 'Sound & Vision', 'Communication', 'Peripherals'];

let products = [
  { id: 1, name: 'Dell OptiPlex 7010', brand: 'Dell', cat: 'Computing', price: '₹42,500', badge: 'featured', desc: 'Intel Core i5, 8GB RAM, 512GB SSD, Windows 11 Pro', img: '' },
  { id: 2, name: 'HP LaserJet Pro 4001n', brand: 'HP', cat: 'Printing', price: '₹18,900', badge: 'new', desc: 'Mono laser, 42 ppm, USB + LAN, duplex printing', img: '' },
  { id: 3, name: 'Lenovo ThinkPad E14', brand: 'Lenovo', cat: 'Computing', price: '₹56,000', badge: '', desc: 'AMD Ryzen 5, 16GB RAM, 512GB SSD, 14" FHD display', img: '' },
  { id: 4, name: 'Cisco SG350 Switch', brand: 'Cisco', cat: 'Networking & Power', price: '₹12,000', badge: 'featured', desc: '24-port Gigabit managed switch for enterprise LAN', img: '' },
  { id: 5, name: 'Seagate IronWolf NAS 4TB', brand: 'Seagate', cat: 'Storage', price: '₹8,200', badge: '', desc: 'NAS-optimised HDD, 5400 RPM, 3-year warranty', img: '' },
];

let currentCat = 'All';

function countForCat(cat) {
  if (cat === 'All') return products.length;
  return products.filter(p => p.cat === cat).length;
}

function renderTabs() {
  const el = document.getElementById('catTabs');
  el.innerHTML = CATS.map(c => `
    <button class="cat-tab ${c === currentCat ? 'active' : ''}" onclick="switchCat('${c}')">
      ${c} <span class="tab-count">${countForCat(c)}</span>
    </button>
  `).join('');
}

function switchCat(cat) {
  currentCat = cat;
  renderTabs();
  renderGrid();
}

function renderGrid() {
  const el = document.getElementById('prodGrid');
  const filtered = currentCat === 'All' ? products : products.filter(p => p.cat === currentCat);

  if (filtered.length === 0) {
    el.innerHTML = `<div class="empty-state">No products in this category yet.</div>`;
    return;
  }

  el.innerHTML = filtered.map(p => `
    <div class="prod-card" id="pc-${p.id}">
      ${p.img
        ? `<img class="prod-card-img" src="${p.img}" alt="${p.name}">`
        : `<div class="prod-card-img-placeholder"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg></div>`
      }
      <div class="prod-card-body">
        ${p.badge ? `<span class="prod-badge ${p.badge}">${p.badge === 'new' ? 'New Arrival' : p.badge === 'featured' ? 'Featured' : 'On Sale'}</span>` : ''}
        <div class="prod-name">${p.name}</div>
        ${p.brand ? `<div class="prod-brand">${p.brand} · ${p.cat}</div>` : `<div class="prod-brand">${p.cat}</div>`}
        ${p.desc ? `<div style="font-size:12px;color:var(--gray-600);line-height:1.55;margin-bottom:4px">${p.desc}</div>` : ''}
        <div class="prod-footer">
          <div class="prod-price">${p.price || 'POA'}<small>${p.price ? '+GST' : ''}</small></div>
          <button class="prod-enquire" onclick="enquire('${p.name}')">Enquire</button>
        </div>
      </div>
    </div>
  `).join('');
}

function enquire(name) {
  const email = 'sales@plutusventures.in';
  window.location.href = `mailto:${email}?subject=Product Enquiry: ${encodeURIComponent(name)}&body=Hi Plutus Ventures,%0A%0AI am interested in the ${encodeURIComponent(name)}. Please share availability and pricing details.%0A%0ARegards`;
}

renderTabs();
renderGrid();
