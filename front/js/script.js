
fetch("http://localhost:3000/api/products")
.then((response) => response.json())
.then((res) => 
{console.log(res)
res.forEach (produit=>

    {
        let lien=document.createElement("a")
        document.querySelector(".items").appendChild(lien)
        lien.href=`product.html?id=${produit._id}`
        
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
})
