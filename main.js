function init() {
    return;
}

function run() {
    var code = document.getElementById("input").value;
    document.getElementById("output").innerHTML = interp(code, "abcd");
}

function changeStyle() {
    var lang = document.getElementById("lang-select").value;
    console.log(lang);
    document.getElementById("output").className = "normal "+lang;
}
