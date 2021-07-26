function changeStyle() {
    var lang = document.getElementById("lang-select").value;
    console.log(lang);
    document.getElementById("output").className = "normal "+lang;
}

function setStyle(style) {
    document.getElementById("lang-select").value = style;
    changeStyle();
}
