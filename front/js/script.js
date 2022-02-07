fetch("http://localhost:3000/api/products")
.then((response) => response.json())
.then((res) => 
{console.log(res)
res.forEach (produit=>
    {
        const images=produit.imageUrl 
        let lien=document.createElement("a")
        lien.href=produit.imageUrl
        const items=document.getElementById("items")
        items.appendChild(lien)
        
        let productArticle=document.createElement("article") 
        lien.appendChild(productArticle)
        
        let productImg=document.createElement("img")
        productImg.src=produit.imageUrl
        productImg.alt=produit.altTxt
        productArticle.appendChild(productImg)
       
        let productName=document.createElement("h3")
        productName.classList.add("productName")
        productName.innerHTML=produit.name
        productArticle.appendChild(productName)
       
        let productDescription=document.createElement("p")
        productDescription.classList.add("productName")
        productDescription.innerHTML=produit.description
        productArticle.appendChild(productDescription)
       
    })
}
)