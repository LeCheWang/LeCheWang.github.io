const checkAll = document.getElementById("icon");
const inp = document.getElementById("input");
inp.focus();
const countItemLeft = document.getElementById("countItem");
inp.addEventListener("keyup", (ev) => {
    if (ev.key === 'Enter') {
        add();
    }
})

function Todo(id, content, wasDoned) {
    this.id = id;
    this.content = content;
    this.wasDoned = wasDoned;
}
var count;
All();

function getAllTodo() {
    let ar = JSON.parse(localStorage.getItem("arrTodo"));
    return ar ? ar : [];
}

function setTodo(arr) {
    localStorage.setItem("arrTodo", JSON.stringify(arr));
}

function show(arrTodo) {
    let allObj = "";
    var parent = document.getElementById("allActive");

    if (!getAllTodo().length) {
        document.getElementById("foo").style.display = "none";
        checkAll.style.display = 'none';
    } else
    if (arrTodo.length) {

        for (const item of arrTodo) {
            allObj += item.wasDoned ? ` <div class="item">
        <input id="${item.id}" onclick="Done(${item.id}, ${item.wasDoned})" checked type="checkbox" name="done">
        <div>${item.content}</div>
        <i onclick="Clear(${item.id})"  class="fas fa-skull-crossbones"></i>
        </div>` : ` <div class="item">
        <input id="${item.id}" onclick="Done(${item.id}, ${item.wasDoned})" type="checkbox" name="done">
        <div>${item.content}</div>
        <i onclick="Clear(${item.id})"  class="fas fa-skull-crossbones"></i>
        </div>`;
        }


        checkAll.style.display = 'block';

        count = 0;
        for (const item of arrTodo) {
            count = item.wasDoned ? count : count + 1;
        }

    }
    countItemLeft.innerHTML = `${arrTodo.length} item left`;
    parent.innerHTML = allObj;
}

function Done(id, isDone) {
    let ar = getAllTodo();
    let doneArr = ar.map(value => {
        if (value.id === id) {
            if (isDone) {
                value.wasDoned = false;
            } else {
                value.wasDoned = true;
            }
        }
        return value;
    })
    setTodo(doneArr);
    show(doneArr);
}
checkAll.addEventListener('click', () => {
    let ar = getAllTodo();
    let d = ar.some(value => {
        value.wasDoned === true;
    });
    // if (count === 0) {
    //     d = true;
    // }
    for (const item of ar) {
        Done(item.id, d);
    }
    if (d) {
        All();
    } else {
        Completed();
    }
})


function add() {
    let content = inp.value;
    let a = getAllTodo();
    if (content) {
        let id = a ? a.length : 0;
        let todo = new Todo(id, content, false);
        let arrTodo = getAllTodo();
        if (!arrTodo) {
            arrTodo = [todo];
        } else {
            arrTodo.push(todo);
        }
        setTodo(arrTodo);
        show(arrTodo);
        inp.value = "";
        document.location.reload();
    } else {
        alert("bạn đừng có mà  mồm điêu, điền nội dung vào đi!");
    }
}

function Clear(id) {
    document.getElementById(id).parentElement.remove();
    let ar = getAllTodo();
    for (const item of ar) {
        if (item.id === id) {
            ar.splice(ar.indexOf(item), 1);
            break;
        }
    }
    setTodo(ar);
    show(ar);
    filterBtnTab(1);
}


function filterBtnTab(x) {
    var alls = document.getElementById("tatca");
    var ac = document.getElementById('ac');
    var com = document.getElementById('com');
    alls.style.backgroundColor = "white";
    ac.style.backgroundColor = "white";
    com.style.backgroundColor = "white";
    if (x === 1) {
        alls.style.backgroundColor = "cyan";
    } else if (x === 2) {
        ac.style.backgroundColor = "cyan";
    } else if (x === 3) {
        com.style.backgroundColor = "cyan";
    }
}

function All() {
    let arrTodo = getAllTodo();
    show(arrTodo);
    filterBtnTab(1);
}

function Active() {
    let arr1 = getAllTodo();
    let arr2;
    if (arr1) {
        arr2 = arr1.filter(value => {
            return value.wasDoned == false;
        })
    }
    show(arr2);
    filterBtnTab(2);
}

function Completed() {
    let arr1 = getAllTodo();
    let arr2;
    if (arr1.length) {
        arr2 = arr1.filter(value => {
            return value.wasDoned == true;
        })
    }
    show(arr2);
    filterBtnTab(3);
}

function ClearCompleted() {
    setTodo(new Array);
    document.location.reload();
}
