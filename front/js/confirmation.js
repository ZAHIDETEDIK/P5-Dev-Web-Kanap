function confirmation() {
    const params = new URLSearchParams(document.location.search);
    const idOrder = params.get("id");
    if (idOrder != null) {
        let idElement = document.querySelector("#orderId");
        idElement.innerHTML = idOrder;
        localStorage.clear();
    }
} 
confirmation();

