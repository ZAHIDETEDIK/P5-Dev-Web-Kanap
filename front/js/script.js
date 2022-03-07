// récuperation des produits de l'API

fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((res) => {
        res.forEach(produit => {
            buildKanapHtml(produit);



        })
    })
// fonction permettant de construire l'article à partire de l 'objet produit
function buildKanapHtml(produit) {
    // insertion de l 'élément "a"
    let lien = document.createElement("a");
    document.querySelector(".items").appendChild(lien);
    lien.href = `product.html?id=${produit._id}`;

    // insertion de l'élémént " article"
    let productArticle = document.createElement("article");
    lien.appendChild(productArticle);

    // insertion image
    let productImg = document.createElement("img");
    productImg.src = produit.imageUrl;
    productImg.alt = produit.altTxt;
    productArticle.appendChild(productImg);

    // insertion du titre "h3"
    let productName = document.createElement("h3");
    productName.classList.add("productName");
    productName.innerHTML = produit.name
    productArticle.appendChild(productName);

    // insertion de la description "p"
    let productDescription = document.createElement("p");
    productDescription.classList.add("productName");
    productDescription.innerHTML = produit.description
    productArticle.appendChild(productDescription);

}