// داده‌های محصولات - با تصاویر واقعی
const products = [
    {
        id: 1,
        name: "آیفون 14 پرو",
        brand: "apple",
        image: "https://www.digikala.com/mag/wp-content/uploads/2022/09/Untitled-4-2.jpg",
        oldPrice: 70000000,
        features: ["256GB حافظه", "دوربین 48MP", "پردازنده A16", "باتری 3200mAh"],
        badge: "جدید"
    },
    {
        id: 2,
        name: "سامسونگ گلکسی S23 اولترا",
        brand: "samsung",
        image: "https://digiato.com/wp-content/uploads/2023/01/ff702630-9375-11ed-b74d-f8057fb78cf4.jpg",
        price: 55000000,
        oldPrice: 60000000,
        features: ["512GB حافظه", "دوربین 200MP", "قلم S Pen", "شارژ 45W"],
        badge: "پرفروش"
    },
    {
        id: 3,
        name: "شیائومی 13 پرو",
        brand: "شیائمی",
        image: "https://cdn.dxomark.com/wp-content/uploads/medias/post-139229/Xiaomi-13-Pro_featured-image-packshot-review-Recovered-1024x691.jpg",
        price: 32000000,
        oldPrice: 38000000,
        features: ["256GB حافظه", "دوربین 50MP", "شارژ 120W", "صفحه‌نمایش 120Hz"],
        badge: "تخفیف"
    },
    {
        id: 4,
        name: "هوآوی P60 پرو",
        brand: "huawei",
        image: "https://tse1.mm.bing.net/th/id/OIP.EmwbeY9ANk8VgUeg9UIjHQHaHa?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        price: 42000000,
        oldPrice: 48000000,
        features: ["512GB حافظه", "دوربین XMAGE", "شارژ وایرلس", "آی‌پی 68"],
        badge: "جدید"
    },
    {
        id: 5,
        name: "وان پلاس 11",
        brand: "oneplus",
        image: "https://tse2.mm.bing.net/th/id/OIP.s7_YKGdVsoLH84VFia8fVwHaE8?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        price: 35000000,
        oldPrice: 40000000,
        features: ["256GB حافظه", "دوربین Hasselblad", "شارژ 100W", "صفحه‌نمایش 120Hz"],
        badge: "اقتصادی"
    },
    {
        id: 6,
        name: "نوکیا X30",
        brand: "nokia",
        image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        price: 18000000,
        oldPrice: 22000000,
        features: ["128GB حافظه", "دوربین 50MP", "باتری 5000mAh", "آی‌پی 67"],
        badge: "اقتصادی"
    },
    {
        id: 7,
        name: "سامسونگ Z فلپ 5",
        brand: "samsung",
        image: "https://images.unsplash.com/photo-1592910147773-70f6a30d1c78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        price: 48000000,
        oldPrice: 55000000,
        features: ["256GB حافظه", "صفحه‌نمایش تاشو", "شارژ سریع", "طراحی جمع‌وجور"],
        badge: "تخفیف"
    },
    {
        id: 8,
        name: "آیفون SE 2023",
        brand: "apple",
        image: "https://tse1.mm.bing.net/th/id/OIP.2wZslDH-fbkcTqqtPbEI0QHaHa?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
        price: 28000000,
        oldPrice: 32000000,
        features: ["128GB حافظه", "پردازنده A15", "دوربین 12MP", "طراحی کلاسیک"],
        badge: "اقتصادی"
    }
];

// متغیرهای گلوبال
let cart = [];
let currentFilter = 'all';

// المنت‌های DOM
const productsGrid = document.querySelector('.products-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const backToTopBtn = document.querySelector('.back-to-top');
const contactForm = document.getElementById('contactForm');
const cartCountElements = document.querySelectorAll('.cart-count');

// مقداردهی اولیه
function init() {
    loadProducts();
    setupEventListeners();
    updateCartCount();
}

// بارگذاری محصولات
function loadProducts() {
    productsGrid.innerHTML = '';
    
    const filteredProducts = products.filter(product => {
        if (currentFilter === 'all') return true;
        return product.brand === currentFilter;
    });
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// ایجاد کارت محصول
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.brand = product.brand;
    
    card.innerHTML = `
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
        <div class="product-info">
            <div class="product-brand">${getBrandName(product.brand)}</div>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-price">
                <span class="price-current">${formatPrice(product.price)} تومان</span>
                ${product.oldPrice ? `<span class="price-old">${formatPrice(product.oldPrice)} تومان</span>` : ''}
            </div>
            <ul class="product-features">
                ${product.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
            </ul>
            <div class="product-actions">
                <button class="btn-add-cart" data-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i>
                    افزودن به سبد
                </button>
                <button class="btn-view" data-id="${product.id}">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
        </div>
    `;
    
    // اضافه کردن event listener به دکمه‌ها
    const addToCartBtn = card.querySelector('.btn-add-cart');
    const viewBtn = card.querySelector('.btn-view');
    
    addToCartBtn.addEventListener('click', () => addToCart(product.id));
    viewBtn.addEventListener('click', () => viewProduct(product.id));
    
    return card;
}

// گرفتن نام فارسی برند
function getBrandName(brand) {
    const brands = {
        'apple': 'اپل',
        'samsung': 'سامسونگ',
        'xiaomi': 'شیائومی',
        'huawei': 'هوآوی',
        'oneplus': 'وان پلاس',
        'nokia': 'نوکیا'
    };
    return brands[brand] || brand;
}

// فرمت قیمت
function formatPrice(price) {
    return new Intl.NumberFormat('fa-IR').format(price);
}

// اضافه کردن به سبد خرید
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    cart.push(product);
    updateCartCount();
    
    // نمایش نوتیفیکیشن
    showNotification(`"${product.name}" به سبد خرید اضافه شد`, 'success');
    
    // انیمیشن دکمه
    const button = document.querySelector(`.btn-add-cart[data-id="${productId}"]`);
    button.innerHTML = '<i class="fas fa-check"></i> اضافه شد';
    button.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
    
    setTimeout(() => {
        button.innerHTML = '<i class="fas fa-shopping-cart"></i> افزودن به سبد';
        button.style.background = '';
    }, 2000);
}

// مشاهده محصول
function viewProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    showNotification(`مشاهده محصول: ${product.name}`, 'info');
}

// آپدیت تعداد سبد خرید
function updateCartCount() {
    cartCountElements.forEach(element => {
        element.textContent = cart.length;
    });
}

// فیلتر محصولات
function setupFilterButtons() {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // حذف کلاس active از همه دکمه‌ها
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // اضافه کردن کلاس active به دکمه کلیک‌شده
            button.classList.add('active');
            
            // اعمال فیلتر
            currentFilter = button.dataset.filter;
            loadProducts();
        });
    });
}

// نمایش نوتیفیکیشن
function showNotification(message, type = 'info') {
    // ایجاد عنصر نوتیفیکیشن
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // استایل‌های نوتیفیکیشن
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius);
        box-shadow: var(--shadow-lg);
        z-index: 1001;
        font-weight: 600;
        animation: slideInRight 0.3s ease;
        max-width: 350px;
    `;
    
    // اضافه کردن انیمیشن
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // اضافه کردن به صفحه
    document.body.appendChild(notification);
    
    // حذف خودکار بعد از 3 ثانیه
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// تنظیم event listenerها
function setupEventListeners() {
    // منوی موبایل
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // بستن منو هنگام کلیک روی لینک
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // دکمه بازگشت به بالا
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // فیلتر محصولات
    setupFilterButtons();
    
    // فرم تماس
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        
        // اعتبارسنجی ساده
        if (!name || !email || !message) {
            showNotification('لطفاً فیلدهای ضروری را پر کنید', 'error');
            return;
        }
        
        // در واقعیت، این اطلاعات به سرور ارسال می‌شود
        console.log('فرم ارسال شد:', { name, email, phone, message });
        
        showNotification('پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.', 'success');
        
        // ریست فرم
        contactForm.reset();
    });
    
    // فرم عضویت در خبرنامه
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (!email) {
                showNotification('لطفاً ایمیل خود را وارد کنید', 'error');
                return;
            }
            
            showNotification('با موفقیت در خبرنامه عضو شدید!', 'success');
            this.reset();
        });
    }
}

// مقداردهی اولیه هنگام لود صفحه
document.addEventListener('DOMContentLoaded', init);