import { cart } from "./data/cart.js"; 
import { products } from "./data/products.js";
import { deliveryOptions } from "./data/deliveryOptions.js";
export function renderPaymentSummary(){
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    cart.forEach((cartItem) => {
        let matchingItem;
    // If cart productid matches with id from products list then it is in cart we access it's name, id, image, price
    const productId = cartItem.productId;
    products.forEach((product) => {
        if(productId == product.id){
            matchingItem = product;
        }
        return matchingItem;
    })
    
    productPriceCents += matchingItem.priceCents * cartItem.quantity;
    // deliveryoption to determine whether it is free shipping or cost shipping
    let deliveryOption = cartItem.deliveryOptionId;
    let deliveryOption1;
    deliveryOptions.forEach((option) => {
      if(option.id === deliveryOption){
        deliveryOption1 = option;
      }
    });
    deliveryOption1 = cartItem.deliveryOptionId;
    // cart has 3 delivery options optionid 1 = free, optionid 2 = 4.99, optionid 3 = 9.99
    // check cart deliveryoption and deliveryoptionid are equal
    shippingPriceCents += deliveryOption1.priceCents;
    const taxBefore = productPriceCents + shippingPriceCents;
    const taxPriceCents = taxBefore * 0.1;               
    const totalPrice = ((taxBefore + taxPriceCents)/100).toFixed(2);
    console.log(totalPrice);
    
});

let paymentSummaryHTML = `
    <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${(productPriceCents)/100}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${(shippingPriceCents)/100}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${(taxBefore)/100}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${(taxPriceCents)/100}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${(totalPrice)/100}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`;
document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML

}

