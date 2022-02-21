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
fetch("http://localhost:3000/api/products")
.then ((res)=>res.json())
.then((data)=>{ 
 

 cart.forEach((product,i) =>{ 

    let mesArticle=document.createElement("article");
    document.querySelector("#cart__items").appendChild(mesArticle);
    mesArticle.className='cart__item';
    mesArticle.setAttribute('data-id',product._id);

    let divImg=document.createElement("div");
    mesArticle.appendChild(divImg);
    divImg.className="cart__item__img";

    let mesImages=document.createElement("img");
    divImg.appendChild(mesImages);
    mesImages.src=product.imageUrl;
    mesImages.aLT=product.altTxt;

    let cartItemcontent=document.createElement("div");
    mesArticle.appendChild(cartItemcontent);
    cartItemcontent.className="cart__item__content";

    let cartItemcontentDescription=document.createElement("div");
    cartItemcontent.appendChild(cartItemcontentDescription);
    cartItemcontentDescription.className="cart__item__content__description";

    let productTitle=document.createElement('h2')
    cartItemcontentDescription.appendChild(productTitle)
    productTitle.innerHTML=product.name;

    let productColors=document.createElement("p");
    productTitle.appendChild(productColors);
    productColors.innerHTML=product.color;

    let productPrice=document.createElement("p");
    productTitle.appendChild(productPrice);
    productPrice.innerHTML=product.price + " €";

    // Insertion de l'élément "div"
    let productItemSettings = document.createElement("div");
    mesArticle.appendChild(productItemSettings);
    productItemSettings.className = "cart__item__content__settings";

    // Insertion de l'élément "div"
    let productItemSettingsQuantity = document.createElement("div");
    productItemSettings.appendChild(productItemSettingsQuantity);
    productItemSettingsQuantity.className = "cart__item__content__settings__quantity";

    // Insertion de "Qté : "
    let productQte = document.createElement("p");
    productItemSettingsQuantity.appendChild(productQte);
    console.log(product)
    productQte.innerHTML = "Qté : ";


    // Insertion de la quantité
    let productInsertionQuantity = document.createElement("input");
    productItemSettingsQuantity.appendChild(productInsertionQuantity);
    productInsertionQuantity.className = "itemQuantity";
    productInsertionQuantity.value = product.quantiteProduit;
    productInsertionQuantity.setAttribute("type", "number");
    productInsertionQuantity.setAttribute("name", "itemQuantity-" + product.idProduit);
    productInsertionQuantity.setAttribute("min", "1");
    productInsertionQuantity.setAttribute("max", "100");


    // Insertion de l'élément "div"
    let productItemContentSettingsDelete = document.createElement("div");
    mesArticle.appendChild(productItemContentSettingsDelete);
    productItemContentSettingsDelete.className = "cart__item__content__settings__delete";


    // Insertion de "p" supprimer
    let productItemDelete = document.createElement("p");
    productItemContentSettingsDelete.appendChild(productItemDelete);
    productItemDelete.className = "deleteItem";
    productItemDelete.innerHTML = "Supprimer";

 })
 getTotals()
 

})
function getTotals() {
    // Récupération du total des quantités
    let elementsQuantity = document.getElementsByClassName("itemQuantity");
    let quantityTotal = 0;

    for (let i = 0; i < elementsQuantity.length; ++i) {
        quantityTotal += elementsQuantity[i].valueAsNumber;
    }

    let productTotalQuantity = document.getElementById("#totalQuantity");
    productTotalQuantity.innerHTML = quantityTotal;

    // Récupération du prix total
    let priceTotal = 0;

    }

    let productTotalPrice = document.getElementById("#totalPrice");
    productTotalPrice.innerHTML = priceTotal;





    
    







