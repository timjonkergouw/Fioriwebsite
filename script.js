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