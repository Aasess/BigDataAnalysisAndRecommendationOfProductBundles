let range = document.querySelector("#range");
let rangeoutput = document.querySelector("#rangeoutput");
let search = document.querySelector("#search");
let outputlist = document.querySelector("#datalist");
let registermodal = document.querySelector(".register-modal");
let loginmodal = document.querySelector(".login-modal");
let modal = document.querySelector(".modal-content");
let productkey = []
let prevScrollpos = window.pageYOffset;
let cart = document.querySelector(".cart");
let availablecartaddbtn = document.querySelector(".cartaddbtn");
let recommendcartaddbtn = document.querySelector(".recommendcartaddbtn");
let qtyAll = ""
let deletebtns = ""

//lets limit product search upto 30
let limit = 0
//fetch the json data
url = 'http://127.0.0.1:8000/static/data.json'
fetch(url)
.then((resp) => resp.json())
.then(function(data){
    productkey = Object.keys(data)
});


//----------------------funcion call-------------------------------------------

function scrollfunction(){
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("nav").style.top = "0";
    } else {
        document.getElementById("nav").style.top = "-67.75px";
    }
    prevScrollpos = currentScrollPos;
}

function showSuggestion(e){
    
    document.querySelector('#datalist').innerHTML = '';
    //length of product rules key or tags
    len_tag = productkey.length
    //length of entered content
    len_input = e.target.value.length
    if(len_input >= 3){
         //for loop
    for(var i=0;i<len_tag;i++){
        if(((productkey[i].toLowerCase()).indexOf(e.target.value.toLowerCase()))>-1){
            //comparing if input string is existing in productkey[i] string
            if(limit <= 30){
                var node = document.createElement("option");
                var val = document.createTextNode(productkey[i]); 
                node.appendChild(val);
                limit = limit + 1;
                //creating and appending new elements in data list
                document.getElementById("datalist").appendChild(node);  
            }
           
        }
        }
        limit = 0 
    }
}

function ShowModalRegister(){
    new BSN.Modal('#Modal-user', { backdrop: true }).show();
    //ajax call
    let request = new XMLHttpRequest();
    request.open("GET","/account/signup/",true);
    request.setRequestHeader('X-Requested-With','XMLHttpRequest');
    request.setRequestHeader('Content-type','application/json','charset=UTF-8');
    request.onload = function (){
        let formpage = JSON.parse(this.responseText).html_form;
        modal.innerHTML = formpage;  
        let form = modal.querySelector("#form");
        csrf = document.querySelector("input[name=csrfmiddlewaretoken]").value;
        
        form.addEventListener("submit",(e)=>{
            UserRegistrationSubmit(e,'/account/signup/');
        });
         
    }
    request.send();
}


function UserRegistrationSubmit(e,url){
    let firstname = document.querySelector("input[name=first_name").value;
    let lastname = document.querySelector("input[name=last_name").value;
    let email = document.querySelector("input[name=email]").value;
    let password1 = document.querySelector("input[name=password1]").value;
    let password2 = document.querySelector("input[name=password2]").value;
    let data = {
        first_name:firstname,
        last_name: lastname,
        email:email,
        password1: password1,
        password2: password2

    }
    e.preventDefault(); 
    let request = new XMLHttpRequest();
    request.open("POST",url,true);
    request.setRequestHeader('X-Requested-With','XMLHttpRequest');
    request.setRequestHeader('Content-type','application/json','charset=UTF-8');
    request.setRequestHeader('X-CSRFToken',`${csrf}`);
    request.onload = function(){
        if(JSON.parse(this.responseText).html_form){
            let formpage = JSON.parse(this.responseText).html_form;
            modal.innerHTML = formpage;
            let form = modal.querySelector("#form");
            csrf = document.querySelector("input[name=csrfmiddlewaretoken]").value
            form.addEventListener("submit",(e)=>{
                UserRegistrationSubmit(e,'/account/signup/');
            });
        }  
        else{
        //close the form
        new BSN.Modal('#Modal-user', { backdrop: true }).hide();
        location.reload();
        }
    }
    request.send(JSON.stringify(data));
}


function ShowModalLogin(){
    new BSN.Modal('#Modal-user',{ backdrop: true }).show();
    //ajax call
    let request = new XMLHttpRequest();
    request.open("GET","/account/login/",true);
    request.setRequestHeader('X-Requested-With','XMLHttpRequest');
    request.setRequestHeader('Content-type','application/json','charset=UTF-8');
    request.onload = function(){
        console.log("login form")
        let formpage = JSON.parse(this.responseText).html_form;
        modal.innerHTML = formpage;  
        let form = modal.querySelector("#formlogin");
        csrf = document.querySelector("input[name=csrfmiddlewaretoken]").value; 
        form.addEventListener("submit",(e)=>{
            
            UserLoginSubmit(e,'/account/login/');
        });
    }
    request.send();
}

function UserLoginSubmit(e,url){
    let email = document.querySelector("input[name=email]").value;
    let password = document.querySelector("input[name=password]").value;
    let data = {
        email:email,
        password: password,
    }
    console.log(url)
    e.preventDefault();
    let request = new XMLHttpRequest();
    request.open("POST",url,true);
    request.setRequestHeader('X-Requested-With','XMLHttpRequest');
    request.setRequestHeader('Content-type','application/json','charset=UTF-8');
    request.setRequestHeader('X-CSRFToken',`${csrf}`);
    request.onload = function(){
        if(JSON.parse(this.responseText).html_form){
            let formpage = JSON.parse(this.responseText).html_form;
            modal.innerHTML = formpage;
            let form = modal.querySelector("#formlogin");
            csrf = document.querySelector("input[name=csrfmiddlewaretoken]").value
            form.addEventListener("submit",(e)=>{
                UserLoginSubmit(e,'/account/login/');
            });
        }  
        else{
        //close the form
        new BSN.Modal('#Modal-user', { backdrop: true }).hide();
        location.reload();
        }
    }
    request.send(JSON.stringify(data));
}

function ShowCartdetail(e){
    e.stopPropagation();
    document.querySelector(".cart-popup").classList.toggle("cart-popup-block-display");
    
}

function CartLocalStorage(productname){
        if(localStorage.length > 0){
            objectcart = [];
            objectcart.push(localStorage.getItem('object'));
        }
        if(document.querySelector(`.${productname}:checked`)){
            productnameclicked = document.querySelector(`.${productname}:checked`).value;
            
            objectcart.push(JSON.stringify({
                product_name_cart:productnameclicked,
                qty: 1
            }));
            localStorage.setItem('object',objectcart)
            
        }
}


function QualityChange(e){
    tempcartobject = "";
    sum = 0;
    populatelocalStorage = localStorage.getItem('object').split('},').join('}$').split('$');
    p_name =e.target.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.innerText;
    populatelocalStorage.forEach((eachproductdetail)=>{
    var parsed_product = JSON.parse(eachproductdetail);
        if(p_name == parsed_product["product_name_cart"]){
            parsed_product["qty"] = parseInt(e.target.value);
        }
        sum += parsed_product["qty"]; 
        tempcartobject += JSON.stringify(parsed_product).split('}').join('},');
    
    });
    tempcartobject = tempcartobject.slice(0,-1);
    localStorage.setItem('object',tempcartobject);
    document.querySelector(".cart-count").innerText = sum;
    
};


// ----------------display productname and quantity to cart--------------
function displayProduct(){ 
    if(localStorage.length > 0){
        populatelocalStorage = localStorage.getItem('object').split('},').join('}$').split('$');
        sum = 0;
        document.querySelector(".cart-body").innerText = '';
        populatelocalStorage.forEach((eachproductdetail)=>{
            parsed_product = JSON.parse(eachproductdetail);
            sum += parsed_product["qty"];
            document.querySelector(".cart-body").innerHTML += `<div class="card mb-1">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-10 productnamecart">
                                    <p>${parsed_product['product_name_cart']}</p>
                                </div>
                                <div class="col-2 text-right text-danger" title="delete product from cart">
                                        <i class="fa fa-times-circle fa-lg deleteproduct" aria-hidden="true"></i>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-4 input-group input-group-sm">
                                    <strong class="pr-2 pt-1">Qty: </strong><input type="number"  min="1" step="1" class="form-control" value=${parsed_product['qty']}>
                                </div>
                            </div>
                        </div>
                    </div>`
                    console.log("are you in loop then?")
    });
    document.querySelector(".cart-count").innerText = sum;
    qtyAll = document.querySelectorAll("input[type=number]");
    deletebtns = document.querySelectorAll(".deleteproduct");
    console.log(deletebtns)
   
    }
    else{
        
        document.querySelector(".cart-count").innerText = 0;
        document.querySelector(".cart-body").innerHTML = '<p class="text-center text-danger mt-2"><strong>No items added to the cart</strong></p>';
    }
}

displayProduct();
//-------------------events---------------------------------
range.addEventListener("input",()=>{
    rangeoutput.innerHTML = `<output class="text-danger"> <strong>${range.value}</strong></output>`;
});

search.addEventListener("input",(e)=>{
    showSuggestion(e);
});

if(!document.querySelector(".user-logout")){
    registermodal.addEventListener("click",()=>{
        ShowModalRegister();
    });
    
    loginmodal.addEventListener("click",()=>{
        ShowModalLogin();
    })
}


//when user scrolls down, hide the navbar. when user scrolls up,show the navbar
window.addEventListener("scroll",scrollfunction)


//when cart is clicked
cart.addEventListener("click",ShowCartdetail)


document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("fa-angle-down")){
        document.querySelector(".cart-popup").classList.remove("cart-popup-block-display")
    }
})




//store to local storage when cart btns are clicked
availablecartaddbtn.addEventListener("click",()=>{
    CartLocalStorage("availableproductname");
});

if(recommendcartaddbtn){
    recommendcartaddbtn.addEventListener("click",()=>{
    CartLocalStorage("recommendedproductname");
});
}
//when quantity inside cart is changed
qtyAll.forEach((qty)=>{
    qty.addEventListener("change",QualityChange);
});

//when delete button inside cart is clicked
deletebtns.forEach((dltbtn)=>{
    dltbtn.addEventListener("click",(e)=>{
       DeleteProductFromCart(e,displayProduct)
    });
});

function DeleteProductFromCart(e,callback){
    console.log("clicked")
    populatelocalStorage = localStorage.getItem('object').split('},').join('}$').split('$');
    p_name =e.target.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.innerText;
    var pet = populatelocalStorage.filter((eachproductdetail)=>{
        var parsed_product = JSON.parse(eachproductdetail);
        return (p_name != parsed_product["product_name_cart"]);
    });
    pet = JSON.stringify(pet).replace(/\\/g, "").split('}","{').join("},{");
     pet = pet.slice(2,-2);
     if(pet.length > 0){
        localStorage.setItem('object',pet);
        
     }else{
         localStorage.clear();
     }
    callback();   
}