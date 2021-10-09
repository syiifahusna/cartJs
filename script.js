//============================= Btn Quantity Action =========================
//get element
var quantity = document.getElementsByClassName("quantity");
var itemQuantity = document.getElementsByClassName("item-quantity");

//button
var btnDecrement = document.getElementsByClassName("btn-decrement");
var btnIncrement = document.getElementsByClassName("btn-increment");

for(let i = 0; i<quantity.length; i++){
    btnDecrement[i].addEventListener("click", function(){
        item = parseInt(itemQuantity[i].innerHTML);
        if(item <= 1){
            alert("Item Reached Limit");
            item = 1;
        }else{
            item = item - 1;
        }
        itemQuantity[i].innerHTML = item;
    });

    btnIncrement[i].addEventListener("click", function(){
        item = parseInt(itemQuantity[i].innerHTML);
        if(item >= 10){
            alert("Item Reached Limit");
            item =10;
        }else{
            item = item + 1;
        }
        
        itemQuantity[i].innerHTML = item;
    });
}
