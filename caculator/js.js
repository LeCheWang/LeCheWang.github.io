function getOldResult() {
    return document.getElementById("inp").innerText;
}

function setOldResult(so) {
    document.getElementById("inp").innerText = so;
}

function getResult() {
    return document.getElementById("outp").innerText;
}

function setResult(so) {
    document.getElementById("outp").innerText = so;
}
var system = document.getElementsByClassName("system");

for (const item of system) {
    item.addEventListener("click", () => {
        if (item.value === "AC") {
            setResult(0);
            setOldResult("");
        } else if (item.value === "C") {
            if (getOldResult() != "") {
                let t = getOldResult();
                setOldResult(t.substring(0, t.length - 1));
            }
        } else if (item.value == "=") {
            let k = eval(getOldResult());
            setResult(k);
            check = true;
        }
    })

}
var check;
const inpNumber = document.getElementsByClassName("so");
for (const value of inpNumber) {
    value.addEventListener("click", () => {
        if (check) {
            setOldResult("");
            let km = getResult();
            if (["-", "+", "/", "*"].includes(value.value)) {
                km = km + value.value;
                setOldResult(km);
                setResult("");
                check = false;
            }
        }
        var result = getOldResult();
        result += value.value;
        setOldResult(chuan_hoa(result));
        check = false;
    })
}

function chuan_hoa(text) {
    return text.replace("++", "+").replace("--", "-").replace("**", "*").replace("//", "/");
}