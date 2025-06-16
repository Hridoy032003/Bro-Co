let image=document.getElementById("image");
let images = ["./public/pexels-apgpotr-683039.jpg", "./public/pexels-nastyasensei-66707-331107.jpg", "./public/pexels-rachel-claire-5864550.jpg", "./public/pexels-thngocbich-1658112.jpg"];
setInterval(() => {
    let randomIndex = Math.floor(Math.random() * images.length);
    image.src = images[randomIndex];
    
   
}, 1000);
// hamburger


// abouus slider
let imageAbout = document.getElementById("imageAbout");
let imagesAbout = ["./public/pexels-anntarazevich-6035331.jpg", "./public/pexels-cottonbro-4252783.jpg", "./public/pexels-cottonbro-3338535.jpg"];
setInterval(() => {
    let randomIndex = Math.floor(Math.random() * imagesAbout.length);
    imageAbout.src = imagesAbout[randomIndex];
    


}, 1000);

// menu


let iconMenu = document.querySelector(".sider-div ");     
let body = document.querySelector("body");
let closeMenu = document.getElementById("close");
iconMenu.addEventListener("click", () => {
    body.classList.toggle("showCart"); 
    
});
closeMenu.addEventListener("click", () => {
    body.classList.toggle("showCart");
   
});
function close() {
    body.classList.remove("showCart");
}

// food showing section
const addDataToHTML = (listFood) => {
    const foodMenu = document.getElementById('food-menu');
    foodMenu.innerHTML = ""; // clear old content

    listFood.forEach((element, index) => {
        let newElement = document.createElement("div");
        newElement.dataset.id=element.id;
        newElement.classList.add("food-card");
        newElement.innerHTML = `
            <img src="${element.image}" alt="${element.name}">
            <h3>${element.name}</h3>
            <p>${element.description}</p>
            <span>$${element.price}</span>
            <button class="add-to-cart" data-id="${index}">Add to Cart</button>
        `;
        foodMenu.appendChild(newElement);

        // Add event listener to the button
        const addButton = newElement.querySelector(".add-to-cart");
        addButton.addEventListener("click", () => {
            addToCart(element); // Pass the food item to your addToCart function
        });
    });
};

// Example addToCart function
let cart=[]
const addToCart = (item) => {
    console.log("Added to cart:", item);
    let positionInProductInCart = cart.findIndex((value) => value.item.id === item.id);
    if(cart.length<=0){
        cart=[{
            item,
            quantity:1,
            
            

        }]
      
    }else if(positionInProductInCart<0){
        cart.push({
            item,
            quantity:1
        })
    }else{
        cart[positionInProductInCart].quantity=cart[positionInProductInCart].quantity+1;
    }
    console.log(cart)
    addcartToHTML()
  
};
const addcartToHTML = () => {
    const orderContent = document.querySelector('.oder-content');
    orderContent.innerHTML = ""; // clear previous cart content

    if (cart.length > 0) {
        cart.forEach(cartItem => {
            const newCart = document.createElement('div');
            newCart.classList.add('main-container');

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
                        <span>&lt;</span>
                        <span>${cartItem.quantity}</span>
                        <span>&gt;</span>
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
    fetch("./food.json")
        .then(response => response.json())
        .then(data => {
            addDataToHTML(data);
        })
        .catch(error => console.error("Error loading food data:", error));
};

initApp();





 
 


