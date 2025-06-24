let image = document.getElementById("image");
let images = [
  "./public/pexels-apgpotr-683039.jpg",
  "./public/pexels-nastyasensei-66707-331107.jpg",
  "./public/pexels-rachel-claire-5864550.jpg",
  "./public/pexels-thngocbich-1658112.jpg",
];
setInterval(() => {
  let randomIndex = Math.floor(Math.random() * images.length);
  image.src = images[randomIndex];
}, 1000);
// hamburger

// abouus slider
let imageAbout = document.getElementById("imageAbout");
let imagesAbout = [
  "./public/pexels-anntarazevich-6035331.jpg",
  "./public/pexels-cottonbro-4252783.jpg",
  "./public/pexels-cottonbro-3338535.jpg",
];
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
  const foodMenu = document.getElementById("food-menu");
  foodMenu.innerHTML = ""; // clear old content

  listFood.forEach((element, index) => {
    let newElement = document.createElement("div");
    newElement.dataset.id = element.id;
    newElement.classList.add("food-card");
    newElement.innerHTML = `
            <img src="${element.image}" alt="${element.name}">
            <h3>${element.name}</h3>
            
            <span>$${element.price}</span>
               <a href="productDetails.html" class="view-details" data-id="${element.id}">View Details</a>

            <button class="add-to-cart" data-id="${index}">Add to Cart</button>
          
        `;
    foodMenu.appendChild(newElement);
    const viewDetailsLink = newElement.querySelector(".view-details");
    viewDetailsLink.addEventListener("click", () => {
     
      localStorage.setItem("selectedProduct", JSON.stringify(element));
    });
    // Add event listener to the button
    const addButton = newElement.querySelector(".add-to-cart");
    addButton.addEventListener("click", () => {
      addToCart(element); 
    });
  });
};

// Example addToCart function

