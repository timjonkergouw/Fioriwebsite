// Product Loader - Dynamic product page functionality
class ProductLoader {
    constructor() {
        this.products = [];
        this.currentProduct = null;
        this.currentImageIndex = 0;
        this.productImages = [];
        this.init();
    }

    async init() {
        try {
            await this.loadProducts();
            this.loadProductFromURL();
        } catch (error) {
            console.error('Error initializing product loader:', error);
            this.showError();
        }
    }

    async loadProducts() {
        try {
            const response = await fetch('products.json');
            if (!response.ok) {
                throw new Error('Failed to load products');
            }
            const data = await response.json();
            this.products = data.products;
        } catch (error) {
            console.error('Error loading products:', error);
            throw error;
        }
    }

    getProductById(id) {
        return this.products.find(product => product.id === parseInt(id));
    }

    loadProductFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        if (!productId) {
            this.showError('Geen product ID opgegeven');
            return;
        }

        const product = this.getProductById(productId);
        if (!product) {
            this.showError('Product niet gevonden');
            return;
        }

        this.currentProduct = product;
        this.productImages = product.images || [];
        this.currentImageIndex = 0;
        this.displayProduct(product);
    }

    displayProduct(product) {
        // Hide loading state
        document.getElementById('loadingState').style.display = 'none';
        
        // Show product section
        document.getElementById('productSection').style.display = 'block';

        // Update page title
        document.title = `${product.name} - Fiori`;

        // Update product information
        document.getElementById('productTitle').textContent = product.name;
        document.getElementById('productDescription').textContent = product.description;
        document.getElementById('productPrice').textContent = `€${product.price}`;

        // Load images
        this.loadProductImages(product.images);

        // Load product details
        this.loadProductDetails(product.details);

        // Update add to cart button
        this.updateAddToCartButton(product);
    }

    loadProductImages(images) {
        const mainImage = document.getElementById('mainProductImage');
        const thumbnailsContainer = document.getElementById('imageThumbnails');

        if (images && images.length > 0) {
            // Set main image
            mainImage.src = images[0];
            mainImage.alt = this.currentProduct.name;

            // Add click event to main image to open popup
            mainImage.onclick = () => this.openImagePopup(0);

            // Create thumbnails
            thumbnailsContainer.innerHTML = '';
            images.forEach((imageSrc, index) => {
                const thumbnail = document.createElement('img');
                thumbnail.src = imageSrc;
                thumbnail.alt = `${this.currentProduct.name} - Afbeelding ${index + 1}`;
                thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
                thumbnail.onclick = () => {
                    this.changeImage(imageSrc, thumbnail, index);
                    this.openImagePopup(index); // Open popup when thumbnail is clicked
                };
                thumbnailsContainer.appendChild(thumbnail);
            });
        }
    }

    loadProductDetails(details) {
        const detailsList = document.getElementById('productDetailsList');
        detailsList.innerHTML = '';

        if (details) {
            Object.entries(details).forEach(([key, value]) => {
                const listItem = document.createElement('li');
                const label = this.formatDetailLabel(key);
                listItem.innerHTML = `<strong>${label}:</strong> ${value}`;
                detailsList.appendChild(listItem);
            });
        }
    }

    formatDetailLabel(key) {
        const labels = {
            'material': 'Materiaal',
            'fit': 'Pasvorm',
            'care': 'Verzorging',
            'design': 'Design',
            'sustainability': 'Duurzaamheid'
        };
        return labels[key] || key.charAt(0).toUpperCase() + key.slice(1);
    }

    changeImage(imageSrc, clickedThumbnail, index) {
        // Update main image
        document.getElementById('mainProductImage').src = imageSrc;
        
        // Update current image index
        this.currentImageIndex = index;
        
        // Update active thumbnail
        document.querySelectorAll('.thumbnail').forEach(thumb => {
            thumb.classList.remove('active');
        });
        clickedThumbnail.classList.add('active');
        
        // Center the active thumbnail
        this.centerActiveThumbnail(clickedThumbnail);
    }

    centerActiveThumbnail(activeThumbnail) {
        const container = document.getElementById('imageThumbnails');
        const containerWidth = container.offsetWidth;
        const thumbnailWidth = 80; // Width of each thumbnail
        const gap = 16; // Gap between thumbnails (1rem)
        
        // Calculate the position to center the active thumbnail
        const activeIndex = Array.from(container.children).indexOf(activeThumbnail);
        const scrollPosition = (activeIndex * (thumbnailWidth + gap)) - (containerWidth / 2) + (thumbnailWidth / 2);
        
        // Smooth scroll to center the active thumbnail
        container.scrollTo({
            left: Math.max(0, scrollPosition),
            behavior: 'smooth'
        });
    }

    previousImage() {
        if (this.productImages.length > 1) {
            this.currentImageIndex = (this.currentImageIndex - 1 + this.productImages.length) % this.productImages.length;
            this.updateMainImage();
        }
    }

    nextImage() {
        if (this.productImages.length > 1) {
            this.currentImageIndex = (this.currentImageIndex + 1) % this.productImages.length;
            this.updateMainImage();
        }
    }

    updateMainImage() {
        const mainImage = document.getElementById('mainProductImage');
        const newImageSrc = this.productImages[this.currentImageIndex];
        
        mainImage.src = newImageSrc;
        
        // Update active thumbnail
        document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
            thumb.classList.toggle('active', index === this.currentImageIndex);
        });
    }

    updateAddToCartButton(product) {
        const button = document.getElementById('addToCartBtn');
        button.onclick = () => this.addToCart(product);
    }

    addToCart(product) {
        const selectedSizeElement = document.querySelector('.size-option.selected');
        
        if (!selectedSizeElement) {
            alert('Selecteer eerst een maat');
            return;
        }

        const selectedSize = selectedSizeElement.getAttribute('data-size');

        const cartProduct = {
            name: product.name,
            price: product.price,
            size: selectedSize,
            image: product.images[0],
            id: Date.now() // Unique identifier
        };

        // Use the existing cart functionality
        if (typeof cart !== 'undefined') {
            cart.addItem(cartProduct);
        } else {
            // Fallback if cart is not available
            console.log('Product added to cart:', cartProduct);
            alert('Product toegevoegd aan winkelwagen!');
        }
    }

    showError(message = 'Er is een fout opgetreden') {
        document.getElementById('loadingState').style.display = 'none';
        document.getElementById('errorState').style.display = 'flex';
        
        const errorMessage = document.querySelector('.error-state h2');
        if (errorMessage) {
            errorMessage.textContent = message;
        }
    }

    // Image Popup Carousel Methods
    openImagePopup(startIndex = 0) {
        this.currentImageIndex = startIndex;
        this.updatePopupImage();
        this.loadPopupThumbnails();
        document.getElementById('imagePopupOverlay').classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Add keyboard event listeners
        this.addPopupKeyboardListeners();
    }

    closeImagePopup() {
        document.getElementById('imagePopupOverlay').classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        
        // Remove keyboard event listeners
        this.removePopupKeyboardListeners();
    }

    addPopupKeyboardListeners() {
        this.popupKeyHandler = (event) => {
            switch(event.key) {
                case 'Escape':
                    this.closeImagePopup();
                    break;
                case 'ArrowLeft':
                    this.changePopupImage(-1);
                    break;
                case 'ArrowRight':
                    this.changePopupImage(1);
                    break;
            }
        };
        document.addEventListener('keydown', this.popupKeyHandler);
    }

    removePopupKeyboardListeners() {
        if (this.popupKeyHandler) {
            document.removeEventListener('keydown', this.popupKeyHandler);
        }
    }

    changePopupImage(direction) {
        if (this.productImages.length > 1) {
            this.currentImageIndex = (this.currentImageIndex + direction + this.productImages.length) % this.productImages.length;
            this.updatePopupImage();
            this.updatePopupThumbnails();
        }
    }

    updatePopupImage() {
        const popupImage = document.getElementById('popupMainImage');
        const newImageSrc = this.productImages[this.currentImageIndex];
        popupImage.src = newImageSrc;
        popupImage.alt = `${this.currentProduct.name} - Afbeelding ${this.currentImageIndex + 1}`;
    }

    loadPopupThumbnails() {
        const popupThumbnailsContainer = document.getElementById('popupThumbnails');
        popupThumbnailsContainer.innerHTML = '';

        this.productImages.forEach((imageSrc, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = imageSrc;
            thumbnail.alt = `${this.currentProduct.name} - Afbeelding ${index + 1}`;
            thumbnail.className = `popup-thumbnail ${index === this.currentImageIndex ? 'active' : ''}`;
            thumbnail.onclick = () => this.selectPopupImage(index);
            popupThumbnailsContainer.appendChild(thumbnail);
        });
    }

    updatePopupThumbnails() {
        document.querySelectorAll('.popup-thumbnail').forEach((thumb, index) => {
            thumb.classList.toggle('active', index === this.currentImageIndex);
        });
    }

    selectPopupImage(index) {
        this.currentImageIndex = index;
        this.updatePopupImage();
        this.updatePopupThumbnails();
    }
}

// Size selection function (global for onclick handlers)
function selectSize(element, size) {
    // Remove selected class from all size options
    document.querySelectorAll('.size-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    element.classList.add('selected');
}

// Image gallery function (global for onclick handlers)
function changeImage(thumbnail, imageSrc) {
    // Update main image
    document.getElementById('mainProductImage').src = imageSrc;
    
    // Update active thumbnail
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    thumbnail.classList.add('active');
}

// Navigation functions (global for onclick handlers)
function previousImage() {
    if (window.productLoader) {
        window.productLoader.previousImage();
    }
}

function nextImage() {
    if (window.productLoader) {
        window.productLoader.nextImage();
    }
}

// Global functions for cart functionality
function addToCart() {
    const selectedSizeElement = document.querySelector('.size-option.selected');
    
    if (!selectedSizeElement) {
        alert('Selecteer eerst een maat');
        return;
    }
    
    const selectedSize = selectedSizeElement.dataset.size;
    const productId = new URLSearchParams(window.location.search).get('id');
    
    // Get product data
    const productTitle = document.getElementById('productTitle').textContent;
    const productPrice = document.getElementById('productPrice').textContent;
    const productImage = document.getElementById('mainProductImage').src;
    
    // Add to cart (this function should be defined in cart.js)
    if (typeof addItemToCart === 'function') {
        addItemToCart({
            id: productId,
            name: productTitle,
            price: productPrice,
            size: selectedSize,
            image: productImage
        });
    }
}

// Global functions for image popup carousel
function closeImagePopup() {
    if (window.productLoader) {
        window.productLoader.closeImagePopup();
    }
}

function closeImagePopupOnOverlayClick(event) {
    // Only close if clicking on the overlay itself, not on the content
    if (event.target.id === 'imagePopupOverlay') {
        closeImagePopup();
    }
}

function changePopupImage(direction) {
    if (window.productLoader) {
        window.productLoader.changePopupImage(direction);
    }
}

// Initialize product loader when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.productLoader = new ProductLoader();
}); 