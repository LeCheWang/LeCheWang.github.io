//Add product:
//+ Must login to shopping
//+ Blocked user can not add products

const tbody_products_cart = document.getElementById("tbody_products_cart"); 
const b_total_amount = document.getElementById("b_total_amount");

//render products in cart

function renderProductsCart(){
    const account = JSON.parse(localStorage.getItem("account_login"));
    if (!account){
        alert("Bạn cần đăng nhập để xem giỏ hàng");
        return;
    }
    let carts = JSON.parse(localStorage.getItem(`carts_${account.id}`)) || []; //{id_product: 2345, quantity: 2}
    let list_products = JSON.parse(localStorage.getItem('products')) || [];

    let productsCart = carts.map((v)=> {
        const index = list_products.findIndex((product) => product.id === v.id_product)
        return {
            ...list_products[index], // {id, pr, quantity: 1}
            quantity: v.quantity
        }
    })
 
//Total price in cart

    let total_amount = 0;
    let htmls = ``;
    for (let product of productsCart){
        total_amount += product.price * product.quantity;
        htmls += `
            <tr>
                <td>
                    <span class="custom-checkbox">
                        <input type="checkbox" id="checkbox1" name="options[]" value="1">
                        <label for="checkbox1"></label>
                    </span>
                </td>
                <td>${product.productName}</td>
                <td>
                    <img width="100" src="${product.img}" alt="ảnh khóa học" />
                </td>
                <td>$${product.price}</td>
                <td>${product.quantity}</td>
                <td>
                    <span onclick="increaseQuantity(${product.id})" ><i class="material-icons cusor" style="color: rgb(77, 190, 77); cursor: pointer">&#xE147;</i></span>	
                    <span onclick="descreaseQuantity(${product.id})"><i class="material-icons cusor" style="cursor: pointer">&#xE15C;</i></span>                     
                    <a onclick="deleteProductCart(${product.id})" href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                </td>
            </tr>
        `;
    }
    b_total_amount.innerHTML = `$ ${total_amount}`;
    tbody_products_cart.innerHTML = htmls;
}

renderProductsCart();

//plus + button / minus - button to change quantity in cart

function increaseQuantity(id_product){
    const account = JSON.parse(localStorage.getItem("account_login"));
    if (!account){
        alert("Bạn cần đăng nhập để mua hàng");
        return;
    }
    let carts = JSON.parse(localStorage.getItem(`carts_${account.id}`)) || [];
    let index = carts.findIndex((v)=> v.id_product === id_product)
    if (carts[index].quantity >= 5){
        alert("Bạn chỉ được mua số lượng tối đa là 5")
        return;
    }
    carts[index].quantity++;
    localStorage.setItem(`carts_${account.id}`, JSON.stringify(carts));
    renderProductsCart();
}
function descreaseQuantity(id_product){
    const account = JSON.parse(localStorage.getItem("account_login"));
    if (!account){
        alert("Bạn cần đăng nhập để mua hàng");
        return;
    }
    let carts = JSON.parse(localStorage.getItem(`carts_${account.id}`)) || [];
    let index = carts.findIndex((v)=> v.id_product === id_product);
    if (carts[index].quantity <= 1){
        alert("Số lượng không được phép nhỏ hơn 1");
        return;
    }
    carts[index].quantity--;
    localStorage.setItem(`carts_${account.id}`, JSON.stringify(carts));
    renderProductsCart();
}

//Delete product
let current_id_product_delete;
function deleteProductCart(id_product){
    current_id_product_delete = id_product;
}

function deleteCurrentProduct(){
    const account = JSON.parse(localStorage.getItem("account_login"));
    if (!account){
        alert("Bạn cần đăng nhập để mua hàng");
        return;
    }

    let carts = JSON.parse(localStorage.getItem(`carts_${account.id}`)) || [];
    let index = carts.findIndex((v) => v.id_product === current_id_product_delete)
    carts.splice(index, 1);
    localStorage.setItem(`carts_${account.id}`, JSON.stringify(carts));
    renderProductsCart();
}
//Pay button
function payNow() {
    let pay = document.getElementById('payNow');
    alert('Payment Successful !')
}