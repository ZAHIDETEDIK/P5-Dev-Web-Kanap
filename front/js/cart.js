let productInLocalStorage = JSON.parse(localStorage.getItem('products'));
console.log(productInLocalStorage);


// Récupération des articles de l'API et des données de l'API dans le DOM
//
fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => {
        if (productInLocalStorage) {
            for (p of productInLocalStorage) {
                // selection de l'objet back correspondant a l'objet storage
                const product = data.find(d => d._id === p.idProduit);
                if (product) {
                    // on affecte le prix au produit du local storage
                    p.price = product.price;
                }
            }
        }
        dansPanier();
        productSuprimme();
        modifQuantite();
        getTotals()



    });

function dansPanier() {
    // Si le panier est vide 
    if (!productInLocalStorage) {

        const titleCart = document.querySelector("h1");
        const sectionCart = document.querySelector(".cart");

        titleCart.innerHTML = "Votre panier est vide !";
        sectionCart.style.display = "none";
        // Si le panier est remplie
    } else {
        productInLocalStorage.forEach((produit, i) => {

            // Insertion de l'élément "article"
            let productArticle = document.createElement("article");
            document.querySelector("#cart__items").appendChild(productArticle);
            productArticle.className = "cart__item";
            productArticle.setAttribute('data-id', produit._id);


            // Insertion de l'élément "div"
            let productDivImg = document.createElement("div");
            productArticle.appendChild(productDivImg);
            productDivImg.className = "cart__item__img";


            // Insertion de l'image
            let productImg = document.createElement("img");
            productDivImg.appendChild(productImg);
            productImg.src = produit.imageUrl;
            productImg.alt = produit.altTxt;

            // Insertion de l'élément "div"            
            let productItemContent = document.createElement("div");
            productArticle.appendChild(productItemContent);
            productItemContent.className = "cart__item__content";

            // Insertion de l'élément "div"
            let productItemContentDescription = document.createElement("div");
            productItemContent.appendChild(productItemContentDescription);
            productItemContentDescription.className = "cart__item__content__description";

            // Insertion de l'élément "h2"
            let productTitle = document.createElement("h2");
            productItemContentDescription.appendChild(productTitle);
            productTitle.innerHTML = produit.name;


            // Insertion de la couleur
            let productGreen = document.createElement("p");
            productTitle.appendChild(productGreen);
            productGreen.innerHTML = produit.couleurProduit;

            // Insertion de l'élément "p"
            let productPrice = document.createElement("p");
            productTitle.appendChild(productPrice);
            productPrice.innerHTML = produit.price + " €";

            // Insertion de l'élément "div"
            let productItemSettings = document.createElement("div");
            productArticle.appendChild(productItemSettings);
            productItemSettings.className = "cart__item__content__settings";

            // Insertion de l'élément "div"
            let productItemSettingsQuantity = document.createElement("div");
            productItemSettings.appendChild(productItemSettingsQuantity);
            productItemSettingsQuantity.className = "cart__item__content__settings__quantity";


            // Insertion de "Qté : "
            let productQte = document.createElement("p");
            productItemSettingsQuantity.appendChild(productQte);
            console.log(produit)
            productQte.innerHTML = "Qté : ";


            // Insertion de la quantité
            let productInsertionQuantity = document.createElement("input");
            productItemSettingsQuantity.appendChild(productInsertionQuantity);
            productInsertionQuantity.className = "itemQuantity";
            productInsertionQuantity.value = produit.quantiteProduit;
            productInsertionQuantity.setAttribute("type", "number");
            productInsertionQuantity.setAttribute("name", "itemQuantity-" + produit.idProduit);
            productInsertionQuantity.setAttribute("min", "1");
            productInsertionQuantity.setAttribute("max", "100");


            // Insertion de l'élément "div"
            let productItemContentSettingsDelete = document.createElement("div");
            productArticle.appendChild(productItemContentSettingsDelete);
            productItemContentSettingsDelete.className = "cart__item__content__settings__delete";


            // Insertion de "p" supprimer
            let productItemDelete = document.createElement("p");
            productItemContentSettingsDelete.appendChild(productItemDelete);
            productItemDelete.className = "deleteItem";
            productItemDelete.innerHTML = "Supprimer";
        })
       
    }
}

function getTotals() {
    // Récupération du total des quantités
    let elementsQuantity = document.getElementsByClassName("itemQuantity");
    console.log(elementsQuantity);
    let quantityTotal = 0;

    for (let i = 0; i < elementsQuantity.length; ++i) {
        quantityTotal += elementsQuantity[i].valueAsNumber;
    }

    let productTotalQuantity = document.getElementById("totalQuantity");
    productTotalQuantity.innerHTML = quantityTotal;
    

    // Récupération du prix total
    let priceTotal = 0;

    for (let i = 0; i < elementsQuantity.length; ++i) {
        priceTotal += (elementsQuantity[i].valueAsNumber * productInLocalStorage[i].price);
        
    }

    let productTotalPrice = document.getElementById("totalPrice");
    productTotalPrice.innerHTML = priceTotal;
    

}

// Suppression d'un produit
function productSuprimme() {
    let buttonDelete = document.querySelectorAll(".deleteItem");

    for (let a = 0; a < buttonDelete.length; a++) {
        buttonDelete[a].addEventListener("click", (e) => {
            e.preventDefault();

            //Selection de l'element à modifier en fonction de son id ET sa couleur
            let idDelete = productInLocalStorage[a].idProduit;
            let colorDelete = productInLocalStorage[a].couleurProduit;


            productInLocalStorage = productInLocalStorage.filter(element => element.idProduit !== idDelete || element.couleurProduit !== colorDelete)
            // suppresion de la propriete price dans chaue objet
            productInLocalStorage.map(p => delete p.price)
            localStorage.setItem("products", JSON.stringify(productInLocalStorage));

            if (productInLocalStorage.length === 0) {
                localStorage.removeItem('products');
            }


            alert("Ce produit a bien été supprimé du panier");
            location.reload();
        })
    }
}


//Fonction Modification de la quantité

function modifQuantite() {
    //Selection de l'element à modifier en fonction de son id ET sa couleur
    let modifyQte = document.querySelectorAll(".itemQuantity");

    for (let c = 0; c < modifyQte.length; c++) {
        modifyQte[c].addEventListener("change", (e) => {
            e.preventDefault();
            if (modifyQte[c].name === "itemQuantity-" + productInLocalStorage[c].idProduit) {

                let quantiteModifValue = modifyQte[c].valueAsNumber;

                productInLocalStorage[c].quantiteProduit
                productInLocalStorage[c].quantiteProduit = quantiteModifValue;
                // suppresion de la propriete price dans chaue objet
                productInLocalStorage.map(p => delete p.price)

                localStorage.setItem("products", JSON.stringify(productInLocalStorage));
                location.reload();
            }
        })
    }
}
    

    let form = document.querySelector(".cart__order__form");

    // Ecoute de la modification du prénom
    form.firstName.addEventListener('change', function () {
        validFirstName(this);
    });

    // Ecoute de la modification du nom
    form.lastName.addEventListener('change', function () {
        validLastName(this);
    });

    // Ecoute de la modification de l'adresse
    form.address.addEventListener('change', function () {
        validAddress(this);
    });

    // Ecoute de la modification de la ville
    form.city.addEventListener('change', function () {
        validCity(this);
    });

    // Ecoute de la modification de l'email
    form.email.addEventListener('change', function () {
        validEmail(this);
    });
     //validation du Prénom
     const validFirstName = function (inputFirstName) {
        let firstNameErrorMsg = inputFirstName.nextElementSibling;

        if (letterRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
        } else {
            firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        }
    };
    // validation du nom
    const validLastName = function (inputLastName){
      let   lastNameErrorMsg=inputLastName.nextElementSibling;

      if (letterRegExp.test(inputLastName.value)){
            lastNameErrorMsg.innerHTML ='';
      }else {
          lastNameErrorMsg.innerHTML ='Veuillez renseigner ce champ.';
      }
      
    };

    // validation de l'adresse
    const validAddress = function (inputAdress){
        let addressErrorMsg=inputAdress.nextElementSibling;

        if (adressRegExp.test(inputAdress.value)){
            addressErrorMsg.innerHTML='';

        } else {
            addressErrorMsg.innerHTML = 'veuillez renseigner ce champ.'
        }
    };
    // validation de la ville 
    const validCity = function (inputCity){
        let cityErrorMsg = inputCity.nextElementSibling;

        if (letterRegExp.test(inputCity.value)){
            cityErrorMsg.innerHTML=''
        } else{
            cityErrorMsg.innerHTML = 'veuillez renseigner ce champ'
        } 

    }

    







