document.addEventListener('DOMContentLoaded', function() {
    // Ensure the elements are available
    const orderModal = document.getElementById('orderModal');
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    const closeModalBtn = document.querySelector('.close-modal');
    const placeOrderBtn = document.querySelector('.place-order-btn');
    const cancelOrderBtn = document.querySelector('.cancel-order-btn');
    
    // Check if the necessary elements are found
    if (orderModal && modalCloseBtn && closeModalBtn && placeOrderBtn && cancelOrderBtn) {

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

        placeOrderBtn.addEventListener('click', function() {
            const orderItems = document.querySelectorAll('.oder-content .main-container');
            if (orderItems.length === 0) {
                alert('Your cart is empty. Please add items before ordering.');
                return;
            }

            showOrderSuccess();
            console.log('Order placed successfully!');
        });

        cancelOrderBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to cancel your order?')) {
                document.querySelector('.oder-content').innerHTML = '';
            }
        });
    } else {
        console.error('One or more necessary elements are missing in the HTML.');
    }
});

// ADD TO CART FUNCTIONS
let cart = [];

const addToCart = (item) => {
    console.log("Added to cart:", item);

    let positionInProductInCart = cart.findIndex(
        (value) => value.item.id === item.id
    );

    if (cart.length <= 0) {
        cart = [
            {
                item,
                quantity: 1,
            },
        ];
    } else if (positionInProductInCart < 0) {
        cart.push({
            item,
            quantity: 1,
        });
    } else {
        cart[positionInProductInCart].quantity =
            cart[positionInProductInCart].quantity + 1;
    }

    console.log(cart);
    updateCartIcon();
    addcartToHTML();
};

const removeItemFromCart = (productId) => {
    cart = cart.filter(item => item.item.id !== productId);
    updateCartIcon();
    addcartToHTML();
};

const increaseItemQuantity = (productId) => {
    const item = cart.find(item => item.item.id === productId);
    if (item) {
        item.quantity++;
        updateCartIcon();
        addcartToHTML();
    }
};

const decreaseItemQuantity = (productId) => {
    const item = cart.find(item => item.item.id === productId);
    if (item && item.quantity > 1) {
        item.quantity--;
        updateCartIcon();
        addcartToHTML();
    }
};

const updateCartIcon = () => {
    const totalQuantity = cart.reduce((total, product) => total + product.quantity, 0);
    const cartIcon = document.getElementById('icon-tg');
    if (cartIcon) {
        cartIcon.textContent = totalQuantity;
    }
};

const addcartToHTML = () => {
    const orderContent = document.querySelector(".oder-content");
    orderContent.innerHTML = "";
    if (cart.length > 0) {
        cart.forEach((cartItem) => {
            const newCart = document.createElement("div");
            newCart.classList.add("main-container");

            newCart.innerHTML = `
                <div class="item-image">
                    <img src="${cartItem.item.image}" alt="${cartItem.item.name}">
                </div>
                <div class="item-content">
                    <div class="item-name">${cartItem.item.name}</div>
                    <div class="item-pricing">
                        $${cartItem.item.price}
                    </div>
                    <div class="item-qunity">
                        <button class='decrease-btn' onclick="decreaseItemQuantity(${cartItem.item.id})"><</button>
                        <span>${cartItem.quantity}</span>
                        <button class='increase-btn' onclick="increaseItemQuantity(${cartItem.item.id})">></button>
                        <button class='remove-btn' onclick="removeItemFromCart(${cartItem.item.id})">Remove</button>
                    </div>
                </div>
            `;

            orderContent.appendChild(newCart);
        });
    } else {
        orderContent.innerHTML = "<p>Your cart is empty.</p>";
    }
};

const initApp = () => {
    fetch("./JsonData/food.json")
        .then((response) => response.json())
        .then((data) => {
            addDataToHTML(data);
         
        })
        .catch((error) => console.error("Error loading food data:", error));
};

initApp();
