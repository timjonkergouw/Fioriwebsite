// Hamburger Menu Functionality
const hamburger = document.querySelector('.hamburger-menu');
const sideMenu = document.querySelector('.side-menu');
let isMenuOpen = false;

hamburger.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    hamburger.classList.toggle('active');
    sideMenu.classList.toggle('active');
    
    // Animate menu items
    const menuItems = sideMenu.querySelectorAll('li');
    menuItems.forEach((item, index) => {
        if (isMenuOpen) {
            item.style.animation = `slideIn 0.3s ease forwards ${index * 0.1}s`;
        } else {
            item.style.animation = 'none';
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (isMenuOpen && !sideMenu.contains(e.target) && !hamburger.contains(e.target)) {
        isMenuOpen = false;
        hamburger.classList.remove('active');
        sideMenu.classList.remove('active');
        
        // Reset animations
        const menuItems = sideMenu.querySelectorAll('li');
        menuItems.forEach(item => {
            item.style.animation = 'none';
        });
    }
});

// Close menu when clicking a link
const menuLinks = sideMenu.querySelectorAll('a');
menuLinks.forEach(link => {
    link.addEventListener('click', () => {
        isMenuOpen = false;
        hamburger.classList.remove('active');
        sideMenu.classList.remove('active');
        
        // Reset animations
        const menuItems = sideMenu.querySelectorAll('li');
        menuItems.forEach(item => {
            item.style.animation = 'none';
        });
    });
});

// Close menu with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen) {
        isMenuOpen = false;
        hamburger.classList.remove('active');
        sideMenu.classList.remove('active');
        
        // Reset animations
        const menuItems = sideMenu.querySelectorAll('li');
        menuItems.forEach(item => {
            item.style.animation = 'none';
        });
    }
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    if (email) {
        // Here you would typically send the email to your backend
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('.side-menu a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            sideMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// --- 5-slot Sliding Carousel (images move through slots) ---
const carousel = document.querySelector('.carousel');
const slots = Array.from(document.querySelectorAll('.carousel-item'));
const leftArrow = document.querySelector('.carousel-arrow.left');
const rightArrow = document.querySelector('.carousel-arrow.right');

// List of all images (add more if needed)
const images = [
    { src: 'images/Bloem shirt met vrouw model.png', alt: 'New Item 1' },
    { src: 'images/Fiori ai gaarde met model.png', alt: 'New Item 2' },
    { src: 'images/Fiori fruit met model.png', alt: 'New Item 3' },
    { src: 'images/Fiori huis met model.png', alt: 'New Item 4' },
    { src: 'images/Fiori papegaai shirt.png', alt: 'New Item 5' },
    { src: 'images/Vaas shirt met model 2.png', alt: 'New Item 6' }
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
        img.src = images[imgIndex].src;
        img.alt = images[imgIndex].alt;
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

leftArrow.addEventListener('click', goLeft);
rightArrow.addEventListener('click', goRight);

// Initialize
updateCarousel();

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

// Product filtering functionality
function initializeProductFiltering() {
    console.log('Starting product filtering initialization...');
    
    const productGrid = document.getElementById('productGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    console.log('Product grid found:', productGrid);
    console.log('Filter buttons found:', filterButtons.length);
    
    if (!productGrid) {
        console.log('Product grid not found');
        return; // Only run on products page
    }
    
    if (filterButtons.length === 0) {
        console.log('No filter buttons found');
        return;
    }
    
    console.log('Product grid found, initializing filtering...');
    
    let currentCategory = 'all';
    
    // Add data-category attribute to existing static cards
    const existingCards = productGrid.querySelectorAll('.product-card');
    console.log('Found existing cards:', existingCards.length);
    
    existingCards.forEach((card, index) => {
        card.setAttribute('data-category', 'tshirt');
        console.log(`Card ${index + 1} assigned category: tshirt`);
    });
    
    function renderProducts(category) {
        console.log('Rendering products for category:', category);
        
        const allCards = productGrid.querySelectorAll('.product-card');
        console.log('Total cards to filter:', allCards.length);
        
        allCards.forEach((card, index) => {
            const cardCategory = card.getAttribute('data-category');
            console.log(`Card ${index + 1} category: ${cardCategory}`);
            
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
                console.log(`Card ${index + 1} shown`);
            } else {
                card.style.display = 'none';
                console.log(`Card ${index + 1} hidden`);
            }
        });
    }
    
    // Add click event listeners to filter buttons
    filterButtons.forEach((button, index) => {
        console.log(`Adding click listener to button ${index + 1}:`, button.getAttribute('data-category'));
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const category = button.getAttribute('data-category');
            console.log('Filter button clicked:', category);
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get category and render products
            currentCategory = category;
            renderProducts(category);
        });
    });
    
    // Initialize with all products visible
    console.log('Initializing product filtering...');
    renderProducts('all');
}

// Initialize product filtering when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing product filtering...');
    initializeProductFiltering();
});

// Also try to initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
    console.log('DOM still loading...');
} else {
    console.log('DOM already loaded, initializing immediately...');
    initializeProductFiltering();
} 