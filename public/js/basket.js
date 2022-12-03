// Création d'un objet "productData pour ranger et trouver facilement toutes nos fonctions liés aux datas du produit"
const productName = document.getElementById("name");
const productPrice = document.getElementById("price");
const productImg = document.getElementById("MainImg");
const productDescription = document.getElementById("productDescription");
const productSize = document.getElementById("size");
const productQuantity = document.querySelector(".quantity");
const cartButton = document.getElementById("addToCart");
const id = new URL(location.href).searchParams.get("id");

// Permet de récupérer l'id du produit voulu
function getChemiseId() {
  return id;
}

// Fetch pour récupérer les datas du produit
function fetchArticle(chemiseId) {
  return fetch(`http://localhost:5500/products/${chemiseId}`)
    .then((response) => response.json())
    // eslint-disable-next-line no-undef
    .then((apiArticle) => (article = apiArticle))
    .catch((error) => {
      alert(error);
    });
}

// Afficher les datas du produit sur notre page
function displayChemiseData(article) {
  productName.textContent = article.name;
  productPrice.textContent = article.price;
  productPrice.value = article.price;
  productImg.src = article.img;
  productDescription.textContent = article.description;
}

function isOrderInvalid() {
  if ( productSize.value === "null" || productQuantity.value <= 0) {
    alert("Veuillez remplir tous les champs nécessaires");
    return true;
  }
}

// Async function pour lancer les différentes fonctions nécéssaires.
(async function () {
  const chemiseId = getChemiseId();

  const article = await fetchArticle(chemiseId);
  displayChemiseData(article);
})();

// ------------------------------------------ AddToCart Button  ------------------------------------------ //
const addToCart = {
  basketButton: document.getElementById("addToCart"),
  // Récupération du bouton ajouter au panier
  animateButtonCart: function () {
    addToCart.basketButton.addEventListener("click", () => {
      addToCart.basketButton.style.backgroundColor = "#e0baf8";
      addToCart.basketButton.style.cursor = "grab";
      setTimeout(function () {
        addToCart.basketButton.style.backgroundColor = "#A30FFE";
        addToCart.basketButton.style.cursor = "pointer";
      }, 200);
    });
  },

  init: function () {
    addToCart.animateButtonCart();
  }
};

cartContent();
addToCart.init();
