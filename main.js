function init() {
    return;
}

function run() {
    var code = document.getElementById("input").value;
    document.getElementById("output").innerHTML = interp(code, "abcd");
}
