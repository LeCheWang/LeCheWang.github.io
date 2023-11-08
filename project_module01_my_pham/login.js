function login(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const list_accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    //kiểm tra xem email và password có đúng hay k
    let index = list_accounts.findIndex((v) => v.email === email && v.password === password)
    if (index >= 0){
        //đăng nhập thành công
        localStorage.setItem("account_login", JSON.stringify(list_accounts[index]))
        window.location.href = 'http://127.0.0.1:5500/project_modul01_book_store/homePage.html';
    } else {
        alert("Sai email hoặc mật khẩu");
    }
}