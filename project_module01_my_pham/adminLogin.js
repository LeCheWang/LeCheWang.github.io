function login() {
    console.log("lfjasdljf");
    //  Khi nhập mới .value lấy giá trị
    const adminEmail = 'admin@gmail.com';
    const adminPassword = '123456';
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (email === adminEmail && password === adminPassword) {
        window.location.href = "http://127.0.0.1:5500/project_modul01_book_store/admin.html";
    } else {
        confirm('Email or password is incorrect');
    }
}