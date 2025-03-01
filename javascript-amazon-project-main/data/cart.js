//import{addToCart} from '../amazon.js';
export let cart = JSON.parse (localStorage.getItem('cart'))
||[{
    productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 1,
    deliveryOptionId: '1'
},{
    productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 2,
    deliveryOptionId: '2'
}]; 
export function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}
/*export function calculateCartQuantity(){
    let totalQuantity = 0;
  cart.forEach((item) => {
    totalQuantity += item.quantity;
  });
    document.querySelector('.js-checkout-quantity').innerHTML = `${totalQuantity} Items`;
}*/

export function addToCart(productId,quantity){
    let matchingItem;
  
    cart.forEach((item) => {
      if(productId === item.productId){
          matchingItem = item;
      }
     });
    if ( matchingItem){
      matchingItem.quantity += quantity ;
      //matchingItem.cost += cost;
     }
     else{
     cart.push({
          //productId: productId,
          //quantity: quantity,
          // 13 h Shorthand notation
          productId,
          quantity,
          deliveryOptionId: '1'
          //cost: cost
     });
     }
     saveToStorage();
  }
export function removeFromCart(productId){
    const newCart = [];
    cart.forEach((cartItem) => {
        if(cartItem.productId != productId){
            newCart.push(cartItem)
        }
    });
    cart = newCart;
}

export function updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem ;
    cart.forEach((item) => {
        if(productId === item.productId){
            matchingItem = item;
        }
        
       });
       matchingItem.deliveryOptionId = deliveryOptionId ;
        
    saveToStorage();
}