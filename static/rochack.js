(function() {
    function clickMenu() {
        var links = document.getElementById("mobile-links");
        if(links.style.display == "block") {
            links.style.display = "none";
        } else {
            links.style.display = "block";
        }
    }

    window.onload = function() {
        document.getElementById("menu").onclick = clickMenu;
    }
})();
