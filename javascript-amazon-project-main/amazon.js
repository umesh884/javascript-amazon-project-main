/*const products = [{

    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
        stars: 4.5,
        count: 87
    },
    priceCents: 1090
  },
{  
    image: "images/products/intermediate-composite-basketball.jpg",
    name: "Intermediate Size Basketball",
    rating: {
        stars: 4.0,
        count: 127
    },
    priceCents: 2095},
{  
    image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    rating: {
        stars: 4.5,
        count: 127
    },
    priceCents: 799 
},
{
    image:"images/products/black-2-slot-toaster.jpg",
    name:"2 Slot Toaster-Black",
    rating: {
        stars: 5.0,
        count: 2197
    },
    priceCents: 1899
},]*/
// products array comes from products.js
import {cart, saveToStorage,addToCart} from './data/cart.js';
import { products } from './data/products.js';
let productHTML = '';
products.forEach((product) =>{
    productHTML += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
           ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents/100).toFixed(2)}
          </div>

          <div class="product-quantity-container js-product quantity">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart "
          data-product-name = "${product.name}"
          data-product-id = "${product.id}"
          data-price-cents = "${product.priceCents}">
            Add to Cart
          </button>
        </div>`
       
});


function updateCartQuantity(){
  let totalQuantity = 0;
  cart.forEach((item) => {
    totalQuantity += item.quantity;
  });
  document.querySelector('.js-cart-quantity').innerHTML = 
  totalQuantity;
  
}
updateCartQuantity();
document.querySelector('.js-product-grid').innerHTML = productHTML;
// button is index looping and apply through all the buttons
document.querySelectorAll('.js-add-to-cart')
.forEach((button) => {
    button.addEventListener("click", () => {
       // console.log("Added to cart");
      const productName = button.dataset.productName;
      const productId = button.dataset.productId;
      const priceCents = button.dataset.priceCents;
      let cost1 = (priceCents/100).toFixed(2);
      let cost = Number(cost1);
       
       // check if there is already the same item name in cart
       // if cart item name is same as the dataset product name we increase quantity
      let select = document.querySelector(`.js-quantity-selector-${productId}`).value;
      let quantity = Number(select);
      addToCart(productId,quantity);
       
      
       
      updateCartQuantity();
       
       
       // Accessing how many quantity we have selected
       // 13i , 13j and 13k\
      const added = document.querySelector(`.js-added-${productId}`);
      const a =added.classList.add('added-to-cart-visible');
       // 13 l, 13m removing added message after certain amount of time
      let addedMessage;
      if ( addedMessage){
        clearTimeout(addedMessage);
       }
       // saving timeoutID
      const timeOut = setTimeout(() => {
        added.classList.remove('added-to-cart-visible')

      },2000) ;
       // if Saved timeoutID === addedMessage
       //(which it clears the previous timeOutID and refreshes for another 2 seconds)
       addedMessage = timeOut;
       
      //console.log(cart);
    });

});
console.log(cart);


