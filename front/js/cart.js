const cart=[]
recuperLesItems()
cart.forEach((item) => showItem(item))
    
function recuperLesItems(){
    const numberOfItem=localStorage.length 
    for (let i=0;i<numberOfItem;i++){  
        const item=localStorage.getItem(localStorage.key(i))
        const itemOject=JSON.parse(item)
        cart.push(itemOject)
    }
}
function showItem(item){

}