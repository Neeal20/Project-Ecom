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
    const createTitle = document.createElement("h4");
    const createPrice = document.createElement("h4");
    const createImg = document.createElement("img");
    const createSize = document.createElement("h4");
    const createQty = document.createElement("h4");

    createContainer.classList.add("container__products");
    createSubContainer.classList.add("container__products--first");
    createSubContainer2.classList.add("container__products--second");
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

    container.appendChild(createContainer);
    createContainer.appendChild(createSubContainer);
    createContainer.appendChild(createSubContainer2);
    createSubContainer.appendChild(createImg);
    createSubContainer2.appendChild(createPrice);
    createSubContainer2.appendChild(createTitle);
    createSubContainer2.appendChild(createSize);
  });
}

function pushProductsPrice() {
  const totalPrice = document.getElementById("price__total");

  tableProduct.forEach((product) => {
    const priceTotal = parseInt(product.price,10) * product.quantity;
    tableTotalPrice.push(priceTotal);
    console.log(tableTotalPrice);
    return tableTotalPrice;
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
}

init();
