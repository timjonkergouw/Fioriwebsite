// Shopping Cart Functionality
class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cartItems')) || [];
        this.updateCartCount();
        this.updateCartDisplay();
    }

    addItem(product) {
        this.items.push(product);
        this.saveToStorage();
        this.updateCartCount();
        this.updateCartDisplay();
        this.showSuccessMessage();
        this.animateCartIcon();
    }

    removeItem(index) {
        this.items.splice(index, 1);
        this.saveToStorage();
        this.updateCartCount();
        this.updateCartDisplay();
    }

    getItems() {
        return this.items;
    }

    getCount() {
        return this.items.length;
    }

    getTotal() {
        return this.items.reduce((total, item) => total + item.price, 0);
    }

    clear() {
        this.items = [];
        this.saveToStorage();
        this.updateCartCount();
        this.updateCartDisplay();
    }

    saveToStorage() {
        localStorage.setItem('cartItems', JSON.stringify(this.items));
    }

    updateCartCount() {
        const cartCountElements = document.querySelectorAll('.cart-count');
        cartCountElements.forEach(element => {
            element.textContent = this.getCount();
        });
    }

    updateCartDisplay() {
        const cartItemsContainer = document.getElementById('cartItems');
        const cartTotalElement = document.getElementById('cartTotal');
        const checkoutBtn = document.getElementById('checkoutBtn');

        if (!cartItemsContainer) return;

        if (this.items.length === 0) {
            cartItemsContainer.innerHTML = '<div class="cart-empty">Je winkelwagen is leeg</div>';
            if (checkoutBtn) checkoutBtn.disabled = true;
        } else {
            cartItemsContainer.innerHTML = this.items.map((item, index) => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-details">Maat: ${item.size}</div>
                    </div>
                    <div class="cart-item-price">€${item.price}</div>
                    <button class="cart-item-remove" onclick="cart.removeItem(${index})">&times;</button>
                </div>
            `).join('');
            
            if (checkoutBtn) checkoutBtn.disabled = false;
        }

        if (cartTotalElement) {
            cartTotalElement.textContent = `€${this.getTotal()}`;
        }
    }

    showSuccessMessage() {
        const button = document.querySelector('.add-to-cart-btn');
        if (button) {
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i> Toegevoegd!';
            button.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.backgroundColor = '';
            }, 2000);
        }
    }

    animateCartIcon() {
        const cartCountElements = document.querySelectorAll('.cart-count');
        cartCountElements.forEach(element => {
            element.style.animation = 'none';
            element.offsetHeight; // Trigger reflow
            element.style.animation = 'cartPulse 0.6s ease-in-out';
        });
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Global add to cart function
function addToCart(productName, productPrice, productImage) {
    const selectedSizeElement = document.querySelector('.size-option.selected');
    
    if (!selectedSizeElement) {
        alert('Selecteer eerst een maat');
        return;
    }

    const selectedSize = selectedSizeElement.getAttribute('data-size');

    const product = {
        name: productName,
        price: productPrice,
        size: selectedSize,
        image: productImage,
        id: Date.now() // Unique identifier
    };

    cart.addItem(product);
}

// Size selection function
function selectSize(element, size) {
    // Remove selected class from all size options
    document.querySelectorAll('.size-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    element.classList.add('selected');
}

// Cart overlay functions
function openCart() {
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartOverlay) {
        cartOverlay.classList.add('active');
        cart.updateCartDisplay();
    }
}

function closeCart() {
    const cartOverlay = document.getElementById('cartOverlay');
    if (cartOverlay) {
        cartOverlay.classList.remove('active');
    }
}

// Payment form functions
function openPaymentForm() {
    const paymentOverlay = document.getElementById('paymentOverlay');
    if (paymentOverlay) {
        paymentOverlay.classList.add('active');
    }
}

function closePaymentForm() {
    const paymentOverlay = document.getElementById('paymentOverlay');
    if (paymentOverlay) {
        paymentOverlay.classList.remove('active');
    }
}

function processPayment(event) {
    event.preventDefault();
    
    // Simulate payment processing
    const payBtn = event.target.querySelector('.pay-btn');
    const originalText = payBtn.textContent;
    payBtn.textContent = 'Verwerken...';
    payBtn.disabled = true;
    
    setTimeout(() => {
        // Show success message
        const form = document.getElementById('paymentForm');
        form.innerHTML = `
            <div class="payment-success">
                <i class="fas fa-check-circle"></i>
                <h3>Betaling succesvol!</h3>
                <p>Je bestelling is bevestigd. Je ontvangt een bevestigingsmail.</p>
            </div>
        `;
        
        // Clear cart after successful payment
        setTimeout(() => {
            cart.clear();
            closePaymentForm();
            closeCart();
            
            // Reset form
            setTimeout(() => {
                form.innerHTML = `
                    <div class="form-group">
                        <label for="cardName">Naam op kaart</label>
                        <input type="text" id="cardName" required>
                    </div>
                    <div class="form-group">
                        <label for="cardNumber">Kaartnummer</label>
                        <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" required>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="expiryDate">Vervaldatum</label>
                            <input type="text" id="expiryDate" placeholder="MM/YY" required>
                        </div>
                        <div class="form-group">
                            <label for="cvv">CVV</label>
                            <input type="text" id="cvv" placeholder="123" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="email">E-mailadres</label>
                        <input type="email" id="email" required>
                    </div>
                    <button type="submit" class="pay-btn">Betalen</button>
                `;
            }, 2000);
        }, 2000);
    }, 2000);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Cart icon click handler
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', openCart);
    }

    // Side menu functionality
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const sideMenu = document.querySelector('.side-menu');
    
    if (hamburgerMenu && sideMenu) {
        hamburgerMenu.addEventListener('click', function() {
            sideMenu.classList.toggle('active');
        });
    }

    // Close overlays when clicking outside
    document.addEventListener('click', function(event) {
        const cartOverlay = document.getElementById('cartOverlay');
        const paymentOverlay = document.getElementById('paymentOverlay');
        
        if (cartOverlay && event.target === cartOverlay) {
            closeCart();
        }
        
        if (paymentOverlay && event.target === paymentOverlay) {
            closePaymentForm();
        }
    });

    // Close overlays with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeCart();
            closePaymentForm();
        }
    });
}); 