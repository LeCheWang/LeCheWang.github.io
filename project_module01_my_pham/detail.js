const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = Number(urlParams.get('id'));

let list_products = JSON.parse(localStorage.getItem('products')) || [];
const index = list_products.findIndex(new_product => new_product.id === +id);
const productDetail = list_products[index];

document.getElementById("p_product_name").innerHTML = productDetail.productName;
document.getElementById("p_product_price").innerHTML = "$" + productDetail.price;
document.getElementById("img_product").src = productDetail.img;
document.getElementById("a_category_tag").innerHTML = productDetail.category;

//Button add to cart
function addToCart(){  
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
    const index = carts.findIndex((v) => v.id_product === +id)
    if (index > -1){
        carts[index].quantity++;
        localStorage.setItem(`carts_${account.id}`, JSON.stringify(carts));
        alert("Sản phẩm đã tồn tại trong giỏ hàng. Đã tăng số lượng lên 1");
        return;
    } 

    carts.push({
        id_product: id,
        quantity: 1
    });

    localStorage.setItem(`carts_${account.id}`, JSON.stringify(carts));
    alert("Đã thêm vào giỏ hàng"); 
}