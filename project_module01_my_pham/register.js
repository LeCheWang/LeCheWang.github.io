//đối tượng Validator, đặt tên obj là options
/*
function Validator(options) {
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    var selectorRules = {};

    //Hàm thực hiện validate
    function validate(inputElement, rule) {
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
        var errorMessage;
        //Lấy ra các rules của selector
        var rules = selectorRules[rule.selector];
        //Lặp qua từng rule và kiểm tra
        //Nếu có lỗi thì dừng việc kiểm tra
        for (var i = 0; i < rules.length; ++i) {
            switch (inputElement.type) {
                case 'radio':
                case 'checkbox':
                    errorMessage = rules[i](
                        formElement.querySelector(rule.selector + ':checked')
                    );
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
            }
            if (errorMessage) break;
        }

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            getParent(inputElement, options.formGroupSelector).classList.add('invalid');
        } else {
            errorElement.innerText = '';
            getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
        }
        return !errorMessage;
    }

    //Lấy element của form cần validate
    //lấy ra form element
    //option.rules là một array, để gọi được các phần tử trong mảng dùng foreach
    var formElement = document.querySelector(options.form);

    if (formElement) {
        //Khi submit form
        formElement.onsubmit = function (e) {
            e.preventDefault();

            var isFormValid = true;

            //Lặp qua từng rule và validate
            options.rules.forEach(function (rule) {
                var inputElement = formElement.querySelectorAll(rule.selector);
                var isValid = validate(inputElement, rule);
                if (!isValid) {
                    isFormValid = false;
                }
            });


            if (isFormValid) {
                //Trường hợp submit với javascript
                if (typeof options.onSubmit === 'function') {
                    var enableInputs = formElement.querySelectorAll('[name]');
                    var formValues = Array.from(enableInputs).reduce(function (values, input) {

                        switch (input.type) {
                            case 'radio':
                                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                                break;
                            case 'checkbox':
                                if (!input.matches(':checked')) {
                                    values[input.name] = '';
                                    return values;
                                }
                                if (!Array.isArray(values[input.name])) {
                                    values[input.name] = [];
                                }
                                values[input.name].push(input.value);
                                break;
                            case 'file':
                                values[input.name] = input.files;
                                break;
                            default:
                                values[input.name] = input.value;
                        }

                        return values;
                    }, {});

                    options.onSubmit(formValues);
                    //Trường hợp submit với hành vi mặc định
                } else {
                    formElement.submit();
                }
            }
        }
    }

    //Lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input, ...)
    options.rules.forEach(function (rule) {
        //Lưu lại các rules cho mỗi input
        if (Array.isArray(selectorRules[rule.selector])) {
            selectorRules[rule.selector].push(rule.test);
        } else {
            selectorRules[rule.selector] = [rule.test];
        }
        //lấy input của element fullname và mail trong form
        var inputElements = formElement.querySelectorAll(rule.selector);

        Array.from(inputElements).forEach(function (inputElement) {
            //Xử lí trường hợp blur khỏi input
            inputElement.onblur = function () {
                validate(inputElement, rule);
            }
            //Xử lí mỗi khi người dùng nhập vào input sẽ ẩn thông báo lỗi đi
            inputElement.oninput = function () {
                var errorElement = getParent(inputElement, options.formGroupSelector)(options.errorSelector);
                errorElement.innerText = '';
                getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
            }
        });
    });
}

//chấm tới phương thức isRequied và gán cho nó một funtion để định nghĩa các rules
//return một obj có key là selector, value là selector
//trả thêm một function test để kiểm tra xem người dùng đã nhập chưa,
//cho người dùng biết như thế nào là bắt buộc nhập, thì sẽ viết trong function này
//với email cũng làm tương tự như vậy, nhưng để kiểm tra xem đã nhập đúng định dạng mail hay chưa
//nguyên tắc rules
//1. khi có lối trả ra message lỗi
//2. khi hợp lệ không trả ra gì cả (undefined)
Validator.isRequired = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này'
        }
    };
}

Validator.isEmail = function (selector, message) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Vui lòng nhập đúng định dạng email';
        }
    };
}
//Xử lí mật khẩu
Validator.minLength = function (selector, min, message) {
    return {
        selector: selector,
        test: function (value) {
            return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} kí tự`;
        }
    };
}
//Xử lí mật khẩu nhập lại
Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined : message || 'Giá trị nhập không chính xác';
        }
    }
}
*/
//Register

function isValidEmail(email) {
    // Biểu thức chính quy cho địa chỉ email
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
    // Sử dụng test() để kiểm tra email
    return emailRegex.test(email);
}
function isValidPassword(password) {
    // Mật khẩu phải có ít nhất 8 ký tự
    if (password.length < 6) {
      return false;
    }
  
    // Nếu tất cả các quy tắc trên đều được đáp ứng, mật khẩu được coi là hợp lệ
    return true;
}


function register(){  
    const fullname = document.getElementById("fullname").value
    if (fullname.length < 6){
        document.getElementById("error_fullname").innerHTML = "Full Name phải trên 6 ký tự";
        return;
    }else {
        document.getElementById("error_fullname").innerHTML = ''
    }

    const email = document.getElementById("email").value
    if (!isValidEmail(email)){
        document.getElementById("error_email").innerHTML = "Email không hợp lệ";
        return;
    }else {
        document.getElementById("error_email").innerHTML = ''
    }

    const password = document.getElementById("password").value;
    if (!isValidPassword(password)){
        document.getElementById("error_password").innerHTML = "Password không hợp lệ";
        return;
    } else {
        document.getElementById("error_password").innerHTML = "";
    }

    const password_confirmation = document.getElementById("password_confirmation").value;
    if (password !== password_confirmation){
        document.getElementById("error_password2").innerHTML = "Password không khớp";
        return;
    } else {
        document.getElementById("error_password2").innerHTML = "";
    }


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
    
        alert("Đăng ký thành công. Hãy đăng nhập!");
        window.location.href = 'http://127.0.0.1:5500/project_modul01_book_store/login.html';
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