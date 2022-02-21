const cart = []


recupItem()
 

// Récupération des données du localstorage
function recupItem() {
   const numberOfItems = localStorage.length
    for (let i = 0; i < numberOfItems; i++) {
        const item = localStorage.getItem(localStorage.key(i)) || ""
        const itemObject = JSON.parse(item)
        cart.push(itemObject)
    }
}

cart .forEach((produit,i) =>{ 

    let mesArticle=document.createElement("article");
    document.querySelector("#cart__items").appendChild(mesArticle);
    mesArticle.className='cart__item';
    mesArticle.setAttribute('data-id',produit._id);

    let divImg=document.createElement("div");
    mesArticle.appendChild(divImg);
    divImg.className="cart__item__img";

    let mesImages=document.createElement("img");
    divImg.appendChild(mesImages);
    mesImages.src=produit.imageUrl;
    mesImages.aLT=produit.altTxt;

    let cartItemcontent=document.createElement("div");
    mesArticle.appendChild(cartItemcontent);
    cartItemcontent.className="cart__item__content";

    let cartItemcontentDescription=document.createElement("div");
    cartItemcontent.appendChild(cartItemcontentDescription);
    cartItemcontentDescription.className="cart__item__content__description";

    let productTitle=document.createElement('h2')
    cartItemcontentDescription.appendChild(productTitle)
    productTitle.innerHTML=produit.name;
    

})





