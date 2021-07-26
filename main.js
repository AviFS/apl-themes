function init() {
    if (window.location.hash) {
        var theme = window.location.hash.slice(1);
        document.getElementById('theme-select').value = theme;
        changeStyle();
    }
}

function changeStyle(theme) {
    if (!theme) { theme = document.getElementById("theme-select").value; }
    document.getElementById("output").className = "normal "+theme;
}

document.addEventListener("DOMContentLoaded", function(e) {
   document.getElementById("theme-select").addEventListener("keydown", function(event) {
       if (event.keyCode == 13) {
           changeStyle();
       }
   });
});
