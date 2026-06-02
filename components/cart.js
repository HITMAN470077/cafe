// فایل: components/cart.js
// این فایل سبد خرید را به صورت یک کامپوننت مستقل به سایت اضافه می‌کند
const injectCartComponent = () => {
    const cartHTML = `
        <div id="cart-backdrop" class="cart-backdrop"></div>
        <aside id="cart-panel" class="cart-panel">
            <div class="cart-bg-anim"></div>
            
            <div class="cart-header">
                <h3>صورت‌حساب شما</h3>
                <button id="close-cart-btn" class="close-cart-btn">&times;</button>
            </div>
            
            <div class="order-type-tabs">
                <button class="type-tab active" data-type="hall">میل در سالن</button>
                <button class="type-tab" data-type="takeaway">بیرون‌بر</button>
            </div>

            <div id="cart-items-area" class="cart-body"></div>
            
            <div class="cart-details-form">
                <div id="form-hall" class="form-group">
                    <label for="table-number">شماره میز شما:</label>
                    <input type="number" id="table-number" placeholder="مثلاً: ۵" min="1">
                </div>
                <div id="form-takeaway" class="form-group hidden">
                    <label for="user-address">آدرس دقیق جهت ارسال:</label>
                    <textarea id="user-address" rows="2" placeholder="خیابان، کوچه، پلاک، واحد..."></textarea>
                </div>
            </div>

            <div class="cart-footer">
                <div class="bill-row">
                    <span>جمع کل اقلام</span>
                    <span id="cart-total-price" class="total-price">0 تومان</span>
                </div>
                <button id="checkout-btn" class="checkout-btn">ثبت و ارسال سفارش</button>
            </div>
        </aside>
    `;
    
    // کدهای سبد خرید را دقیقاً درون تگ جایگزین در فایل اصلی قرار می‌دهد
    document.getElementById('cart-component-placeholder').innerHTML = cartHTML;
};