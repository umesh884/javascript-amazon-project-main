import {cart, saveToStorage, updateDeliveryOption} from './data/cart.js';
import { products } from './data/products.js';
import { removeFromCart } from './data/cart.js';
import { deliveryOptions } from './data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';


/*const today = (dayjs());
const deliveryDate = today.add(7,'days');
const deliveryDate1 = today.add(3,'days');
const deliveryDate2 = today.add(1,'days');
//console.log(deliveryDate);
const formatDate = deliveryDate.format('dddd, MMMM D');
const formatDate1 = deliveryDate1.format('dddd, MMMM D');
const formatDate2 = deliveryDate2.format('dddd, MMMM D');
console.log(deliveryDate.format('dddd, MMMM, D'))*/

function updateCartQuantity(){
  let totalQuantity = 0;
  cart.forEach((item) => {
    totalQuantity += item.quantity;
  });
  document.querySelector('.js-checkout-quantity').innerHTML = `${totalQuantity} Items`;
}
function renderSummaryHTML(){
let cartSummaryHTML = '';
cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    let matchingItem;
    // If cart productid matches with id from products list then it is in cart we access it's name, id, image, price
    products.forEach((product) => {
        if(productId == product.id){
            matchingItem = product;
        }
    });
    let deliveryOption = cartItem.deliveryOptionId;
    let deliveryOption1;
    deliveryOptions.forEach((option) => {
      if(option.id === deliveryOption){
        deliveryOption1 = option;
      }
    });
    const today = (dayjs());
    const deliveryDate = 
    today.add(deliveryOption1.deliveryDays,'days');
    const formatDate3 = deliveryDate.format('dddd, MMMM D');

   cartSummaryHTML += ` 
        <div class="cart-item-container 
            js-cart-item-container-${matchingItem.id}">
            <div class="delivery-date">
              Delivery date: ${formatDate3}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingItem.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingItem.name}
                </div>
                <div class="product-price">
                  $${(matchingItem.priceCents/100).toFixed(2)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label
                    js-quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link"
                  data-product-id = "${matchingItem.id}">
                    Update
                    <input class="quantity-input js-quantity-input">
                    <span class="save-quantity-link link-primary js-save-link"
                  data-product-id = "${matchingItem.id}">Save</span>
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link"
                  data-product-id = "${matchingItem.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(matchingItem, cartItem)}
              </div>
            </div>
          </div>`;
      // 14 b Exercise
    
    updateCartQuantity();
function deliveryOptionsHTML(matchingItem, cartItem){
  let html = '';
  deliveryOptions.forEach((deliveryOption) => {
    const today = (dayjs());
    const deliveryDate = 
    today.add(deliveryOption.deliveryDays,'days');
    const formatDate3 = deliveryDate.format('dddd, MMMM D');
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
    const priceString = deliveryOption.priceCents === 0
    
? 'FREE' 
: `$${((deliveryOption.priceCents)/100).toFixed(2)} -`  
    
  html +=
    `
    <div class="delivery-option js-delivery-option"
    data-option-id = "${matchingItem.id}"
    data-delivery-option-id = "${deliveryOption.id}">
      <input type="radio" ${isChecked ? 'checked' : ''}
      class="delivery-option-input"
        name="delivery-option-${matchingItem.id}">
      <div>
        <div class="delivery-option-date">
            ${formatDate3}
        </div>
        <div class="delivery-option-price">
            ${priceString} Shipping
        </div>
      </div>
    </div>
     `
  });
  return html;

}
document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
});
document.querySelectorAll('.js-delete-link').forEach((del) => {
    del.addEventListener('click',() =>{
        const productId = del.dataset.productId;
        removeFromCart(productId);
        console.log(productId);
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
        renderPaymentSummary();
        updateCartQuantity();
        saveToStorage();
    });
});
function updateCart(){

};
document.querySelectorAll('.js-update-link').forEach((update) =>{
  update.addEventListener('click',() => {
    const productId = update.dataset.productId;
    console.log(productId);
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    
    container.classList.add('is-editing-quantity');
    updateCartQuantity();
    saveToStorage();
  });
});
document.querySelectorAll('.js-save-link').forEach((save) => {
  save.addEventListener('click',() => {
    const productId = save.dataset.productId;
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.remove('.is-editing-quantity');
    // container.classList.add('.is-editing-quantity1');
    const num = document.querySelector('.js-quantity-input').value;
    if(num < 100 && num >= 0){
      const quantity = Number(num);
      document.querySelector('.js-quantity-label').innerHTML = quantity;
      
    document.querySelector('.js-quantity-input').value = '';
    updateCartQuantity();
    saveToStorage();
    
    }    
  });
});
updateCartQuantity();
document.querySelectorAll('.js-delivery-option').forEach((element) => {
  element.addEventListener('click', () => {
    const  productId = element.dataset.productId;
    const deliveryOptionId = element.dataset.deliveryOptionId;
    //const {productId, deliveryOptionId} = element.dataset;
    updateDeliveryOption(productId,deliveryOptionId);
    renderSummaryHTML();
    renderPaymentSummary();
    //document.querySelector('.delivery-date').innerHTML = deliveryOptionId;
  });
});
}
renderSummaryHTML();
