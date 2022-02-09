const idProduct=new URL(window.location.href).searchParams.get("id")
console.log(idProduct)
let article=""
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
  








