const params = new URLSearchParams(document.location.search);
const idOrder = params.get("id");
console.log(orderId)
console.log (idOrder)

let idElement = document.querySelector("#orderId");
idElement.innerHTML = idOrder;
localStorage.clear();



