document.getElementById("enterId").value = localStorage.length + 1;

function Person(id, fullName, namSinh, gender) {
    this.id = id;
    this.fullName = fullName;
    this.namSinh = namSinh;
    this.gender = gender;
}
show();

function add() {
    let id = document.getElementById("enterId").value;
    let fullName = document.getElementById("enterFullName").value;
    let namSinh = document.getElementById("enterNamSinh").value;
    let gender = document.getElementById("enterGender").value;

    let newPerson = new Person(id, fullName, namSinh, gender);
    let item = JSON.stringify(newPerson);
    localStorage.setItem(id, item);
    show();
}

function show() {
    var table = document.getElementById("table");

    let s = localStorage.length;
    for (let i = 1; i <= s; i++) {
        let o = localStorage.getItem(`${i}`);
        let obj = JSON.parse(o);
        var tr = document.createElement("tr");
        let tdID = document.createElement("td");
        let idCurrent = document.getElementsByClassName("cID");
        let c = true;
        for (const check of idCurrent) {
            if (check.id === obj.id) {
                c = false;
            }

        }
        if (c) {
            tdID.innerHTML = obj.id;
            tdID.id = obj.id;
            tdID.className = "cID";
            let tdName = document.createElement("td");
            tdName.innerHTML = obj.fullName;
            tdName.id = `fullName${i}`
            let tdNs = document.createElement("td");
            tdNs.innerHTML = obj.namSinh;
            tdNs.id = `namSinh${i}`
            let tdGender = document.createElement("td");
            tdGender.innerHTML = obj.gender;
            tdGender.id = `gender${i}`
            let tdS = document.createElement("td");
            let btnS = document.createElement("button");
            btnS.innerHTML = "Sửa";
            btnS.id = `Sua${i}`;
            tdS.appendChild(btnS);
            let tdX = document.createElement("td");
            let btnX = document.createElement("button");
            btnX.innerHTML = "Xóa";
            btnX.id = `Xoa${i}`;
            tdX.appendChild(btnX);
            tr.appendChild(tdID);
            tr.appendChild(tdName);
            tr.appendChild(tdNs);
            tr.appendChild(tdGender);
            tr.appendChild(tdS);
            tr.appendChild(tdX);
            table.appendChild(tr);

        }
    }

}
for (let i = 1; i <= localStorage.length; i++) {
    let Sua = document.getElementById(`Sua${i}`);
    Sua.addEventListener("click", () => {
        let sID = document.getElementById(`${i}`);
        let sName = document.getElementById(`fullName${i}`);
        let sNS = document.getElementById(`namSinh${i}`);
        let sGT = document.getElementById(`gender${i}`);
        document.getElementById("enterId").value = sID.innerText;
        document.getElementById("enterFullName").value = sName.innerText;
        document.getElementById("enterNamSinh").value = sNS.innerText;
        document.getElementById("enterGender").value = sGT.innerText;
    })
}

function update() {
    let id = document.getElementById("enterId").value;
    let fullName = document.getElementById("enterFullName").value;
    let namSinh = document.getElementById("enterNamSinh").value;
    let gender = document.getElementById("enterGender").value;

    let newPerson = new Person(id, fullName, namSinh, gender);
    let item = JSON.stringify(newPerson);
    localStorage.setItem(id, item);
    location.reload();
}