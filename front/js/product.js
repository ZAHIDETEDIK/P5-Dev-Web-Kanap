const idProduct=new URL(window.location.href).searchParams.get("id")
const button=document.querySelector("#addToCart") 
      button. addEventListener("click",addTocart) 

getArticle()

function getArticle(){
fetch(`http://localhost:3000/api/products/${idProduct}`)
.then((response) => response.json())
.then (product=>
{
      let productImg=document.createElement("img")
      document.querySelector(".item__img").appendChild(productImg)
      productImg.src=product.imageUrl
      productImg.alt=product.altTxt
  

      let productName=document.getElementById("title")
      productName.innerHTML=product.name
  
      let productDescription=document.getElementById("description")
      productDescription.innerHTML=product.description 
  
      let productPrice=document.getElementById("price")
      productPrice.innerHTML=product.price

      for(let colors of product.colors){
      console.table(colors)
      let productColors=document.createElement("option")
      document.querySelector("#colors").appendChild(productColors)
      productColors.value=colors
      productColors.innerHTML=colors

     }
})
}
      
function addTocart(e)
{
      const color = document.querySelector("#colors").value
      const quantity = document.querySelector("#quantity").value
      if (color==null ||color==""|| quantity==null||quantity==0)
      { 
            alert ("svp choisissez une couleur et une quantité")
            return
      } 
      let name=document.querySelector("#name")
      let price=document.querySelector("#price").textContent
//options des articles
      let option = { 
      id:idProduct,
      couleur:color,
      quantity:Number(quantity),
      price:price,
      img:imageUrl.src,
      altTxt:imageUrl.alt,
      name:title.textContent,

      }
      let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
        //Importation dans le local storage
    //Si le panier comporte déjà au moins 1 article
    if (produitLocalStorage) {
      const resultFind = produitLocalStorage.find(
          (el) => el.idProduit === idProduct && el.couleur === color);
          //Si le produit commandé est déjà dans le panier
          if (resultFind) {
              let newQuantite =
              parseInt(option.quantity + parseInt(resultFind.quantiteProduit))
              resultFind.quantity = newQuantite;
              localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
              console.table(produitLocalStorage);
          //Si le produit commandé n'est pas dans le panier
          } else {
              produitLocalStorage.push(option);
              localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
              console.table(produitLocalStorage);
          }
      //Si le panier est vide
      } else {
          produitLocalStorage =[];
          produitLocalStorage.push(option);
          localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
          console.table(produitLocalStorage);
      }}
      window.location.href="cart.html" 
      
         










  

 
  
    

