let tableProduct = [];
const tableTotalPrice = [];

function ItemsFromStore () {
  let numberOfItems = localStorage.length;
  for (let i = 0; i < numberOfItems; i++) {
    const item = localStorage.getItem(localStorage.key(i));
    const itemObject = JSON.parse(item);
    tableProduct.push(itemObject);
  }
}

function fullStorageToCart () {
  tableProduct.forEach((product) => {
    const container = document.getElementById("cart__products");
    const createContainer = document.createElement("div");
    const createSubContainer = document.createElement("div");
    const createSubContainer2 = document.createElement("div");
    const createSubContainer3 = document.createElement("div");
    const createTitle = document.createElement("h4");
    const createPrice = document.createElement("h4");
    const createImg = document.createElement("img");
    const createSize = document.createElement("h4");
    const createQty = document.createElement("h4");
    const createElementIcon = document.createElement("img");
    const createButtonDelete = document.createElement('button');

    createContainer.classList.add("container__products");
    createContainer.dataset.id = product.id;
    createSubContainer.classList.add("container__products--first");
    createSubContainer2.classList.add("container__products--second");
    createSubContainer3.classList.add("container__products--third");
    createTitle.textContent = product.name + " : " + product.brand;
    createTitle.classList.add("container__product--title");
    createPrice.textContent = product.price + " x " + product.quantity;
    createPrice.classList.add("container__product--price");
    createSize.textContent = "Taille : " + product.size;
    createSize.classList.add("container__product--size");
    createQty.textContent = product.quantity + " x ";
    createSize.classList.add("container__product--quantity");
    createImg.src = product.imgUrl;
    createImg.style.width = "100%";
    createImg.classList.add("container__product--img");
    createElementIcon.src = "../../img/x.svg";
    createElementIcon.classList.add("product__delete");
    createButtonDelete.classList.add('button__delete');
    createButtonDelete.style.backgroundColor = "#fff";
    createButtonDelete.style.height = "100%";
    createButtonDelete.dataset.id = product.id;

    container.appendChild(createContainer);
    createContainer.appendChild(createSubContainer);
    createContainer.appendChild(createSubContainer2);
    createContainer.appendChild(createSubContainer3);
    createSubContainer.appendChild(createImg);
    createSubContainer2.appendChild(createPrice);
    createSubContainer2.appendChild(createTitle);
    createSubContainer2.appendChild(createSize);
    createSubContainer3.appendChild(createButtonDelete);
    createButtonDelete.appendChild(createElementIcon);
  });
}

function pushProductsPrice() {
  tableProduct.forEach((product) => {
    const priceTotal = parseInt(product.price,10) * product.quantity;
    tableTotalPrice.push(priceTotal);
    return tableTotalPrice;
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
        const getButtonKey = button.dataset.id;
        console.log(getButtonKey);
        // Select Child / Container
        const childrenContainers = document.querySelectorAll('.container__products');
        const container = document.querySelector('.panier__price');
        // Transform NodeType Object into Array
        const children = Array.from(childrenContainers);
        console.log(children);
        // Find the right container child to remove from panel
        const filteredChild = children.find(child => child.dataset.id === getButtonKey);
        console.log(filteredChild);

        // Display remove from panel
        container.removeChild(filteredChild);
        // Remove item by Key in localstorage
        // Get localStorage length
        const numberOfItems = localStorage.length;
        for (let i = 0; i < numberOfItems; i++) {
          localStorage.removeItem(getButtonKey);
        }
      });
    }
  });
}

function updateAllPrices() {
  const priceTotalElement = document.getElementById("price__total");
  const subTotal = document.getElementById("price__product");
  const shippingPrice = document.getElementById("price__shipping");
  let deliveryPrice = 15;
  const sumWithInitial = tableTotalPrice.reduce(
    (previousValue, currentValue) => parseInt(previousValue,10) + parseInt(currentValue,10)
  );

  shippingPrice.textContent = deliveryPrice + ",00€";
  subTotal.textContent = sumWithInitial + ".00€";
  priceTotalElement.textContent =sumWithInitial + deliveryPrice + ".OO€";
}

function displayEmptyCartButton() {
  document.querySelector(".cart__button").style.display = "none";
}

function init() {
  displayEmptyCartButton();
  ItemsFromStore();
  fullStorageToCart();
  pushProductsPrice();
  updateAllPrices();
  removeSelectedItem();
}

init();
