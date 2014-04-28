(function() {
    function clickMenu() {
        var links = document.getElementById("mobile-links");
        if(links.style.display == "block") {
            links.style.display = "none";
        } else {
            links.style.display = "block";
        }
    }

    function clickHackathonRegister() {
        _gaq.push(["_trackEvent", "Buttons", "Click", "Hackathon register"]);
    }

    window.onload = function() {
        document.getElementById("menu").onclick = clickMenu;
        var regLink = document.getElementById("hackathon-register");
        if (regLink) regLink.onclick = clickHackathonRegister;
    };
})();
