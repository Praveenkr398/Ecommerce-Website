// Index.html: script for navbar
const bar = document.getElementById("bar")
const close = document.getElementById("close")
const nav = document.getElementById("navbar")

if (bar){
    bar.addEventListener("click", ()=>{
        nav.classList.add("active");
    })
}

if (close){
    close.addEventListener("click", ()=>{
        nav.classList.remove("active");
    })
}





// // sProduct.html : script for switching img
var mainImg = document.getElementById("mainImg");
var smallImg = document.querySelectorAll(".small-img");

smallImg.forEach((box)=>{
    
    box.addEventListener('click',(e)=>{
    mainImg.src = e.target.src
    console.log(mainImg)
})
})