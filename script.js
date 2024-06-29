const API = "https://fakestoreapi.com/products";

async function GetProducts() {
  try {
    const response = await fetch(API);
    const data = await response.json();
    let Store = document.querySelector(".store-data");
    data.forEach((item) => {
      Store.innerHTML += `<div class="store-info" id="${item.id}">
            <div class="store-image">
               <img class="prodIM" src="${item.image}">
            </div>
            <div class="store-title-price">
               <h3>${item.title}</h3>
               <p>$${item.price}</p>
               <button class="btnAdd">Add To Cart</button>
            </div>
      </div>`;
    });
    let addToCart = document.querySelectorAll(".btnAdd");
    addToCart.forEach((btn) => {
      btn.addEventListener("click", function () {
        let prodID = btn.parentElement.parentElement.id;
        let SelectedItems = data.find((item) => item.id === parseInt(prodID));
        if (SelectedItems) {
          let cartItems =
            JSON.parse(window.localStorage.getItem("product")) || [];
          let existingItem = cartItems.find(
            (item) => item.id === parseInt(prodID)
          );
          if (existingItem) {
            existingItem.quntity = (existingItem.quntity || 1) + 1;
          } else {
            SelectedItems.quntity = 1;
            cartItems.push(SelectedItems);
          }
          window.localStorage.setItem("product", JSON.stringify(cartItems));
          console.log(SelectedItems);
          UpdateCart();
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
}

function UpdateCart() {
  let cartItems = JSON.parse(window.localStorage.getItem("product"));
  let Cart = document.querySelector(".cartData");
  if (Cart) {
    Cart.innerHTML = "";
    if (!cartItems || cartItems.length === 0) {
      Cart.innerHTML = "No Items Yet";
      return
    } 

    if (cartItems) {
      cartItems.forEach((item) => {
        Cart.innerHTML += `<div class="store-info" id="${item.id}">
      <div class="store-image">
      <img class="prodIM" src="${item.image}">
      </div>
       <div class="btnss">
         <input type="button"  class="increase" value="increase">
           <span class="span-qun">${item.quntity}</span>
         <input type="button"  class="decrease" value="decrease">
        </div> 
      <div class="store-title-price">
     <div>
         <h3>${item.title}</h3>
           <p>$${item.quntity * item.price}</p>
            <p class="quantity">Count ${item.quntity}</p></div>
      </div>
      </div>`;
        let btninc = document.querySelectorAll(".increase");
        btninc.forEach((btn) => {
          btn.addEventListener("click", function () {
            let prodID = btn.parentElement.parentElement.id;
            let cartItems = JSON.parse(window.localStorage.getItem("product"));
            let SelectedItem = cartItems.find(
              (item) => item.id === parseInt(prodID)
            );
            if (SelectedItem) {
              SelectedItem.quntity++;
              window.localStorage.setItem("product", JSON.stringify(cartItems));
              UpdateCart();
            }
          });
        });
        let btndenc = document.querySelectorAll(".decrease");
        btndenc.forEach((btn) => {
          btn.addEventListener("click", function () {
            let prodID = btn.parentElement.parentElement.id;
            let cartItems = JSON.parse(window.localStorage.getItem("product"));
            let SelectedItem = cartItems.find(
              (item) => item.id === parseInt(prodID)
            );
            if (SelectedItem) {
              SelectedItem.quntity--;
              window.localStorage.setItem("product", JSON.stringify(cartItems));
              UpdateCart();
              if (SelectedItem.quntity === 0) {
                let removedItem = cartItems.filter(
                  (item) => item.id !== parseInt(prodID)
                );
                window.localStorage.setItem(
                  "product",
                  JSON.stringify(removedItem)
                );
                UpdateCart();
              }
            }
          });
        });
      });
    } else {
      console.error("Element with class .cartData not found.");
    }
  }
}

UpdateCart();
GetProducts();
