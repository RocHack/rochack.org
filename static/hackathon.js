(function() {
    var currentThing;

    var things = [
        // friday
        ["2016-04-03 17:00", "registration starts"],
        ["2015-04-03 18:00", "opening ceremony"],
        ["2015-04-03 19:00", "competition"],
        ["2015-04-03 20:00", "dinner"],
        ["2015-04-03 22:30", "snack"],

        // saturday
        ["2015-04-04 07:30", "coffee"],
        ["2015-04-04 08:00", "breakfast"],
        ["2015-04-04 13:00", "lunch"],
        ["2015-04-04 17:30", "snack"],
        ["2015-04-04 19:00", "dinner"],
        ["2015-04-04 20:00", "dance"],
        ["2015-04-04 22:30", "snack"],

        // sunday
        ["2015-04-05 07:30", "coffee"],
        ["2015-04-05 08:00", "breakfast"],
        ["2015-04-05 09:00", "hacking ends"],
        ["2015-04-05 09:30", "presentations"],
        ["2015-04-05 11:15", "closing"],
        ["2016-04-04 17:00", "next hackathon"],
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
        setTimeout(function() {
            location.reload();
        }, 15*60*1000);
    };
})();
