//đặt biến cho category để nhận render theo category
const account_login = JSON.parse(localStorage.getItem("account_login"))
const products_it = document.getElementById("products_it")
const products_marketing = document.getElementById("products_marketing")
const products_giao_tiep = document.getElementById("products_giao_tiep")
const products_phap_luat = document.getElementById("products_phap_luat")
const products_suc_khoe = document.getElementById("products_suc_khoe")
const products_me_va_be = document.getElementById("products_me_va_be")
const sp_quantity_cart = document.getElementById("sp_quantity_cart")

const btn_search_with_title = document.getElementById("btn_search_with_title")

btn_search_with_title.addEventListener("click", ()=>{
    let productNameSearch = document.getElementById("ip_key_search_with_title").value;
    renderProducts(productNameSearch);
})

//hiển thị số lượng sản phẩm của giỏ hàng
function renderQuantityProductCart() {
    const account = JSON.parse(localStorage.getItem("account_login"));
    if (!account){
        return;
    }
    let carts = JSON.parse(localStorage.getItem(`carts_${account.id}`)) || [];  
    sp_quantity_cart.innerHTML = carts.length; 
}

renderQuantityProductCart();

//Search product by name, sort

function renderProducts(productName, sort){ 
    let list_products = JSON.parse(localStorage.getItem('products')) || [];
    let list_temp = []

//Search by name
    if (productName){
        for (let product of list_products){
            if (product.productName.toLowerCase().includes(productName.toLowerCase())){
                list_temp.push(product)
            }
        }
        list_products = list_temp;
    }

//Sort by price
    if (sort){
        switch(sort){
            case 'increase':
                list_products.sort((a, b) => a.price - b.price)
            break;
            case 'decrease':
                list_products.sort((a, b) => b.price - a.price)
            break;
        }
    }


//Render products to Home Page, by category
    let htmls_it = ``;
    let htmls_marketing = ``;
    let htmls_giao_tiep = ``;
    let htmls_phap_luat = ``;
    let htmls_suc_khoe = ``;
    let htmls_me_va_be = ``;
   
    for (let product of list_products){
        switch(product.category){
            //IT
            case "IT": 
                htmls_it += `  
                    <div class="col-sm-3">
                        <div class="thumb-wrapper">
                            <div class="img-box">
                                <a href="http://127.0.0.1:5500/project_modul01_book_store/detail.html?id=${product.id}">
                                    <img src="${product.img}" class="img-responsive" alt="">
                                </a>
                            </div>
                            <div class="thumb-content">
                                <h4>${product.productName}</h4>
                                <p class="item-price"><strike>$200</strike> <span>$${product.price}</span></p>
                                <div class="star-rating">
                                    <ul class="list-inline">
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                    </ul>
                                </div>
                                <span onclick="addToCart(${product.id})" class="btn btn-primary">Add to Cart</span>
                            </div>
                        </div>
                    </div>
               `
            break;
            //Marketing
            case "Marketing":  
                htmls_marketing += `
                    <div class="col-sm-3">
                        <div class="thumb-wrapper">
                            <div class="img-box">
                            <a href="http://127.0.0.1:5500/project_modul01_book_store/detail.html?id=${product.id}">
                                <img src="${product.img}" class="img-responsive" alt="">
                            </a>
                            </div>
                            <div class="thumb-content">
                                <h4>${product.productName}</h4>
                                <p class="item-price"><strike>$400.00</strike> <span>$${product.price}</span></p>
                                <div class="star-rating">
                                    <ul class="list-inline">
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                    </ul>
                                </div>
                                <span onclick="addToCart(${product.id})" class="btn btn-primary">Add to Cart</span>
                            </div>
                        </div>
                    </div>
                `
            break;
            //Giao Tiếp
            case "Giao Tiếp": 
                htmls_giao_tiep += `
                    <div class="col-sm-3">
                        <div class="thumb-wrapper">
                            <div class="img-box">
                            <a href="http://127.0.0.1:5500/project_modul01_book_store/detail.html?id=${product.id}">
                                <img src="${product.img}" class="img-responsive" alt="">
                            </a>
                            </div>
                            <div class="thumb-content">
                                <h4>${product.productName}</h4>
                                <p class="item-price"><strike>$400.00</strike> <span>$${product.price}</span></p>
                                <div class="star-rating">
                                    <ul class="list-inline">
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                    </ul>
                                </div>
                                <span onclick="addToCart(${product.id})" class="btn btn-primary">Add to Cart</span>
                            </div>
                        </div>
                    </div>
                `
            break;
            //Pháp Luật
            case "Pháp Luật": 
                htmls_phap_luat += `
                    <div class="col-sm-3">
                        <div class="thumb-wrapper">
                            <div class="img-box">
                            <a href="http://127.0.0.1:5500/project_modul01_book_store/detail.html?id=${product.id}">
                                <img src="${product.img}" class="img-responsive" alt="">
                            </a>
                            </div>
                            <div class="thumb-content">
                                <h4>${product.productName}</h4>
                                <p class="item-price"><strike>$200</strike> <span>$${product.price}</span></p>
                                <div class="star-rating">
                                    <ul class="list-inline">
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                    </ul>
                                </div>
                                <span onclick="addToCart(${product.id})" class="btn btn-primary">Add to Cart</span>
                            </div>
                        </div>
                    </div>
                `
            break; 
            // Sức khỏe
            case "Sức Khỏe": 
                htmls_suc_khoe += `
                    <div class="col-sm-3">
                        <div class="thumb-wrapper">
                            <div class="img-box">
                            <a href="http://127.0.0.1:5500/project_modul01_book_store/detail.html?id=${product.id}">
                                <img src="${product.img}" class="img-responsive" alt="">
                            </a>
                            </div>
                            <div class="thumb-content">
                                <h4>${product.productName}</h4>
                                <p class="item-price"><strike>$200</strike> <span>$${product.price}</span></p>
                                <div class="star-rating">
                                    <ul class="list-inline">
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                    </ul>
                                </div>
                                <span onclick="addToCart(${product.id})" class="btn btn-primary">Add to Cart</span>
                            </div>
                        </div>
                    </div>
                `
            break;
            //Mẹ và bé
            case "Mẹ Và Bé": 
                htmls_me_va_be += `
                    <div class="col-sm-3">
                        <div class="thumb-wrapper">
                            <div class="img-box">
                            <a href="http://127.0.0.1:5500/project_modul01_book_store/detail.html?id=${product.id}">
                                <img src="${product.img}" class="img-responsive" alt="">
                            </a>
                            </div>
                            <div class="thumb-content">
                                <h4>${product.productName}</h4>
                                <p class="item-price"><strike>$400.00</strike> <span>$${product.price}</span></p>
                                <div class="star-rating">
                                    <ul class="list-inline">
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star"></i></li>
                                        <li class="list-inline-item"><i class="fa fa-star-o"></i></li>
                                    </ul>
                                </div>
                                <span onclick="addToCart(${product.id})" class="btn btn-primary">Add to Cart</span>
                            </div>
                        </div>
                    </div>
                `
            break;
        }
    }
    products_it.innerHTML = htmls_it;
    products_marketing.innerHTML = htmls_marketing;
    products_giao_tiep.innerHTML = htmls_giao_tiep; 
    products_phap_luat.innerHTML = htmls_phap_luat;
    products_suc_khoe.innerHTML = htmls_suc_khoe; 
    products_me_va_be.innerHTML = htmls_me_va_be;
}
renderProducts()

//Logout login display
if (account_login){
    const li_auths = document.getElementsByClassName("auth");
    for (let li of li_auths){
        li.style.display = "none";
    }   
    document.getElementById("current_fullname").innerText = account_login.fullname;
} else {
    document.getElementById("sp_logout").style.display = 'none';
}



//Sort by price
function sortByPrice(event){
    renderProducts("", event.target.value);
}

//Logout

function logout(){
    localStorage.removeItem("account_login");
    window.location.reload()
}

//add to cart
function addToCart(id_product){
    const account = JSON.parse(localStorage.getItem("account_login"));
    if (!account){
        alert("Bạn cần đăng nhập để mua hàng");
        return;
    }

    const list_accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    
    const indexFindAccount = list_accounts.findIndex((v)=> v.id === account.id);

    if (account.is_block || list_accounts[indexFindAccount].is_block){
        alert("Tài khoản của bạn đang bị khoá, không thể thêm vào giỏ hàng");
        return;
    }

    let carts = JSON.parse(localStorage.getItem(`carts_${account.id}`)) || [];
    const index = carts.findIndex((v) => v.id_product === id_product)
    if (index > -1){
        carts[index].quantity++;
        localStorage.setItem(`carts_${account.id}`, JSON.stringify(carts));
        alert("Sản phẩm đã tồn tại trong giỏ hàng. Đã tăng số lượng lên 1");
        return;
    } 

    carts.push({
        id_product,
        quantity: 1
    });

    localStorage.setItem(`carts_${account.id}`, JSON.stringify(carts));
    alert("Đã thêm vào giỏ hàng");
    renderQuantityProductCart();
}

// slide show
let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}

//Change Color Book Store
// let bookStore = document.getElementById('bookStore');
// function getRandomColorAndText() {
//     var colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00',
//         '#00ffff', '#ff00ff'];
//     var randomIndex = Math.floor(Math.random() *
//         colors.length);
//     return [colors[randomIndex]];
// }
