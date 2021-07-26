function init() {
    if (window.location.hash) {
        var theme = window.location.hash.slice(1);
        document.getElementById('lang-select').value = theme;
        changeStyle();
    }
}

function changeStyle(lang) {
    if (!lang) { lang = document.getElementById("lang-select").value; }
    document.getElementById("output").className = "normal "+lang;
}

document.addEventListener("DOMContentLoaded", function(e) {
   document.getElementById("lang-select").addEventListener("keydown", function(event) {
       if (event.keyCode == 13) {
           changeStyle();
       }
   });
});
