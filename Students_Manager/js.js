const url = "https://students-managerr.herokuapp.com/api/students"
var studentData;

function getAllStudent() {
    fetch(url)
        .then(res => res.json())
        .then(students => {
            studentData = students;
            var htmls = students.map(student =>
                `<tr>
                <td>${student.id}</td>
                <td>${student.fullName}</td>
                <td>${student.birthday}</td>
                <td>${student.gender}</td>
                <td>
                  <button onclick="update(${student.id})">Sửa</button>
                </td>
                <td>
                    <Button onclick="remove(${student.id})">Xóa</Button>
                </td>
            </tr>
            `)
            tbody.innerHTML = htmls.join("");
        })
    Reset();

}
getAllStudent();

function remove(id) {
    fetch(`${url}/${id}`, {
            method: 'DELETE'
        }).then(getAllStudent)
        .catch(err => {
            alert("Xóa thất bại\nError: " + err);
        })
}

function update(id) {
    var student = studentData.find(item => item.id === id);
    newID.value = student.id;
    fullName.value = student.fullName;
    birthday.value = student.birthday;
    gender.value = student.gender;
}

function CreateANewStudent() {
    if (!newID.value) {
        if (fullName.value && birthday.value && gender.value) {
            var newStudent = {
                fullName: fullName.value,
                birthday: birthday.value,
                gender: gender.value
            }
            fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newStudent)
                })
                .then(getAllStudent)
                .catch(err => {
                    alert("Thêm thất bại\nError: " + err);
                })
        } else {
            alert("Bạn đừng có mà mồm điêu. Điền đầy đủ thông tin đi nèo!!")
        }
    } else {
        alert("Đang sửa mà anh đẹp trai ơi :))");
    }
}

function Reset() {
    newID.value = null
    fullName.value = null
    birthday.value = null
    gender.value = null
}

function SendUpdate() {
    var id = newID.value;
    if (fullName.value && birthday.value && gender.value) {
        var updateStudent = {
            fullName: fullName.value,
            birthday: birthday.value,
            gender: gender.value
        }
        fetch(`${url}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateStudent)
            })
            .then(getAllStudent)
            .catch(err => {
                alert("Sửa thất bại\nError: " + err);
            })
    } else {
        alert("Bạn đừng có mà mồm điêu. Ấn nút sửa trên bảng đi nha!!")
    }
}