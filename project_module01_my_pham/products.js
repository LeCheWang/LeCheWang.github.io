const tbody_products = document.getElementById('tbody_products');
// button, check box
$(document).ready(function(){
	// Activate tooltip
	$('[data-toggle="tooltip"]').tooltip();
	
	// Select/Deselect checkboxes
	var checkbox = $('table tbody input[type="checkbox"]');
	$("#selectAll").click(function(){
		if(this.checked){
			checkbox.each(function(){
				this.checked = true;                        
			});
		} else{
			checkbox.each(function(){
				this.checked = false;                        
			});
		} 
	});
	checkbox.click(function(){
		if(!this.checked){
			$("#selectAll").prop("checked", false);
		}
	});
});
// Khai báo cấu trúc dữ liệu là các mảng nằm trong object selection option--choose--
const products = {
	"IT": [
		"Kiến Thức Lập Trình", "Bí Mật DOTCOM", "CLEAN CODE", "PYTHON", "Giáo Trình C++", "Kí Sự BrSe", "Tớ Học Lập Trình"
	],
	"Marketing": [
		"Bí Mật Traffic", 'Chiến Lược Digital', 'BRAND and BRICKS', 'Bán Hàng Không Lỗ', 'Chốt DEAL Thành Công', 'CONTENT Bạc Tỷ'
	],
	'Giao Tiếp': [
		'Thôi Miên Bằng Ngôn Từ', 'Năng Lực Truyền Đạt', 'Nghệ Thuật Đàm Phán', 'Đọc Vị Bất Kì Ai', 'Sức Mạnh Của Ngôn Từ', 'Tâm Lí Học Thuyết Phục', 'Giao Tiếp'
	],
	'Pháp Luật': [
		'Tinh Thần Pháp Luật', 'Luật Đất Đai', 'Luật Gia Đình', 'Chính Trị Luận', 'Quần Vương'
	],
	'Sức Khỏe': [
		'RAW VEGAN', 'Thời Sự Ăn Chay', 'Hệ Miễn Dịch', 'Ăn Chay Trong YOGA', 'BRAIN MAKER', 'Sức Khỏe Trong Tay Bạn'
	],
	'Mẹ Và Bé': [
		'Giao Tiếp Úng Xử', '365 Câu Chuyện Trí Tuệ', 'Ăn Dặm Kiểu Nhật', 'Cho Bé Tập Đọc', 'Tự Giác Gọn Gàng', 'Trước Giờ Đi Ngủ'
	]
}

//Tạo mảng lưu dữ liệu.mỗi khi add, ngoài việc đẩy dữ liệu vào bảng, dữ liệu sẽ luôn được lưu vào mảng
let arrayProductList = [];

// Truyền các giá trị option tag vào selection tag
let category = document.getElementById('category_name');
for (const key in products) {
	category.innerHTML += `<option value="${key}">${key}</option>`;
	}

//Bắt sự kiện onchange trong category
//khi chọn category sẽ gọi đến funtion dưới,
//Chọn category nào sẽ hiện ra các item của category đó
function renderItemOptionOfCategory() {
	//Lấy giá trị
	keyValue = category.value;
	let productList = products[keyValue];
	// Hiển thị giá trị
	let categoryName = document.getElementById('product_name');
	categoryName.innerHTML = '';
	if (productList.length > 0) {
		for (let i = 0; i < productList.length; i++) {
			categoryName.innerHTML += `<option value="${productList[i]}">${productList[i]}</option>`;
		}
	}
}

//Xử lí sự kiện khi nhập giá, số lượng sẽ tự động thay đổi total price 
//Bắt sự kiện onkeyUp đã gán cho price và quantity
function totalPrice() {
	let price = document.getElementById('price').value;
	let quantity = document.getElementById('quantity').value;
	let total = price * quantity;
	document.getElementById('total_price').value = total;
}

//Add product
function addProduct(id_product) {
	let img = document.getElementById('img').value; 
	let category = document.getElementById('category_name').value;
	let productName = document.getElementById('product_name').value;
	let price = +document.getElementById('price').value;
	let quantity = +document.getElementById('quantity').value;
	let totalPrice = +document.getElementById('total_price').value;

	const objProduct = {
		id: id_product || Date.now(),
		img,
		category,
		productName,
		price,
		quantity,
		totalPrice
	}
	//Save object in local storage
	const list_products = JSON.parse(localStorage.getItem('products')) || [];
	//find index of object in local storage if it exists
	const indexFindById = list_products.findIndex(new_product => new_product.id === objProduct.id);
	const index = list_products.findIndex(new_product => new_product.productName === objProduct.productName);
	if (indexFindById > -1){
		list_products.splice(indexFindById, 1, objProduct);
		localStorage.setItem('products', JSON.stringify(list_products));
	} else if (index > -1) {
		//update amount and total price product
		// quantity += list_products[index].quantity;
		list_products[index].quantity += +quantity || 1;
		list_products[index].totalPrice += (+quantity || 1) * +price || list_products[index].price;
		//cais nafy dder edit
		img ? list_products[index].img = img : "";
		localStorage.setItem('products', JSON.stringify(list_products));
	} else {
		list_products.push(objProduct);
		localStorage.setItem('products', JSON.stringify(list_products));
	}
	renderProductTable()
	document.getElementById("form_add_and_edit_product").reset(); 
}

//render product in table
function renderProductTable() {
	const list_products = JSON.parse(localStorage.getItem('products')) || [];
	let htmls = ``;
	for (let product of list_products) {
		htmls += `
		<tr id="${product.id}">
			<td>
				<span class="custom-checkbox">
					<input type="checkbox" id="cb_${product.id}" class="cb_product" name="options[]" value="1">
					<label for="cb_${product.id}"></label>
				</span>
			</td>
			<td>${product.id}</td>
			<td>
				<img width="100" src="${product.img}" alt="ảnh lỗi"/>
			
			</td>
			<td>${product.category}</td>
			<td>${product.productName}</td>
			<td>${product.price}</td>
			<td>${product.quantity}</td>
			<td>${product.totalPrice}</td>
			<td>
				<a href="#" onclick = 'editProduct(${product.id})' class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
				<a href="#" onclick = 'deleteProduct(${product.id})' class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
			</td>
		</tr>
		`
	}
	tbody_products.innerHTML = htmls;
}
renderProductTable();


//render product in homepage
function renderProductHomepage() {

}

//Delete product
function deleteProduct(id_product){
	let t = confirm("Bạn có chắc chắc muốn xóa không?");
	if (!t){
		return;
	}
	let tr = document.getElementById(id_product);
	tbody_products.removeChild(tr)
	let list_products = JSON.parse(localStorage.getItem('products')) || [];
	//find index of object in local storage if it exists
	const index = list_products.findIndex(new_product => new_product.id === id_product);
	if (index > -1) {
		//delete product by index
		list_products.splice(index, 1);
		localStorage.setItem('products', JSON.stringify(list_products));
	}
}
//delete product checked
function deleteProductChecked() {
	let cb_products = document.getElementsByClassName("cb_product");
	let list_products = JSON.parse(localStorage.getItem('products')) || [];
	for (let cb of cb_products){
		if (cb.checked){
			let id = cb.id.split("_")[1];
			const index = list_products.findIndex(new_product => new_product.id === +id);
			if (index > -1){
				list_products.splice(index, 1);
			}
		}
	}
	localStorage.setItem('products', JSON.stringify(list_products));
	renderProductTable();
}

//edit product
function editProduct(id_product) {
	let list_products = JSON.parse(localStorage.getItem('products')) || [];
	const index = list_products.findIndex(new_product => new_product.id === +id_product);
	const product = list_products[index]; 

	document.getElementById("img").value = product.img;

	let categories = Object.keys(products)

	let htmlsCategories = `<option value="${product.category}">${product.category}</option>`
	for (let category of categories){
		if (category !== product.category){
			htmlsCategories += `<option value="${category}">${category}</option>`
		}
	}
	
	document.getElementById("category_name").innerHTML = htmlsCategories;

	let listProductName = products[product.category]; 
	let htmlsProductNames = `<option value="${product.productName}">${product.productName}</option>`
	for (let pro of listProductName){
		if (pro !== product.productName){
			htmlsProductNames += `<option value="${pro}">${pro}</option>`
		}
	}
	document.getElementById("product_name").innerHTML = htmlsProductNames;

	document.getElementById("price").value = product.price;
	document.getElementById("quantity").value = product.quantity;
	document.getElementById("total_price").value = product.totalPrice;

	const btn_edit_product = document.getElementById("btn_edit_product")
	const btn_add_product = document.getElementById("btn_add_product")

	btn_edit_product.style.display = 'block';
	btn_add_product.style.display = 'none';

	btn_edit_product.addEventListener('click', ()=>{
		addProduct(product.id); 
		btn_edit_product.style.display = 'none';
		btn_add_product.style.display = 'block'; 
		document.getElementById("form_add_and_edit_product").reset(); 
	})
}

