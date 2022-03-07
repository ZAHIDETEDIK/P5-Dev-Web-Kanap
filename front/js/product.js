const params = new URLSearchParams(document.location.search);
const id = params.get("id");
const color = document.querySelector("#colors");
const quantity = document.querySelector("#quantity");
let product = null;
const button_sendToCart = document.querySelector("#addToCart");




// Récupération des articles de l'API et des données de l'API dans le DOM
fetch("http://localhost:3000/api/products/" + id)
    .then((res) => res.json())
    .then((objetProduit) => {
        product = objetProduit
        buildProductHtml();
    });

/* fonction affichant l'image,le titre , le
prix, la description et la couleur du
produit provenant du Local Storage
correspondant sur la page
product.html(page description du PRODUIT */
function buildProductHtml() {
    let imageAlt = document.querySelector("article div.item__img");
    let titre = document.querySelector("#title");
    let prix = document.querySelector("#price");
    let description = document.querySelector("#description");
    let couleurOption = document.querySelector("#colors");

    // Insertion de l'image
    imageAlt.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    // Modification du titre "h1"
    titre.textContent = `${product.name}`;
    // Modification du prix
    prix.textContent = `${product.price}`;
    // Modification de la description
    description.textContent = `${product.description}`;
    // Insertion des options de couleurs par une boucle for
    for (let couleur of product.colors) {
        couleurOption.innerHTML += `<option value="${couleur}">${couleur}</option>`;
    }


}


/*Ajouter des produits dans le panier, en calculant le nombre de produits
total dans le panier et le prix total. On ajoute le produit dans le local storage ou on incrémente sa quantité */
function addToCart(produit) {

    if (quantity.value > 0 && quantity.value <= 100 && quantity.value != 0) {

        let choixQuantite = quantity.value;
        let choixCouleur = color.value;
        let optionsProduit = {
            idProduit: produit._id,
            couleurProduit: choixCouleur,
            quantiteProduit: Number(choixQuantite),
            name: produit.name,
            description: produit.description,
            imageUrl: produit.imageUrl,
            altTxt: produit.altTxt
        };


        let productInLocalStorage = JSON.parse(localStorage.getItem('products'));


        /*Un message de notification  lors de l’ajout d’un produit
        au panier */
        const popup = () => {
            if (window.confirm(`Votre commande de ${choixQuantite} ${produit.name} ${choixCouleur} est ajoutée au panier
    Pour consulter votre panier, cliquez sur OK`)) {
                window.location.href = "cart.html";

            }
        }

        //Importation dans le local storage
        //Si le panier comporte déjà au moins 1 article
        if (productInLocalStorage) {
            const findResult = productInLocalStorage.find(
                (element) => element.idProduit === produit._id && element.couleurProduit === choixCouleur)

            //Si le produit commandé est déjà dans le panier
            if (findResult) {
                let newQuantite =
                    parseInt(optionsProduit.quantiteProduit) + parseInt(findResult.quantiteProduit);
                findResult.quantiteProduit = newQuantite;
                localStorage.setItem("products", JSON.stringify(productInLocalStorage));

                popup();
                //Si le produit commandé n'est pas dans le panier
            } else {
                productInLocalStorage.push(optionsProduit);
                localStorage.setItem("products", JSON.stringify(productInLocalStorage));
                popup();
            }
            //Si le panier est vide 
        } else {
            productInLocalStorage = [];
            productInLocalStorage.push(optionsProduit);
            localStorage.setItem("products", JSON.stringify(productInLocalStorage));
            console.log(productInLocalStorage);
            popup();
        }
    }
}
button_sendToCart.addEventListener("click", function (e) {
    addToCart(product);
})




















