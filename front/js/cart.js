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
// Affichage des éléments du Panier
function displayItem(item) {

    const article=makeArticle(item)
    displayArticle
    const div = makeImageDiv(item)
    article.appendChild(div)
}
    function displayArticle(article){

        document.querySelector("#cart__items").appendChild(article)

    }

    function makeArticle(item){

        const article=document.createElement("article")
        article. classlist .add ("card__item")
        article.dataset.id=item.id
        article.dataset.color=item.color
    }

function makeImageDiv(item){

         const div=document.createElement("div")
         div .classlist.add("cart__item__img")
         const image= document.createElement("img")
         image.src=item.imageUrl
         image.alt=item.altTxt
         div.appendChild(image)
        return div

        // Création de la div "cart__item__content"
function makeCartContent(item) {
    const cardItemContent = document.createElement("div")
    cardItemContent.classList.add("cart__item__content")

    const description = makeDescription(item)
    const settings = makeSettings(item)

    cardItemContent.appendChild(description)
    cardItemContent.appendChild(settings)
    return cardItemContent
}

// Création du settings
function makeSettings(item) {
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")
    
    addQuantityToSettings(settings, item)
    addDeleteToSettings(settings, item)
    return settings
}

}
