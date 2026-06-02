document.addEventListener("DOMContentLoaded", () => {
    // ۱. تزریق فوری کامپوننت سبد خرید قبل از اجرای هر کد دیگری
    if (typeof injectCartComponent === 'function') {
        injectCartComponent();
    }

    // ===== DATA =====
    const menuData = {
        'breakfast': {
            name: 'صبحانه', image: 'images/1.jpg',
            items: [
                { id: 'br1', name: 'املت مخصوص', description: 'تخم مرغ، قارچ، بیکن، گوجه گیلاسی', price: 180000, image: 'images/2.jpg', tags: ['🍳 تخم‌مرغ', '🥓 بیکن'] },
                { id: 'br2', name: 'پنکیک نوتلا', description: 'سه لایه پنکیک، نوتلا، توت فرنگی', price: 160000, image: 'images/3.jpg', tags: ['🍫 شیرین', '🍓 میوه'] },
                { id: 'br3', name: 'صبحانه انگلیسی', description: 'لوبیا، سوسیس، نیمرو، نان تست', price: 240000, image: 'images/4.jpg', tags: ['🌭 سوسیس', '🍞 نان'] },
                { id: 'br4', name: 'تست آووکادو', description: 'نان چاودار، آووکادو تازه، تخم مرغ پوچ', price: 210000, image: 'images/5.jpg', tags: ['🥑 وگان', '🥗 سالم'] }
            ]
        },
        'salad': {
            name: 'سالاد', image: 'images/6.jpg',
            items: [
                { id: 'sl1', name: 'سالاد سزار', description: 'کاهو، مرغ گریل، نان کروتون، پنیر پارمزان', price: 190000, image: 'images/7.jpg', tags: ['🥬 تازه', '🧀 پنیر'] },
                { id: 'sl2', name: 'سالاد کینوا', description: 'کینوا، آووکادو، انار، سس لیمو', price: 210000, image: 'images/8.jpg', tags: ['🥗 رژیمی', '🍋 ترش'] },
                { id: 'sl3', name: 'سیب‌زمینی ویژه', description: 'سیب‌زمینی سرخ شده، سس پنیر، بیکن', price: 140000, image: 'images/9.jpg', tags: ['🍟 سرخ‌کردنی', '🧀 پنیری'] }
            ]
        },
        'smoothie': {
            name: 'نوشیدنی', image: 'images/10.jpg',
            items: [
                { id: 'sm1', name: 'بری بری', description: 'میکس توت فرنگی، تمشک، بلوبری', price: 120000, image: 'images/11.jpg', tags: ['🍓 بری', '❄️ سرد'] },
                { id: 'sm2', name: 'تروپیکال', description: 'انبه، آناناس، شیر نارگیل', price: 130000, image: 'images/12.jpg', tags: ['🥭 استوایی', '🥥 نارگیل'] },
                { id: 'sm3', name: 'شیک نوتلا', description: 'بستنی وانیل، نوتلا، فندق', price: 140000, image: 'images/13.jpg', tags: ['🍫 شکلاتی', '🍦 بستنی'] },
                { id: 'sm4', name: 'گرین دتوکس', description: 'کرفس، سیب سبز، لیمو، زنجبیل', price: 110000, image: 'images/14.jpg', tags: ['🍏 سم‌زدا', '🥬 سبز'] }
            ]
        },
        'pizza': {
            name: 'پیتزا', image: 'images/15.jpg',
            items: [
                { id: 'p1', name: 'پپرونی', description: 'پپرونی تخمیر شده، فلفل هالوپینو', price: 250000, image: 'images/16.jpg', tags: ['🌶️ تند', '🍕 کلاسیک'] },
                { id: 'p2', name: 'استیک', description: 'راسته گوساله، سس سیر رست شده', price: 310000, image: 'images/17.jpg', tags: ['🥩 گوشت', '🧄 سیر'] },
                { id: 'p3', name: 'مارگاریتا', description: 'گوجه گیلاسی، ریحان ایتالیایی', price: 210000, image: 'images/18.jpg', tags: ['🍅 گیاهی', '🇮🇹 ایتالیایی'] },
                { id: 'p4', name: 'چیکن پستو', description: 'مرغ گریل، سس پستو، پنیر پارمزان', price: 270000, image: 'images/19.jpg', tags: ['🍗 مرغ', '🌿 پستو'] }
            ]
        },
        'burger': {
            name: 'برگر', image: 'images/20.jpg',
            items: [
                { id: 'b1', name: 'ترافل برگر', description: '۱۵۰ گرم گوشت، سس ترافل', price: 280000, image: 'images/21.jpg', tags: ['🍄 ترافل', '🍔 دست‌ساز'] },
                { id: 'b2', name: 'ماشروم', description: 'سس قارچ خامه ای، پنیر سوئیسی', price: 260000, image: 'images/22.jpg', tags: ['🍄 قارچ', '🧀 سوئیسی'] },
                { id: 'b3', name: 'چیزبرگر کلاسیک', description: 'گوشت گوساله، پنیر گودا، خیارشور', price: 220000, image: 'images/23.jpg', tags: ['🧀 گودا', '🥒 خیارشور'] }
            ]
        }
    };

    // ===== STATE =====
    let cart = JSON.parse(localStorage.getItem('cafeRoyaCart')) || [];
    let currentFilter = 'all';
    let orderType = 'hall';

    // ===== DOM ELEMENTS =====
    const menuContainer = document.getElementById('menu-container');
    const categoryRail = document.getElementById('category-rail');
    const mobileBar = document.getElementById('mobile-bar');
    const mobileCount = document.getElementById('mobile-count');
    const mobileTotal = document.getElementById('mobile-total');
    const searchOverlay = document.getElementById('search-overlay');
    const searchInput = document.getElementById('search-input');
    
    const cartPanel = document.getElementById('cart-panel');
    const cartBackdrop = document.getElementById('cart-backdrop');
    const cartItemsArea = document.getElementById('cart-items-area');
    const cartTotalPriceEl = document.getElementById('cart-total-price');
    const cartBadge = document.getElementById('cart-badge');
    const formHall = document.getElementById('form-hall');
    const formTakeaway = document.getElementById('form-takeaway');
    
    const modalOverlay = document.getElementById('product-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalPrice = document.getElementById('modal-price');
    const modalAddBtn = document.getElementById('modal-add-btn');
    const modalCloseBtn = document.getElementById('close-modal-btn');

    const formatPrice = (price) => new Intl.NumberFormat('fa-IR').format(price) + ' تومان';

    // ===== RENDERING =====
    const renderCategories = () => {
        let html = `
            <div class="story-item active" data-filter="all">
                <div class="story-ring"><img src="images/0.jpg" class="story-img" alt="All"></div>
                <span class="story-label">همه</span>
            </div>
        `;
        Object.keys(menuData).forEach(key => {
            html += `
                <div class="story-item" data-filter="${key}">
                    <div class="story-ring"><img src="${menuData[key].image}" class="story-img" alt="${menuData[key].name}"></div>
                    <span class="story-label">${menuData[key].name}</span>
                </div>
            `;
        });
        categoryRail.innerHTML = html;
    };

    const renderMenu = (filter = 'all', searchTerm = '') => {
        menuContainer.innerHTML = '';
        let hasItems = false;

        Object.keys(menuData).forEach(key => {
            if (filter === 'all' || filter === key) {
                const categoryItems = menuData[key].items.filter(item => 
                    !searchTerm || item.name.includes(searchTerm) || item.description.includes(searchTerm)
                );

                if (categoryItems.length > 0) {
                    hasItems = true;

                    if (filter === 'all' && !searchTerm) {
                        const separator = document.createElement('div');
                        separator.className = 'cat-separator';
                        separator.innerHTML = `
                            <div class="cat-line"></div>
                            <span class="cat-title">${menuData[key].name}</span>
                            <div class="cat-line"></div>
                        `;
                        menuContainer.appendChild(separator);
                    }

                    categoryItems.forEach(item => {
                        const cartItem = cart.find(c => c.id === item.id);
                        const quantity = cartItem ? cartItem.quantity : 0;

                        const card = document.createElement('div');
                        card.className = 'nano-card';
                        
                        let buttonHTML = quantity > 0 
                            ? `<div class="card-controls">
                                <button class="ctrl-btn-sm dec" data-id="${item.id}">-</button>
                                <span class="card-qty">${quantity}</span>
                                <button class="ctrl-btn-sm inc" data-id="${item.id}">+</button>
                               </div>`
                            : `<button class="btn-add-initial" data-id="${item.id}">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                               </button>`;

                        let tagsHTML = item.tags && item.tags.length > 0 ? `<div class="card-tags">${item.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join('')}</div>` : '';

                        card.innerHTML = `
                            <img src="${item.image}" alt="${item.name}" class="card-img" loading="lazy">
                            <div class="card-info">
                                <h3 class="card-title">${item.name}</h3>
                                <p class="card-desc">${item.description}</p>
                                ${tagsHTML}
                            </div>
                            <div class="card-footer">
                                <span class="card-price">${formatPrice(item.price)}</span>
                                ${buttonHTML}
                            </div>
                        `;

                        if (quantity > 0) {
                            card.querySelector('.inc').addEventListener('click', () => updateQuantity(item.id, 1));
                            card.querySelector('.dec').addEventListener('click', () => updateQuantity(item.id, -1));
                        } else {
                            card.querySelector('.btn-add-initial').addEventListener('click', () => addToCart(item));
                        }

                        card.querySelector('.card-img').addEventListener('click', () => openModal(item));
                        menuContainer.appendChild(card);
                    });
                }
            }
        });

        if (!hasItems) menuContainer.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:2rem;color:#999">آیتمی پیدا نشد</div>`;
    };

    const renderCart = () => {
        cartItemsArea.innerHTML = '';
        let total = 0; let count = 0;

        if (cart.length === 0) {
            cartItemsArea.innerHTML = `<div style="text-align:center;color:#777;margin:3rem 0;font-size:0.9rem;">سبد خرید خالی است</div>`;
        } else {
            cart.forEach(item => {
                total += item.price * item.quantity; count += item.quantity;
                const el = document.createElement('div');
                el.className = 'cart-item-chic';
                el.innerHTML = `
                    <img src="${item.image}" class="chic-img">
                    <div class="chic-info">
                        <span class="chic-title">${item.name}</span>
                        <span class="chic-price">${formatPrice(item.price)}</span>
                    </div>
                    <div class="chic-controls">
                        <button class="chic-btn inc">+</button>
                        <span class="chic-qty">${item.quantity}</span>
                        <button class="chic-btn dec">-</button>
                    </div>
                `;
                el.querySelector('.inc').addEventListener('click', () => updateQuantity(item.id, 1));
                el.querySelector('.dec').addEventListener('click', () => updateQuantity(item.id, -1));
                cartItemsArea.appendChild(el);
            });
        }

        const formattedTotal = formatPrice(total);
        cartTotalPriceEl.textContent = formattedTotal;
        cartBadge.textContent = count;
        mobileCount.textContent = count;
        mobileTotal.textContent = formattedTotal;

        if (count > 0) {
            cartBadge.classList.add('show');
            mobileBar.classList.add('show');
        } else {
            cartBadge.classList.remove('show');
            mobileBar.classList.remove('show');
            toggleCart(false);
        }

        localStorage.setItem('cafeRoyaCart', JSON.stringify(cart));
        renderMenu(currentFilter, searchInput.value);
    };

    // ===== ACTIONS =====
    const toggleCart = (open) => {
        if (open) {
            cartPanel.classList.add('open'); cartBackdrop.classList.add('active');
            if(window.innerWidth <= 768) document.body.style.overflow = 'hidden';
        } else {
            cartPanel.classList.remove('open'); cartBackdrop.classList.remove('active');
            document.body.style.overflow = '';
        }
    };

    const openModal = (item) => {
        modalImg.src = item.image; modalTitle.textContent = item.name; modalDesc.textContent = item.description; modalPrice.textContent = formatPrice(item.price);
        modalAddBtn.onclick = () => { addToCart(item); closeModal(); };
        modalOverlay.classList.add('active'); document.body.style.overflow = 'hidden';
    };

    const closeModal = () => { modalOverlay.classList.remove('active'); document.body.style.overflow = ''; };
    
    const addToCart = (item) => { 
        const existing = cart.find(c => c.id === item.id); 
        if (existing) existing.quantity++; else cart.push({ ...item, quantity: 1 }); 
        renderCart(); showToast(`${item.name} اضافه شد`); 
    };
    
    const updateQuantity = (id, change) => { 
        const idx = cart.findIndex(c => c.id === id); 
        if (idx > -1) { cart[idx].quantity += change; if (cart[idx].quantity <= 0) cart.splice(idx, 1); renderCart(); } 
    };

    const showToast = (msg) => {
        const container = document.getElementById('toast-container');
        const el = document.createElement('div'); el.className = 'toast'; el.textContent = msg; container.appendChild(el);
        requestAnimationFrame(() => el.classList.add('show'));
        setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 300); }, 2000);
    };

    // ===== EVENT LISTENERS =====
    document.getElementById('close-cart-btn').addEventListener('click', () => toggleCart(false));
    cartBackdrop.addEventListener('click', () => toggleCart(false));
    document.getElementById('cart-toggle-btn').addEventListener('click', () => toggleCart(true));
    mobileBar.addEventListener('click', () => toggleCart(true));

    // Cart Tabs Switcher
    document.querySelectorAll('.type-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            document.querySelectorAll('.type-tab').forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            orderType = e.target.dataset.type;
            if (orderType === 'hall') { formHall.classList.remove('hidden'); formTakeaway.classList.add('hidden'); } 
            else { formHall.classList.add('hidden'); formTakeaway.classList.remove('hidden'); }
        });
    });

    // Checkout Form Validator
    document.getElementById('checkout-btn').addEventListener('click', () => {
        if (cart.length === 0) return;
        const tableInput = document.getElementById('table-number');
        const addressInput = document.getElementById('user-address');
        
        if (orderType === 'hall') {
            if (!tableInput.value.trim()) { alert('لطفاً شماره میز خود را وارد کنید.'); tableInput.focus(); return; }
            alert(`سفارش شما برای میز ${tableInput.value} با موفقیت ثبت شد.`);
        } else {
            if (!addressInput.value.trim()) { alert('لطفاً آدرس دقیق خود را وارد کنید.'); addressInput.focus(); return; }
            alert('سفارش بیرون‌بر شما با موفقیت ثبت شد و پیک به‌زودی حرکت خواهد کرد.');
        }
        cart = []; tableInput.value = ''; addressInput.value = ''; renderCart(); toggleCart(false);
    });

    categoryRail.addEventListener('click', (e) => {
        const item = e.target.closest('.story-item');
        if (item) {
            document.querySelectorAll('.story-item').forEach(b => b.classList.remove('active'));
            item.classList.add('active'); currentFilter = item.dataset.filter;
            renderMenu(currentFilter, searchInput.value);
        }
    });

    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });

    document.getElementById('search-toggle-btn').addEventListener('click', () => { searchOverlay.classList.add('active'); searchInput.focus(); });
    document.getElementById('close-search').addEventListener('click', () => { searchOverlay.classList.remove('active'); searchInput.value = ''; renderMenu(currentFilter); });
    searchInput.addEventListener('input', (e) => renderMenu(currentFilter, e.target.value));

    // ===== INIT =====
    renderCategories();
    renderMenu();
    renderCart();
});