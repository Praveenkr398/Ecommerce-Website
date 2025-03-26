let url = "https://fakestoreapi.com/products";

let Container = document.querySelector(".Product");
let inputBox = document.querySelector(".findProduct input");

// filter product

inputBox.addEventListener("keyup", () => {
  let filtervalue = inputBox.value.toUpperCase();

  item = document.querySelectorAll(".pro");
  for (let i = 0; i < item.length; i++) {
    let span = item[i].querySelector(".des h5");
    if (span.innerHTML.toUpperCase().indexOf(filtervalue) > -1) {
      item[i].style.display = "initial";
    } else {
      item[i].style.display = "none";
    }
  }
  // console.log(filtervalue)
});

// preview product;
let prevBox = document.querySelector(".prevDetail");

function showDetail(product) {
  let preview = document.createElement("div");
  console.log(product);
  preview.classList.add("preview");
  preview.innerHTML = `
   
            <div class="pleft">
                <img src=${product.image} alt="image preview">
            </div>
            <div class="pright">
                <div class="scat">category: ${product.category}</div>
                <h3>Title: <span>${product.title}</span></h3>
                <h4>Description: <span>${product.description.slice(
                  0,
                  200
                )}</span>
                </h4>
                <p>Rating <i class="fa fa-star" aria-hidden="true"></i> <span>${
                  product.rating.count
                }</span></p>
                <h3 id="pp">Price :💲<span>${product.price}</span></h3>
                <div class="choose">
                    <input id="count" type="number" value="1">
                    <input type="color" id="color" >
                </div>
                <div class="pBtns">
                   
                    <button>&nbsp;&nbsp;  Wishlist <i class="fa fa-heart "></i> </button>
                    <button>&nbsp;&nbsp;  Add to Cart <i class="fa fa-cart-plus cart"></i> </button>
                </div>

                <div class="close">&#10060</div>
            </div>
        
  `;
  preview.querySelector(".close").addEventListener("click", () => {
    preview.remove()
  });

  prevBox.appendChild(preview);
}

// fetch data from fake api store
let fetchProduct = () => {
    fetch(url)
  // fetch("/database.json")
    .then((res) => res.json())
    .then((products) => {
      products.forEach((product) => {
        // console.log(product)
        let productDiv = document.createElement("div");
        productDiv.classList.add("pro");
        productDiv.innerHTML = `
                <img src="${product.image}" alt="">
                <div class="des">
                    <span>${product.category}</span>
                    <h5>${product.title}</h5>
                    <div class="star">
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <span>${product.rating.rate}</span>
                    </div>
                    <h4>₹${product.price}</h4>
                </div>
                <a href="#"> <i class="fa fa-cart-plus cart"></i></a>
           
            `;
        let pImg = productDiv.querySelector("img");
        pImg.onclick = () => showDetail(product);
        Container.appendChild(productDiv);

        // add to cart

        const addCartButtons = productDiv.querySelectorAll(".cart");
        addCartButtons.forEach((button) => {
          button.addEventListener("click", (e) => {
            e.preventDefault();
            const productBox = e.target.closest(".pro");
            // console.log(productBox);
            addToCart(productBox);
            
          });
        });

        const listedCart = document.querySelector(".listCart");
        const addToCart = (productBox) => {
          const proImgSrc = productBox.querySelector("img").src;
          const proTitle = productBox.querySelector(".des h5").textContent;
          const proPrice = productBox.querySelector(".des h4").textContent;

       
          const cartBox = document.createElement("div");
          cartBox.classList.add(".listed");
          cartBox.innerHTML = `
                 <div class="listed">
                        <img src=${proImgSrc}>
                     <div class="info">
                        <h5 class="itag">${proTitle} </h5>
                        <p class="iPrice">Price: ${proPrice}</p>
                        <div class="proCount">
                            <button id="dec">-</button>
                            <span class="num">1</span>
                            <button id="inc">+</button>
                        </div>
                     </div>
                       <i class="fa fa-trash-o" aria-hidden="true"></i>
                 </div> `;

          listedCart.appendChild(cartBox);
          updateCounter(1);

          cartBox.querySelector(".fa-trash-o").addEventListener("click", () => {
            cartBox.remove();
            updateCounter(-1);
            UpdateAmount();
          });

          // item counter
          cartBox.querySelector(".proCount").addEventListener("click", (e) => {
            const num = cartBox.querySelector(".num");
            let iCount = num.textContent;
            if (e.target.id === "dec" && iCount > 1) {
              iCount--;
            } else if (e.target.id === "inc") {
              iCount++;
            }

            UpdateAmount();
            num.textContent = iCount;
          });

          const UpdateAmount = () => {
            const totalAmount = document.querySelector("#amount");
            const cartBoxex = cartBox.querySelectorAll(".listed");
            let Amount = 0;
            cartBoxex.forEach((cartbox) => {
              const Iprice = cartbox.querySelector(".iPrice");
              const Icount = cartbox.querySelector(".num");
              const price = Iprice.textContent.replace("Price: ₹", "");
              const count = Icount.textContent;

              Amount += price * count;
              console.log(Amount);
              totalAmount.textContent = `Amount : ₹${Amount}`;
            });
          };
          UpdateAmount();
        };
      });
    });
};

fetchProduct();

// cart badge update
let cartCounter = 0;
const updateCounter = (change) => {
  const itemBadge = document.querySelector("#badge");
  cartCounter += change;
  if (cartCounter > 0) {
    itemBadge.style.visibility = "visible";
    itemBadge.textContent = cartCounter;
  } else {
    itemBadge.style.visibility = "visible";
    itemBadge.textContent = cartCounter;
  }
};




// open and close cart tab

let closeBtn = document.querySelector(".CartClose")
let showHide  = document.querySelector(".shopSection")
let cartIcon  = document.querySelector(".myCart")

cartIcon.addEventListener('click',()=>{
    showHide.classList.toggle('activeTabCart')
})
closeBtn.addEventListener('click',()=>{
    showHide.classList.toggle('activeTabCart')
}) 
