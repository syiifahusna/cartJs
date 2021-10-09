//============================= Add Into Cart Action =========================
//element
lblCart = document.getElementsByClassName("cart");
var totalCart = parseInt(localStorage.getItem("totalCart"));
//check if totalCart exist in local storage
if(totalCart){
    //if true
    lblCart[0].innerHTML = totalCart;
}else{
    //if false
    lblCart[0].innerHTML = 0;
}

//button
btnAddToCart = document.getElementsByClassName("btn-cart");

for(let i=0;i<btnAddToCart.length;i++){
    btnAddToCart[i].addEventListener("click", function(){
        addToCart(i);
    });
}

//total in cart
function addToCart(i){
    totalCart = parseInt(lblCart[0].innerHTML);
    totalCart = totalCart + 1;
    localStorage.setItem("totalCart",totalCart);
    lblCart[0].innerHTML = localStorage.getItem("totalCart");
    addProduct(i);
}

//add product into cart
function addProduct(i){
    productName = document.getElementsByClassName("name");
    productName = productName[i].innerHTML;

    productPrice = document.getElementsByClassName("price");
    productPrice = productPrice[i].innerHTML;
    
    //check if key product exist in local storage
    if(localStorage.getItem("product"+i)){
        //if true
        //convert into object
        objProduct = JSON.parse(localStorage.getItem("product"+i));
        productInCart = parseInt(objProduct.productInCart);
        productInCart = productInCart +1;
    }else{
        //if false
        productInCart = 1;
    }

    var objProduct = {
        "productName": productName,
        "productPrice": productPrice,
        "productInCart": productInCart
    }

    //convert into string and store in local storage
    //note that local storage can only store string
    const objProductjson = JSON.stringify(objProduct);
    localStorage.setItem("product"+i, objProductjson);
}


//============================= End Add Into Cart Action =========================

//============================= Display In Cart Page =========================
   

//============================= End Display In Cart Page =========================

//============================= Btn Remove Action =========================

btnRemove = document.getElementsByClassName("btn-remove");

for(let i = 0; i<btnRemove.length; i++){
    btnRemove[i].addEventListener("click",function(){
        product = "product"+i;
        //convert to javascript object
        objProduct = JSON.parse(localStorage.getItem(product));
        //get current item in cart
        inCart = parseInt(objProduct.productInCart);
        
        //remove in cart from total cart
        totalCart = totalCart - inCart;
        //update cart inner html
        lblCart[0].innerHTML = totalCart;

        //set new totalcart
        localStorage.setItem("totalCart",totalCart);
        //remove product from local storage
        localStorage.removeItem(product);
        //remove html element
        //get product id element
        productId = document.getElementById(product);
        productId.remove();
    })
}
//============================= End Btn Remove Action =========================

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
//============================= End Btn Quantity Action =========================