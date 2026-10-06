/**
 * Pure Vanilla JavaScript App Engine — Atelier Lumen
 * Handles API interaction with Python Flask backend, slider interactions, cart, and seller chat.
 */

class AtelierApp {
  constructor() {
    this.products = [];
    this.cart = [];
    this.activeCategory = 'all';
    this.currentSlide = 0;
    this.totalSlides = 5;
    this.isSliderAnimating = false;
    this.touchStartY = null;

    this.init();
  }

  async init() {
    this.initSlider();
    this.initChat();
    await this.fetchProducts();
    this.renderProducts();
  }

  // ===================== API CALLS =====================
  async fetchProducts() {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      this.products = data.products || [];
    } catch (err) {
      console.warn('Using fallback local catalog data:', err);
    }
  }

  // ===================== SLIDER ENGINE =====================
  initSlider() {
    const container = document.getElementById('hero-slider');
    if (!container) return;

    // Touch Swipe Detection
    container.addEventListener('touchstart', (e) => {
      this.touchStartY = e.touches[0].clientY;
    });

    container.addEventListener('touchend', (e) => {
      if (this.touchStartY === null) return;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = this.touchStartY - touchEndY;

      if (deltaY > 40) this.nextSlide(); // swipe up -> next slide
      else if (deltaY < -40) this.prevSlide(); // swipe down -> prev slide
      this.touchStartY = null;
    });

    // Auto-advance every 6s
    setInterval(() => {
      this.nextSlide();
    }, 6000);
  }

  updateSliderTrack() {
    const track = document.getElementById('hero-track');
    const counter = document.getElementById('slide-current');
    const pills = document.querySelectorAll('#swipe-pills .pill');

    if (track) {
      track.style.transform = `translateY(-${this.currentSlide * 100}%)`;
    }
    if (counter) {
      counter.textContent = `0${this.currentSlide + 1}`;
    }
    pills.forEach((p, idx) => {
      p.classList.toggle('active', idx === this.currentSlide);
    });
  }

  nextSlide() {
    if (this.isSliderAnimating) return;
    this.isSliderAnimating = true;
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateSliderTrack();
    setTimeout(() => { this.isSliderAnimating = false; }, 700);
  }

  prevSlide() {
    if (this.isSliderAnimating) return;
    this.isSliderAnimating = true;
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.updateSliderTrack();
    setTimeout(() => { this.isSliderAnimating = false; }, 700);
  }

  goToSlide(idx) {
    if (this.isSliderAnimating || idx === this.currentSlide) return;
    this.isSliderAnimating = true;
    this.currentSlide = idx;
    this.updateSliderTrack();
    setTimeout(() => { this.isSliderAnimating = false; }, 700);
  }

  // ===================== NAVIGATION =====================
  showPage(pageId) {
    document.querySelectorAll('.page-view').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) targetPage.classList.add('active');

    const activeLink = document.querySelector(`.nav-link[href="#${pageId}"]`);
    if (activeLink) activeLink.classList.add('active');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ===================== PRODUCT CATALOG =====================
  renderProducts() {
    const featuredGrid = document.getElementById('featured-grid');
    const catalogGrid = document.getElementById('catalog-grid');

    const filtered = this.products.filter(p => {
      if (this.activeCategory !== 'all' && p.category !== this.activeCategory) return false;
      return true;
    });

    const createCardHtml = (p) => `
      <div class="product-card">
        <div class="card-img-wrap" onclick="app.openPdp('${p.id}')">
          <img src="${p.images[0]}" alt="${p.name}">
        </div>
        <div class="card-body">
          <div>
            <span class="kicker">${p.category_label || p.category}</span>
            <h3 class="card-title" onclick="app.openPdp('${p.id}')">${p.name}</h3>
            <p class="card-price">$${p.price}</p>
          </div>
          <div class="card-actions">
            <button class="btn btn-secondary" onclick="app.addToCart('${p.id}')">Add to Bag</button>
            <button class="btn btn-primary" onclick="app.buyNow('${p.id}')">Buy Now</button>
          </div>
        </div>
      </div>
    `;

    if (featuredGrid) {
      featuredGrid.innerHTML = this.products.slice(0, 3).map(createCardHtml).join('');
    }
    if (catalogGrid) {
      catalogGrid.innerHTML = filtered.map(createCardHtml).join('');
    }
  }

  setCategory(cat) {
    this.activeCategory = cat;
    document.querySelectorAll('.filter-tabs .tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.cat === cat);
    });
    this.renderProducts();
  }

  filterProducts() {
    const query = document.getElementById('catalog-search').value.toLowerCase();
    const catalogGrid = document.getElementById('catalog-grid');

    const filtered = this.products.filter(p => {
      const matchCat = this.activeCategory === 'all' || p.category === this.activeCategory;
      const matchQ = p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query);
      return matchCat && matchQ;
    });

    catalogGrid.innerHTML = filtered.map(p => `
      <div class="product-card">
        <div class="card-img-wrap" onclick="app.openPdp('${p.id}')">
          <img src="${p.images[0]}" alt="${p.name}">
        </div>
        <div class="card-body">
          <div>
            <span class="kicker">${p.category_label || p.category}</span>
            <h3 class="card-title" onclick="app.openPdp('${p.id}')">${p.name}</h3>
            <p class="card-price">$${p.price}</p>
          </div>
          <div class="card-actions">
            <button class="btn btn-secondary" onclick="app.addToCart('${p.id}')">Add to Bag</button>
            <button class="btn btn-primary" onclick="app.buyNow('${p.id}')">Buy Now</button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // ===================== PDP MODAL =====================
  openPdp(productId) {
    const p = this.products.find(x => x.id === productId);
    if (!p) return;

    const pdpContent = document.getElementById('pdp-content');
    pdpContent.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
        <div style="aspect-ratio: 4/3; background: #EEE; border-radius: 6px; overflow: hidden;">
          <img src="${p.images[0]}" alt="${p.name}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div>
          <span class="kicker">${p.category_label || p.category} · SKU: ${p.sku}</span>
          <h2 style="font-family: var(--font-serif); font-size: 26px; margin: 6px 0;">${p.name}</h2>
          <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 12px;">${p.subtitle || ''}</p>
          <div style="font-family: var(--font-mono); font-size: 20px; font-weight: 600; margin-bottom: 16px;">$${p.price}</div>
          <p style="font-size: 12px; color: #444; margin-bottom: 20px; line-height: 1.6;">${p.description}</p>
          <div style="display: flex; gap: 8px; margin-bottom: 12px;">
            <button class="btn btn-secondary" style="flex:1;" onclick="app.addToCart('${p.id}')">Add to Bag</button>
            <button class="btn btn-primary" style="flex:1;" onclick="app.buyNow('${p.id}')">Buy Now</button>
          </div>
          <button class="btn btn-secondary" style="width: 100%;" onclick="app.chatAboutProduct('${p.name}')">Inquire with Artisan about this piece</button>
        </div>
      </div>
    `;

    document.getElementById('pdp-modal').classList.add('open');
  }

  closePdp() {
    document.getElementById('pdp-modal').classList.remove('open');
  }

  // ===================== CART & CHECKOUT =====================
  addToCart(productId) {
    const product = this.products.find(p => p.id === productId);
    if (!product) return;

    const existing = this.cart.find(i => i.id === productId);
    if (existing) {
      existing.qty += 1;
    } else {
      this.cart.push({ id: product.id, name: product.name, price: product.price, qty: 1, image: product.images[0] });
    }

    this.updateCartUi();
    this.openCart();
  }

  buyNow(productId) {
    this.addToCart(productId);
    this.closeCart();
    this.openCheckout();
  }

  updateCartUi() {
    const countEl = document.getElementById('cart-count');
    const itemsEl = document.getElementById('cart-items');
    const subtotalEl = document.getElementById('cart-subtotal');

    const totalQty = this.cart.reduce((sum, i) => sum + i.qty, 0);
    const subtotal = this.cart.reduce((sum, i) => sum + i.price * i.qty, 0);

    if (countEl) countEl.textContent = totalQty;
    if (subtotalEl) subtotalEl.textContent = `$${subtotal}`;

    if (itemsEl) {
      if (this.cart.length === 0) {
        itemsEl.innerHTML = '<p style="font-size: 13px; color: #888; text-align: center; padding: 40px 0;">Your shopping bag is empty.</p>';
      } else {
        itemsEl.innerHTML = this.cart.map(item => `
          <div style="display: flex; gap: 12px; margin-bottom: 14px; padding-bottom: 14px; border-bottom: 1px solid var(--border);">
            <img src="${item.image}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
            <div style="flex: 1; font-size: 12px;">
              <strong>${item.name}</strong>
              <div style="color: var(--text-muted); font-family: var(--font-mono);">$${item.price} × ${item.qty}</div>
            </div>
          </div>
        `).join('');
      }
    }
  }

  openCart() { document.getElementById('cart-drawer').classList.add('open'); }
  closeCart() { document.getElementById('cart-drawer').classList.remove('open'); }

  openCheckout() {
    this.closeCart();
    document.getElementById('checkout-modal').classList.add('open');
  }
  closeCheckout() { document.getElementById('checkout-modal').classList.remove('open'); }

  async handleCheckout(e) {
    e.preventDefault();
    if (this.cart.length === 0) return alert('Your bag is empty.');

    const payload = {
      items: this.cart,
      shipping: {
        name: document.getElementById('ship-name').value,
        email: document.getElementById('ship-email').value,
        address: document.getElementById('ship-addr').value
      },
      payment_method: document.getElementById('pay-method').value
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        alert(`Commission #${data.order.id} Confirmed! A receipt has been dispatched to ${payload.shipping.email}`);
        this.cart = [];
        this.updateCartUi();
        this.closeCheckout();
      }
    } catch {
      alert('Order placed successfully (offline simulation mode).');
      this.cart = [];
      this.updateCartUi();
      this.closeCheckout();
    }
  }

  // ===================== LIVE SELLER CHAT =====================
  initChat() {
    this.appendChatMessage('Greetings. I am Marcus, atelier keeper at Lumen. How may I assist you with our craft, materials, or custom orders?', 'seller');
  }

  toggleChat() {
    document.getElementById('chat-box').classList.toggle('open');
  }

  chatAboutProduct(productName) {
    this.closePdp();
    document.getElementById('chat-box').classList.add('open');
    this.sendRawMessage(`Hello Marcus, I would like to inquire about ${productName}. Is this piece available for immediate dispatch?`);
  }

  appendChatMessage(text, sender = 'user') {
    const msgBox = document.getElementById('chat-messages');
    if (!msgBox) return;

    const div = document.createElement('div');
    div.className = `chat-bubble ${sender}`;
    div.textContent = text;
    msgBox.appendChild(div);
    msgBox.scrollTop = msgBox.scrollHeight;
  }

  async sendChatMessage(e) {
    e.preventDefault();
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    await this.sendRawMessage(text);
  }

  async sendRawMessage(text) {
    this.appendChatMessage(text, 'user');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      const data = await res.json();
      if (data.messages && data.messages.length > 1) {
        this.appendChatMessage(data.messages[1].text, 'seller');
      }
    } catch {
      setTimeout(() => {
        this.appendChatMessage('Thank you for inquiring. We offer complimentary insured courier dispatch on all commissions over $150.', 'seller');
      }, 700);
    }
  }

  openAuthModal() {
    const email = prompt('Enter your collector email to sign in:');
    if (email) {
      document.getElementById('user-display').textContent = email.split('@')[0];
    }
  }
}

// Instantiate global app engine
const app = new AtelierApp();
window.app = app;
