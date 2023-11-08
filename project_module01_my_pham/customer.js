const tbody_accounts = document.getElementById("tbody_accounts")

function renderAccounts(){
    const list_accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    let htmls = ``
    for (let account of list_accounts){
        htmls += `
        <tr>
            <td>
                <span class="custom-checkbox">
                    <input type="checkbox" id="${account.id}" class="checkbox_delete" name="options[]" value="1">
                    <label for="${account.id}"></label>
                </span>
            </td>                                            
            <td>${account.id}</td>
            <td>${account.fullname}</td>
            <td>${account.email}</td> 
            <td>${account.is_block ? "Block":"Active"}</td> 
            <td>
                <a onclick="blockAccount(${account.id})" class="edit">${!account.is_block ? "Block":"Active"}</a>
                <a onclick="deleteAccountByID(${account.id})" class="delete">Delete</a>
            </td>
        </tr> 
        `
    }

    tbody_accounts.innerHTML = htmls;
}

renderAccounts();

function blockAccount(id_account){ 
    const list_accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    
    const index = list_accounts.findIndex((v)=> v.id === id_account);
    list_accounts[index].is_block = !list_accounts[index].is_block;
    localStorage.setItem("accounts", JSON.stringify(list_accounts))

    renderAccounts();
}

function deleteAccountByID(id_account){
    const p = confirm("Bạn có muốn xóa tài khoản " + id_account)
    if (p){
        const list_accounts = JSON.parse(localStorage.getItem("accounts")) || [];
        const index = list_accounts.findIndex((v)=> v.id === id_account);
        list_accounts.splice(index, 1);
        localStorage.setItem("accounts", JSON.stringify(list_accounts))

        renderAccounts();
    }
}

function deleteAccountChecked(){
    const p = confirm("Bạn có muốn xóa toàn bộ tài khoản?")
    if (p){
        //lấy ra các checkbox
        const list_checkbox_delete = document.getElementsByClassName("checkbox_delete");
        for (let cb of list_checkbox_delete){
            if (cb.checked){
                const list_accounts = JSON.parse(localStorage.getItem("accounts")) || [];
                const index = list_accounts.findIndex((v)=> v.id === cb.id);
                list_accounts.splice(index, 1);
                localStorage.setItem("accounts", JSON.stringify(list_accounts))
            }
        }

        renderAccounts();
    }
}

function addUser(){
    const fullname = document.getElementById("addFullName").value;
    const email = document.getElementById("addEmail");
    const password = document.getElementById("addPassword")

    const account = {
        id: generateId(),
        fullname, 
        email,
        password,
        is_block: false
    }
   
    //Save account in local storage
    const list_accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    //kiểm tra xem email đã tồn tại chưa
    let index = list_accounts.findIndex((v) => v.email === account.email && v.id === account.id)
    if (index >= 0) {
        alert("Tài khoản đã tồn tại.");
    } else {
        list_accounts.push(account);

        localStorage.setItem("accounts", JSON.stringify(list_accounts));
    
        alert("Thêm tài khoản thành công");
        renderAccounts();
        document.getElementById("form_add_account").reset();
    }
}

//Generate id
function generateId(){
    let id = '';
    for (let i = 0; i < 8; i++){
        id += Math.floor(Math.random() * 10);
    }
    return +id;
}