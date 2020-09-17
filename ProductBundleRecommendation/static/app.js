let range = document.querySelector("#range");
let rangeoutput = document.querySelector("#rangeoutput");
let search = document.querySelector("#search");
let outputlist = document.querySelector("#datalist");
let registermodal = document.querySelector(".register-modal");
const modal = document.querySelector(".modal-content");

let productkey = []
//lets limit product search upto 30
let limit = 0
//fetch the json data
url = 'http://127.0.0.1:8000/static/data.json'
fetch(url)
.then((resp) => resp.json())
.then(function(data){
    productkey = Object.keys(data)
})

//funcion call
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
            UserSubmit(e,'/account/signup/');
        });
         
    }
    request.send();
}

function UserSubmit(e,url){
    let username = document.querySelector("input[name=username]").value;
    let password1 = document.querySelector("input[name=password1]").value;
    let password2 = document.querySelector("input[name=password2]").value;
    let data = {
        username: username,
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
                UserSubmit(e,'/account/signup/');
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

//events
range.addEventListener("input",()=>{
    rangeoutput.innerHTML = `<output class="text-danger"> <strong>${range.value}</strong></output>`;
})

search.addEventListener("input",(e)=>{
    showSuggestion(e);
})

registermodal.addEventListener("click",()=>{
    ShowModalRegister();
})

// window.onload=function(){
//     document.querySelector(".register").click();
//   };