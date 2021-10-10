//============================= Add Into Cart Action =========================
//element
lblCart = document.getElementsByClassName("cart");

//get totalCart from local storage
var totalCart = parseInt(localStorage.getItem("totalCart"));
//check if totalCart exist in local storage
if(totalCart){
    //if true
    lblCart[0].innerHTML = totalCart;
}else{
    //if false
    lblCart[0].innerHTML = 0;
}

//btn add to cart action
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


    arrCart= [];
    //check if itemInCart exist in local storage
    itemInCart = localStorage.getItem("itamInCart");
    if(itemInCart){
        //if exist
        //convert string into array
        arrCart = itemInCart.split(',');
        product = "product"+i;
        //check if item exist in itemCart
        if(arrCart.includes(product)){
            //if true
        }else{
            //if false
            arrCart.push("product"+i);
            localStorage.setItem("itamInCart", arrCart);
        }
    }else{
        //if not
        //create the key
        arrCart.push("product"+i);
        localStorage.setItem("itamInCart", arrCart);
    }
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

    //put into object
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
displayCart();

function displayCart(){
    itemInCart = localStorage.getItem("itamInCart");
    if(itemInCart){
        //if exist
        //convert string into array
        arrCart = itemInCart.split(',');

        text ="";
        total = 0;
        payment = 0;
        for(let i=0; i<arrCart.length;i++){
            product = "product"+i;
    
            keyName = arrCart[i];

            objProduct = JSON.parse(localStorage.getItem(keyName));

            price =parseFloat(objProduct.productPrice);
            productInCart = parseInt(objProduct.productInCart);
    
            total =  price * productInCart;
    
            payment = payment + total;
    
            text = text +
            `
            <div class="box" id="`+keyName+`">
                <div class="product">
                    <div class="product-info">
                        <div class="name">`+objProduct.productName+`</div>
                        <div>RM <span class="">`+objProduct.productPrice+`</span></div>
                        <div class="delivery">Delivery: Free</div>
                        <div class="total-price">Total Price: RM `+ total.toFixed(2) +`</div>
                    </div>
                    <div class="quantity">
                        <button class="btn-decrement">-</button>
                            <span class="item-quantity">`+ objProduct.productInCart+`</span>
                        <button class="btn-increment">+</button>
                    </div>                    
                    <button class="btn-remove"><i class="fas fa-trash"></i>Remove</button>
                </div>
            </div>  
            `
           
        }
    
        cartContainer = document.getElementsByClassName("cart-container");
        cartContainer[0].innerHTML = text;
    
        cartContainer = document.getElementsByClassName("total-payment");
        cartContainer[0].innerHTML = "Total Payment: RM "+ payment.toFixed(2);

        removeFromCart();
        addMinusItem();
        
    }else{
        //if not
        cartContainer = document.getElementsByClassName("cart-container");
        cartContainer[0].innerHTML = "Cart Empty";

        cartContainer = document.getElementsByClassName("total-payment");
        cartContainer[0].innerHTML = "Total Payment: RM 0.00";
    }
}


//============================= End Display In Cart Page =========================

//============================= Btn Remove Action =========================

function removeFromCart(){
    btnRemove = document.getElementsByClassName("btn-remove");
    for(let i = 0; i<btnRemove.length; i++){
        btnRemove[i].addEventListener("click",function(){
            keyName = arrCart[i];
            //convert product to javascript object
            objProduct = JSON.parse(localStorage.getItem(keyName));
            //get current item in cart
            inCart = parseInt(objProduct.productInCart);
        
            //remove in cart from total cart
            totalCart = totalCart - inCart;
            //update cart inner html
            lblCart[0].innerHTML = totalCart;

            //set new totalcart
            localStorage.setItem("totalCart",totalCart);
            //remove product from local storage
            localStorage.removeItem(keyName);


            itemInCart = localStorage.getItem("itamInCart");

            arrCart = itemInCart.split(',');
            //remove item from arrCart
            //get keyName location in arrCart
            locationKeyName = arrCart.indexOf(keyName);
            //at location keyname remove 1 item
            arrCart.splice(locationKeyName, 1);

            //set new set new itemInCart
            localStorage.setItem("itamInCart",arrCart);

            //remove html element
            //get product id element
            productId = document.getElementById(keyName);
            productId.remove();

            displayCart();
            
        })
    }
}


//============================= End Btn Remove Action =========================

//============================= Btn Quantity Action =========================


function addMinusItem(){

    //get element
    var quantity = document.getElementsByClassName("quantity");
    var itemQuantity = document.getElementsByClassName("item-quantity");

    //button
    var btnDecrement = document.getElementsByClassName("btn-decrement");
    var btnIncrement = document.getElementsByClassName("btn-increment");


    for(let i = 0; i<quantity.length; i++){

        btnDecrement[i].addEventListener("click", function(){
            item = parseInt(itemQuantity[i].innerHTML);

             //update in totalCart local storage
             totalCart = parseInt(localStorage.getItem("totalCart"));
             newTotalCart = 0;
             if(item <= 1){
                 newTotalCart = totalCart;
                 item = 1;
             }else{
                 newTotalCart = totalCart - 1;
                 item = item - 1;
             }

             localStorage.setItem("totalCart",newTotalCart);
 
             lblCart = document.getElementsByClassName("cart");
             lblCart[0].innerHTML = localStorage.getItem("totalCart");
            
            itemQuantity[i].innerHTML = item;
            currentQuantity = itemQuantity[i].innerHTML;      
            
            //get itemincart value
            itemInCart = localStorage.getItem("itamInCart");
            //put into array 
            arrCart = itemInCart.split(',');
            keyName = arrCart[i];

            //update in product local storage
            //get product from local storage and convert to javascript obj
            objProduct = JSON.parse(localStorage.getItem(keyName));
            objProduct.productInCart = currentQuantity;
            const objProductjson = JSON.stringify(objProduct);
            localStorage.setItem(keyName, objProductjson);

            displayCart();
        });

        btnIncrement[i].addEventListener("click", function(){

            item = parseInt(itemQuantity[i].innerHTML);

             //update in totalCart local storage
             totalCart = parseInt(localStorage.getItem("totalCart"));
             newTotalCart = 0;
            if(item >= 10){
                alert("Item Reached Limit");
                newTotalCart = totalCart;
                item =10;
            }else{
                newTotalCart = totalCart + 1;
                item = item + 1;
            }

            localStorage.setItem("totalCart",newTotalCart);
 
            lblCart = document.getElementsByClassName("cart");
            lblCart[0].innerHTML = localStorage.getItem("totalCart");

            itemQuantity[i].innerHTML = item;
            currentQuantity = itemQuantity[i].innerHTML;      
            
            //get itemincart value
            itemInCart = localStorage.getItem("itamInCart");
            //put into array 
            arrCart = itemInCart.split(',');
            keyName = arrCart[i];

            //update in product local storage
            //get product from local storage and convert to javascript obj
            objProduct = JSON.parse(localStorage.getItem(keyName));
            objProduct.productInCart = currentQuantity;
            const objProductjson = JSON.stringify(objProduct);
            localStorage.setItem(keyName, objProductjson);

            displayCart();
        });
    }

}

//============================= End Btn Quantity Action =========================