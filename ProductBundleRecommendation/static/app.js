let range = document.querySelector("#range")
let rangeoutput = document.querySelector("#rangeoutput")


//events
range.addEventListener("input",()=>{
    rangeoutput.innerHTML = `<output class="text-danger"> <strong>${range.value}</strong></output>`;
})