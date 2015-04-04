(function() {
    var currentThing;

    var things = [
        // friday
        ["Fri Apr 03 2015 17:00:00 GMT-0400 (EDT)", "registration starts"],
        ["Fri Apr 03 2015 18:00:00 GMT-0400 (EDT)", "opening ceremony"],
        ["Fri Apr 03 2015 19:00:00 GMT-0400 (EDT)", "competition"],
        ["Fri Apr 03 2015 20:00:00 GMT-0400 (EDT)", "dinner"],

        // saturday
        ["Sat Apr 04 2015 07:30:00 GMT-0400 (EDT)", "coffee"],
        ["Sat Apr 04 2015 08:00:00 GMT-0400 (EDT)", "breakfast"],
        ["Sat Apr 04 2015 13:00:00 GMT-0400 (EDT)", "lunch"],
        ["Sat Apr 04 2015 17:30:00 GMT-0400 (EDT)", "snack"],
        ["Sat Apr 04 2015 19:00:00 GMT-0400 (EDT)", "dinner"],
        ["Sat Apr 04 2015 20:00:00 GMT-0400 (EDT)", "dance"],
        ["Sat Apr 04 2015 22:30:00 GMT-0400 (EDT)", "snack"],

        // sunday
        ["Sun Apr 05 2015 07:30:00 GMT-0400 (EDT)", "coffee"],
        ["Sun Apr 05 2015 08:00:00 GMT-0400 (EDT)", "breakfast"],
        ["Sun Apr 05 2015 09:00:00 GMT-0400 (EDT)", "hacking ends"],
        ["Sun Apr 05 2015 09:30:00 GMT-0400 (EDT)", "presentations"],
        ["Sun Apr 05 2015 11:15:00 GMT-0400 (EDT)", "closing"],
        ["Sun Apr 03 2016 17:00:00 GMT-0400 (EDT)", "next hackathon"],
    ].map(function (item, i) {
        return {
            i: i,
            name: item[1],
            date: new Date(item[0])
        };
    });

    function setText(id, text) {
        document.getElementById(id).firstChild.nodeValue = text;
    }

    function update() {
        setTimeout(update, 1000);
        var now = new Date();

        for (var i = currentThing ? currentThing.i : 0;
                i < things.length; i++) {
            if (things[i].date > now) {
                currentThing = things[i];
                break;
            }
        }

        if (!currentThing)
            return;

        var end = new Date(currentThing.date);
        var totalSeconds = (end - now)/1000;

        var secs = Math.max(Math.floor(totalSeconds % 60), 0);
        var mins = Math.max(Math.floor((totalSeconds/60) % 60), 0);
        var hours = Math.max(Math.floor((totalSeconds/3600) % 60), 0);

        if (secs.toString().length == 1)
            secs = "0"+secs;

        if (mins.toString().length == 1)
            mins = "0"+mins;

        setText('thing-name', currentThing.name);
        setText('thing-hours', hours);
        setText('thing-mins', mins);
        setText('thing-secs', secs);

        var secs = now.getSeconds();
        var mins = now.getMinutes();
        var hours = now.getHours();
        if (secs.toString().length == 1)
            secs = "0"+secs;

        if (mins.toString().length == 1)
            mins = "0"+mins;

        setText('time-hours', (hours % 12) || 12);
        setText('time-mins', mins);
        setText('time-secs', secs);
        setText('time-ampm', (hours >= 12) ? "pm" : "am");
    }

    window.initTimers = function() {
        update();
    };
})();
