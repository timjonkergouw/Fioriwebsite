// Hamburger Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const sideMenu = document.querySelector('.side-menu');
    
    console.log('=== HAMBURGER MENU DEBUG ===');
    console.log('Hamburger menu script loaded');
    console.log('Hamburger element:', hamburger);
    console.log('Side menu element:', sideMenu);
    console.log('Hamburger display style:', hamburger ? getComputedStyle(hamburger).display : 'null');
    console.log('Side menu left position:', sideMenu ? getComputedStyle(sideMenu).left : 'null');
    
    if (hamburger && sideMenu) {
        // Force hamburger to be visible
        hamburger.style.display = 'flex';
        hamburger.style.flexDirection = 'column';
        hamburger.style.justifyContent = 'space-between';
        
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('=== HAMBURGER CLICKED ===');
            
            const wasActive = sideMenu.classList.contains('active');
            sideMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            console.log('Menu was active:', wasActive);
            console.log('Menu is now active:', sideMenu.classList.contains('active'));
            console.log('Hamburger is now active:', hamburger.classList.contains('active'));
            console.log('Side menu left position:', getComputedStyle(sideMenu).left);
        });
        
        // Close when clicking outside
        document.addEventListener('click', function(e) {
            if (sideMenu.classList.contains('active') && 
                !sideMenu.contains(e.target) && 
                !hamburger.contains(e.target)) {
                console.log('=== CLOSING MENU - CLICKED OUTSIDE ===');
                sideMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
        
        // Prevent menu from closing when clicking inside
        sideMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('=== CLICKED INSIDE MENU ===');
        });
        
        console.log('Event listeners attached successfully');
    } else {
        console.error('=== ERROR: Hamburger menu or side menu not found ===');
        console.error('Hamburger:', hamburger);
        console.error('Side menu:', sideMenu);
    }
});

// Toggle clothing submenu
function toggleClothingMenu() {
    const submenu = document.getElementById('clothingSubmenu');
    const arrow = document.getElementById('clothingArrow');
    const header = document.querySelector('.menu-section-header');
    
    if (submenu && arrow && header) {
        submenu.classList.toggle('active');
        arrow.classList.toggle('active');
        header.classList.toggle('active');
    }
}

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        if (email) {
            // Here you would typically send the email to your backend
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        }
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('.side-menu a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            const sideMenu = document.querySelector('.side-menu');
            if (sideMenu) {
                sideMenu.classList.remove('active');
            }
            document.body.style.overflow = '';
        }
    });
});

// --- 5-slot Sliding Carousel (images move through slots) ---
const carousel = document.querySelector('.carousel');
const slots = Array.from(document.querySelectorAll('.carousel-item'));
const leftArrow = document.querySelector('.carousel-arrow.left');
const rightArrow = document.querySelector('.carousel-arrow.right');

// List of all images with their corresponding product IDs (add more if needed)
const images = [
    { src: 'images/Bloem shirt met vrouw model.png', alt: 'New Item 1', productId: 1 },
    { src: 'images/Fiori ai gaarde met model.png', alt: 'New Item 2', productId: 2 },
    { src: 'images/Fiori fruit met model.png', alt: 'New Item 3', productId: 3 },
    { src: 'images/Fiori huis met model.png', alt: 'New Item 4', productId: 4 },
    { src: 'images/Fiori papegaai shirt.png', alt: 'New Item 5', productId: 5 },
    { src: 'images/Vaas shirt met model 2.png', alt: 'New Item 6', productId: 6 }
];

let startIndex = 0; // Index of the image in the first slot

function updateCarousel() {
    // Remove all position classes
    slots.forEach(slot => {
        slot.classList.remove('far-left', 'left', 'center', 'right', 'far-right');
    });
    // Assign images and classes
    for (let i = 0; i < 5; i++) {
        const imgIndex = (startIndex + i) % images.length;
        const slot = slots[i];
        const img = slot.querySelector('img');
        const link = slot.querySelector('a');
        
        // Update image
        img.src = images[imgIndex].src;
        img.alt = images[imgIndex].alt;
        
        // Update link
        link.href = `product.html?id=${images[imgIndex].productId}`;
        
        if (i === 0) slot.classList.add('far-left');
        else if (i === 1) slot.classList.add('left');
        else if (i === 2) slot.classList.add('center');
        else if (i === 3) slot.classList.add('right');
        else if (i === 4) slot.classList.add('far-right');
    }
}

function goLeft() {
    startIndex = (startIndex - 1 + images.length) % images.length;
    updateCarousel();
}

function goRight() {
    startIndex = (startIndex + 1) % images.length;
    updateCarousel();
}

if (leftArrow && rightArrow) {
    leftArrow.addEventListener('click', goLeft);
    rightArrow.addEventListener('click', goRight);
}

// Initialize
if (carousel) {
    updateCarousel();
}

// Product Data and Filtering Functionality
const products = [
    {
        id: 1,
        name: "Bloem Shirt",
        price: 40,
        category: "tshirt",
        image: "images/Bloem shirt met vrouw model.png"
    },
    {
        id: 2,
        name: "AI Garden Shirt",
        price: 40,
        category: "tshirt",
        image: "images/Fiori ai gaarde met model.png"
    },
    {
        id: 3,
        name: "Fruit Shirt",
        price: 40,
        category: "tshirt",
        image: "images/Fiori fruit met model.png"
    },
    {
        id: 4,
        name: "House Shirt",
        price: 40,
        category: "tshirt",
        image: "images/Fiori huis met model.png"
    },
    {
        id: 5,
        name: "Parrot Shirt",
        price: 40,
        category: "tshirt",
        image: "images/Fiori papegaai shirt.png"
    },
    {
        id: 6,
        name: "Vase Shirt",
        price: 40,
        category: "tshirt",
        image: "images/Vaas shirt met model 2.png"
    }
];

// Initialize product filtering if on products page
function initializeProductFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productGrid = document.querySelector('.product-grid');
    
    if (!filterButtons.length || !productGrid) return;
    
    // Add click event to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get category from button
            const category = button.getAttribute('data-category');
            
            // Render products for this category
            renderProducts(category);
        });
    });
    
    // Initial render (show all products)
    renderProducts('all');
}

function renderProducts(category) {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;
    
    // Clear current products
    productGrid.innerHTML = '';
    
    // Filter products based on category
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    // Render filtered products
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <a href="product.html?id=${product.id}" class="product-link">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">€${product.price}</div>
                </div>
            </a>
        `;
        productGrid.appendChild(productCard);
    });
}

// Initialize if on products page
if (document.querySelector('.product-filters')) {
    initializeProductFiltering();
} 