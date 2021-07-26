function changeStyle() {
    var lang = document.getElementById("lang-select").value;
    console.log(lang);
    document.getElementById("output").className = "normal "+lang;
}

document.addEventListener("DOMContentLoaded", function(e) {
   document.getElementById("lang-select").addEventListener("keydown", function(event) {
       if (event.keyCode == 13) {
           changeStyle();
       }
   });
});
