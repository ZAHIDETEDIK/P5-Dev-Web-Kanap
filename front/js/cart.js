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


})
})





