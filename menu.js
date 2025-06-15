document.addEventListener('DOMContentLoaded', function() {
    // Order Modal Elements
    const orderModal = document.getElementById('orderModal');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    const closeModalBtn = document.querySelector('.close-modal');
    const placeOrderBtn = document.querySelector('.place-order-btn');
    const cancelOrderBtn = document.querySelector('.cancel-order-btn');
    
    // Show Order Success Modal
    function showOrderSuccess() {
        orderModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    // Close Order Modal
    function closeOrderModal() {
        orderModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Event Listeners
    closeModalBtn.addEventListener('click', closeOrderModal);
    modalCloseBtn.addEventListener('click', closeOrderModal);
    
    // Close modal when clicking outside
    orderModal.addEventListener('click', function(e) {
        if (e.target === orderModal) {
            closeOrderModal();
        }
    });
    
    // Place Order Button
    placeOrderBtn.addEventListener('click', function() {
        // Check if cart is empty
        const orderItems = document.querySelectorAll('.oder-content .main-container');
        if (orderItems.length === 0) {
            alert('Your cart is empty. Please add items before ordering.');
            return;
        }
        
        // Show success message
        showOrderSuccess();
        
        // In a real app, you would send the order to your server here
        console.log('Order placed successfully!');
        
        // Clear the cart (optional)
        // document.querySelector('.oder-content').innerHTML = '';
        // updateCartCount();
    });
    
    // Cancel Order Button
    cancelOrderBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to cancel your order?')) {
            document.querySelector('.oder-content').innerHTML = '';
            updateCartCount();
        }
    });
    
    // Update cart count in header
    function updateCartCount() {
        const cartItems = document.querySelectorAll('.oder-content .main-container');
        document.querySelector('.round').textContent = cartItems.length;
    }
});
// Function to update cart count in header
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector('.round').textContent = totalItems;
}

// Modify your existing addToCart function to include the count update
const addToCart = (item) => {
    let positionInProductInCart = cart.findIndex((value) => value.item.id === item.id);
    
    if (cart.length <= 0) {
        cart = [{
            item,
            quantity: 1
        }];
    } else if (positionInProductInCart < 0) {
        cart.push({
            item,
            quantity: 1
        });
    } else {
        cart[positionInProductInCart].quantity += 1;
    }
    
    addcartToHTML();
    updateCartCount(); // Add this line to update the cart icon
};

// Also update these functions to maintain count accuracy:
const removeItemFromCart = (productId) => {
    cart = cart.filter(item => item.item.id !== productId);
    addcartToHTML();
    updateCartCount(); // Update count when removing items
};

const changeQuantity = (productId, change) => {
    let positionInProductInCart = cart.findIndex(value => value.item.id === productId);
    
    if (positionInProductInCart >= 0) {
        switch (change) {
            case 'increase':
                cart[positionInProductInCart].quantity += 1;
                break;
            case 'decrease':
                if (cart[positionInProductInCart].quantity > 1) {
                    cart[positionInProductInCart].quantity -= 1;
                } else {
                    cart.splice(positionInProductInCart, 1);
                }
                break;
            default:
                break;
        }
    }
    
    addcartToHTML();
    updateCartCount(); // Update count when changing quantities
};