document.addEventListener('DOMContentLoaded', function() {
    // Order Modal Elements
    const orderModal = document.getElementById('orderModal');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    const closeModalBtn = document.querySelector('.close-modal');
    const placeOrderBtn = document.querySelector('.place-order-btn');
    const cancelOrderBtn = document.querySelector('.cancel-order-btn');
    
    function showOrderSuccess() {
        orderModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
  
    function closeOrderModal() {
        orderModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Event Listeners
    closeModalBtn.addEventListener('click', closeOrderModal);
    modalCloseBtn.addEventListener('click', closeOrderModal);
    
   
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
        updateCartCount();  
        // In a real app, you would send the order to your server here
        console.log('Order placed successfully!');
        
    
    });
 
    cancelOrderBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to cancel your order?')) {
            document.querySelector('.oder-content').innerHTML = '';
            updateCartCount();
        }
    });
    
    
});



const removeItemFromCart = (productId) => {
    cart = cart.filter(item => item.item.id !== productId);
    addcartToHTML();
    updateCartCount(); 
};

