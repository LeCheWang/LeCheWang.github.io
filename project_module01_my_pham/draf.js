
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
		"HTML CSS", "JAVASCRIPT", "JAVA", "PYTHON", "RUBY", 
	],
	"Marketing": [
		"Bí Mật Traffic", 'Chiến Lược Digital', 'BRAND and BRICKS', 'Chiến Lược ÌNluencer Marketing', 'Chốt DEAL Thành Công',
	],
	'Giao Tiếp': [
		'Đắc Nhân Tâm', 'Năng Lực Truyền Đạt', 'Nghệ Thuật Đàm Phán', 'Đọc Vị Bất Kì Ai', 'Sức Mạnh Của Ngôn Từ'
	],
	'Pháp Luật': [
		'Tinh Thần Pháp Luật', 'Luật Đất Đai', 'Luật Gia Đình', 'Chính Trị Luận'
	],
	'Sức Khỏe': [
		'3 Phút Sơ Cứu', 'Nấu Ăn Chay Trong Gia Đình', 'BRAIN MAKER', 'FOOD RULES'
	],
	'Mẹ Và Bé': [
		'Thai Giáo', '365 Câu Chuyện Trí Tuệ', 'Ăn Dặm Kiểu Nhật', 'Đọc Vị Mọi Vấn Đề Của Trẻ'
	]
}

//Tạo mảng lưu dữ liệu.mỗi khi add, ngoài việc đẩy dữ liệu vào bảng, dữ liệu sẽ luôn được lưu vào mảng
let arrayProductList = [];

// Truyền các giá trị option tag vào selection tag
let category = document.getElementById('category');
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
	let categoryName = document.getElementById('category_name');
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

//Add product, fill in table
let count = 0;
function addProduct() {
	let img = document.getElementById('img').value;
	let category = document.getElementById('category').value;
	let productName = document.getElementById('category_name').value;
	let price = document.getElementById('price').value;
	let quantity = document.getElementById('quantity').value;
	let totalPrice = document.getElementById('total_price').value;

//Mỗi khi add product sẽ tạo ra một objProduct 
    let objProduct = {
		id: Date.now(),
        img,
        category,
        productName,
        price,
        quantity,
        totalPrice
    }
//Thêm objProduct vào mảng arrayProductList
	arrayProductList.push(objProduct);

	document.getElementById('result').innerHTML += `
		<tr>
			<td>
				<span class="custom-checkbox">
					<input type="checkbox" id="checkbox1" name="options[]" value="1">
					<label for="checkbox1"></label>
				</span>
			</td>
			<td>${id}</td>
			<td>${img}</td>
			<td>${category}</td>
			<td>${productName}</td>
			<td>${price}</td>
			<td>${quantity}</td>
			<td>${totalPrice}</td>
			<td>
				<a href="#" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
				<a href="#" onclick= 'deleteProduct(${id})' class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
			</td>
		</tr>
	`
}

//Delete product
function deleteProduct(index) {
	console.log(index); 
	products.delete(index, 1)
	updateProduct();
}

//Update, show product
	function updateProduct() {
		document.getElementById('result').innerHTML += '';

		for (let index = 0; index < arrayProductList.length; index++) {
			document.getElementById('result').innerHTML += `
		<tr>
			<td>
				<span class="custom-checkbox">
					<input type="checkbox" id="checkbox1" name="options[]" value="1">
					<label for="checkbox1"></label>
				</span>
			</td>
			<td>${id}</td>
			<td>${arrayProductList[index].img}</td>
			<td>${arrayProductList[index].category}</td>
			<td>${arrayProductList[index].productName}</td>
			<td>${arrayProductList[index].price}</td>
			<td>${arrayProductList[index].quantity}</td>
			<td>${arrayProductList[index].totalPrice}</td>
			<td>
				<a href="#" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
				<a href="#" onclick= 'deleteProduct(${count-1})' class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
			</td>
		</tr>
	`
		}
	}
