const params = new URLSearchParams(document.location.search);
const idOrder = params.get("orderId");
console.log(orderId)
let idElement = document.getElementById("orderId");
idElement .innerText = orderId;


