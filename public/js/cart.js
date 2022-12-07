/* eslint-disable no-undef */
// On pageLoaded, add every products from the local storage to the card
window.addEventListener("DOMContentLoaded", () => {
  EachProductToCart();
});

// Create blank array in which localStorage product will be push
let PanelTable = [];

// Get the ID of the product by the params url
const ID = new URL(location.href).searchParams.get("id");

// Function to Store product into the localStorage
function storeProduct () {
  const data = {
    id: ID,
    name: article.name,
    brand: article.brand,
    size: productSize.value,
    price: productPrice.value,
    // eslint-disable-next-line no-undef
    imgUrl: article.img,
    quantity: productQuantity.value
  };
  localStorage.setItem(id, JSON.stringify(data));
}

// Push Items to the LocalStorage
function ItemsFromStore () {
  let numberOfItems = localStorage.length;
  for (let i = 0; i < numberOfItems; i++) {
    const item = localStorage.getItem(localStorage.key(i));
    // Parse item from localStorage to make it more readable
    const itemObject = JSON.parse(item);
    // Push items to the PanelTable []
    PanelTable.push(itemObject);
  }
}

function isOrderInvalid() {
  if ( productSize.value === "null" || productQuantity.value <= 0) {
    alert("Veuillez remplir tous les champs nécessaires");
    return true;
  }
}

function addProductToCart() {
  const createElementName = document.createElement("h4");
  const createElementSize = document.createElement("span");
  const quantityProduct = document.querySelector(".quantity");
  const productName = document.querySelectorAll('.cart__product--name');
  const size = document.getElementById("size");
  const ElemProductQuantity = document.getElementById(ID);
  let cartIndex = cart.findIndex(product => product.id === id);
  let conditionAdd = article.name + " : " + parseInt(productPrice.value,10) * parseInt(productQuantity.value,10) + ".00€";

  // Mise à jour du Cart Panel, empêche de créer le produit si déja crée, update seulement le prix
  if(localStorage.length == 0) {
    location.reload();
  }
  for(let i = 0; i < productName.length; i++) {
    const item = localStorage.getItem(id);
    const itemObject = JSON.parse(item);
    if(itemObject === null) {
      storeProduct();
      location.reload();
    }
    if(ElemProductQuantity != cart[cartIndex]) {
      location.reload;
    }
    if(productName.item(i).textContent === conditionAdd) {
      createElementName.textContent = conditionAdd;
      return console.log("Produit déjà existant => condition nom de l'item");
    }
    if(cart[cartIndex].id === article._id) {
      ElemProductQuantity.textContent = quantityProduct.value;
      return console.log(`Nouvelle quantité de l'élément ${ID} : ${quantityProduct.value}`);
    }
    if(createElementSize.textContent=== size.value) {
      return console.log("Vous avez déjà séléctionné cette article");
    }
  }
}

// Function to display CartButton on localStorage length
function displayEmptyCartButton() {
  if (localStorage.length === 0) {
    document.getElementById("empty__cart").style.display = "none";
    document.getElementById("cart__logo--counter").style.display = "none";
  }
}

// Function to deleteAllItems in a single click button
function deleteAllItems() {
  // Get button "delete items"
  const deleteAllItem = document.getElementById("empty__cart");
  // Add EventListener on it
  deleteAllItem.addEventListener("click", () => {
    // Get all items from the localStorage
    const numberOfItems = localStorage.length;
    for (let i = 0; i < numberOfItems; i++) {
      // Get all item in a variable
      const item = localStorage.getItem(localStorage.key(i));
      // Parse to make it readable
      const itemObject = JSON.parse(item);
      // Remove all items from the localStorage
      window.localStorage.clear(itemObject);

      // Select Container / Child
      const container = document.querySelector('.cart__content');
      const child = document.querySelector('.cart__products');

      // Remove the child from the container
      container.removeChild(child);
      // Hide the button if no items in card
      if (numberOfItems === 0) {
        deleteAllItem.style.display = "none";
      } else {
        deleteAllItem.style.display = "initial";
      }
    }
  });
}
// Function to remove a single item from card
function removeSelectedItem() {
  document.body.addEventListener("click", () => {
    const deleteButtons = document.querySelectorAll(".button__delete");
    const buttonDelete = Array.from(deleteButtons);
    // Loop for to make listener on every buttons
    for (const button of buttonDelete) {
      button.addEventListener("click", () => {
        // Get data-id on the target button
        const removeKey = button.dataset.id;
        // Select Child / Container
        const childrenContainers = document.querySelectorAll('.cart__product');
        const container = document.querySelector('.cart__products');
        // Transform NodeType Object into Array
        const children = Array.from(childrenContainers);
        // Find the right container child to remove from panel
        const filteredChild = children.find(child => child.dataset.id === removeKey);

        // Display remove from panel
        container.removeChild(filteredChild);
        // Remove item by Key in localstorage
        // Get localStorage length
        const numberOfItems = localStorage.length;
        for (let i = 0; i < numberOfItems; i++) {
          localStorage.removeItem(removeKey);
        }
      });
    }
  });
}

function cartContent () {
  cartButton.addEventListener("click", () => {
    if (isOrderInvalid()) {
      return;
    }
    addProductToCart();
    storeProduct();
    ItemsFromStore();
  });
}

function app() {
  displayEmptyCartButton();
  deleteAllItems();
  removeSelectedItem();
}

app();



