const cartBtn = document.querySelector(".cart-btn");
const cartModal = document.querySelector(".cart");
const backDrop = document.querySelector(".backdrop");
const closeModal = document.querySelector(".cart-item-confirm");
const productsDOM = document.querySelector(".products-center");
const cartTotal = document.querySelector(".cart-totla");
const cartItems = document.querySelector(".cart-items");
import {productsData} from  "./products.js";

let cart = [];

// 1. get products
class Products{
    getProducts() {
        return productsData;
    }
}

// 2. display products
class UI{
    displayProducts(products) {
        let result = " ";
        products.forEach((item) => {
            result += `<div class="product">
            <div class="img-container">
              <img src=" ${item.imageUrl} " class="product-img" />
            </div>
            <div class="product-desc">
              <p class="product-price"> ${item.price} </p>
              <p class="product-title"> ${item.title} </p>
            </div>
            <button class="btn add-to-cart" data-id= ${item.id} >
              <i class="fas fa-shopping-cart"></i>
              add to cart
            </button>
          </div>`;
        productsDOM.innerHTML = result;
    });
    }
    getAddToCartBtns() {
      const addTocartBtns = document.querySelectorAll(".add-to-cart");
      const buttons = [...addTocartBtns];
      
      buttons.forEach((btn) => {
        const id = btn.dataset.id;
        // check if this product id is in cart or not
        const isInCart = cart.find((p) => p.id === id);
        if (isInCart) {
          btn.innerText = "In Cart";
          btn.disabled = true;
        }

        btn.addEventListener("click", (event) => {
          event.target.innerText = "In Cart";  
          event.target.disabled = true;
          const addedProduct= Storage.getProduct(id);
          cart = [...cart, {...addedProduct, quantity: 1}];
          Storage.saveCart(cart);
          this.setCartValue(cart);
        });
      });
    }
    setCartValue(cart){
      let tempCartItems = 0;
      const cartTotal = cart.reduce((acc, curr) => {
        tempCartItems +=curr.quantity;
        return acc + curr.quantity * curr.price;
      }, 0);
      cartTotal.innerText = `total price : ${totalPrice.toFixed(2)} $`;
      cartItems.innerText = tempCartItems;
    }
}

//3. storage
class Storage{
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  static getProducts(id){
    const _products = JSON.parse(localStorage.getItem("products"));
    return _products.find((p) => p.id === parseInt(id));
  }
  static saveCart(cart){
    localStorage.setItem("cart", JSON.stringify(cart)); 
  }
}

document.addEventListener("DOMContentLoaded", () =>{
    const products = new Products();
    const productsData = products.getProducts();
    const ui = new UI();
    ui.displayProducts(productsData);
    ui.getAddToCartBtns();
    Storage.saveProducts(productsData);
    });



function showModalFunction() {
    backDrop.style.display = "block";
    cartModal.style.opacity = "1";
    cartModal.style.top = "20%";
}

function closeModalFunction() {
    backDrop.style.display = "none";
    cartModal.style.opacity = "0";
    cartModal.style.top = "100%";
}

cartBtn.addEventListener("click", showModalFunction);
closeModal.addEventListener("click", closeModalFunction);
backDrop.addEventListener("click", closeModalFunction);