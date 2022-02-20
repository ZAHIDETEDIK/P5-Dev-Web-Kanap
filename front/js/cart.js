const cart = []
recupItem()

cart.forEach((item) => displayItem(item))

const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (e) => submitForm(e))


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
    const article = makeArticle(item)
    const imageDiv = makeImageDiv(item)
    article.appendChild(imageDiv)

    const cardItemContent = makeCartContent(item)
    article.appendChild(cardItemContent)
    displayArticle(article)
    displayTotalQuantity()
    displayTotalPrice()
}
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
// Insertion de "description"
function makeDescription(item) {
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")

    const h2 = document.createElement("h2")
    h2.textContent = item.name

    const p = document.createElement("p")
    p.textContent = item.color;

    const p2 = document.createElement("p")
    p2.textContent = item.price + "€"

    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(p2)
    return description
}
