const ip_title = document.getElementById('ip_title')
const btn_add = document.getElementById('btn_add')
const list = document.getElementById('list')

//lấy giá trị các jobs đã lưu trước đó từ localStorage;
const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
renderJob();

ip_title.focus();

btn_add.addEventListener('click', addTitle)

ip_title.addEventListener('keypress', (event)=> {
    if (event.key === "Enter"){
        addTitle();
    }
})

function addTitle(){
    const title = ip_title.value;
    const id = new Date().getTime();

    const li = document.createElement('li');
    li.innerHTML = `<div>
            <span onclick="doneJob(${id})">${title}</span> 
            <i onclick="removeJob(${id})" class="fa-solid fa-trash"></i>
        </div>`;
    li.id = id;

    list.appendChild(li);
    jobs.push({
        title,
        id
    }) 

    //lưu lại mảng jobs sau khi thêm vào localStorage
    localStorage.setItem("jobs", JSON.stringify(jobs));

    ip_title.value = '';
    ip_title.focus();
}

function renderJob(){ 
    for (let job of jobs) {
        const li = document.createElement('li');
        li.innerHTML = `<div>
            <span onclick="doneJob(${job.id})">${job.title} </span> 
            <i onclick="removeJob(${job.id})" class="fa-solid fa-trash"></i>
        </div>`;
        li.id = job.id;

        list.appendChild(li);
    }
}

function removeJob(id) {
    const li = document.getElementById(id);
    list.removeChild(li);

    //tìm ra vị trí của job có id cần xóa
    const index = jobs.findIndex((v)=> v.id === id);
    //xóa job tại vị trí index trong mảng jobs
    jobs.splice(index, 1);
    //lưu dữ liệu mảng jobs đã xóa và localStorage
    localStorage.setItem("jobs", JSON.stringify(jobs));
}

function doneJob(id){
    const li = document.getElementById(id);
    li.style.textDecoration = "line-through";
}