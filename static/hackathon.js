(function() {
    var currentThing;

    var things = [
        // friday
        ["Fri Apr 01 2016 17:00:00 GMT-0400 (EDT)", "registration starts"],
        ["Fri Apr 01 2016 18:00:00 GMT-0400 (EDT)", "opening ceremony"],
        ["Fri Apr 01 2016 19:15:00 GMT-0400 (EDT)", "team formation"],
        ["Fri Apr 01 2016 20:00:00 GMT-0400 (EDT)", "dinner"],
        ["Fri Apr 01 2016 20:30:00 GMT-0400 (EDT)", "hacking starts"],
        ["Fri Apr 01 2016 21:00:00 GMT-0400 (EDT)", "api talks"],
        ["Fri Apr 01 2016 22:00:00 GMT-0400 (EDT)", "surprise guest performance"],

        // saturday
        ["Sat Apr 02 2016 00:00:00 GMT-0400 (EDT)", "coffee & snacks"],
        ["Sat Apr 02 2016 01:00:00 GMT-0400 (EDT)", "mini game"],
        ["Sat Apr 02 2016 03:00:00 GMT-0400 (EDT)", "insomnia cookies"],
        ["Sat Apr 02 2016 07:30:00 GMT-0400 (EDT)", "coffee"],
        ["Sat Apr 02 2016 08:00:00 GMT-0400 (EDT)", "breakfast"],
        ["Sat Apr 02 2016 09:00:00 GMT-0400 (EDT)", "yoga"],
        ["Sat Apr 02 2016 11:00:00 GMT-0400 (EDT)", "ur robotics arduino workshop"],
        ["Sat Apr 02 2016 13:00:00 GMT-0400 (EDT)", "lunch"],
        ["Sat Apr 02 2016 14:00:00 GMT-0400 (EDT)", "engineers without borders presentation"],
        ["Sat Apr 02 2016 15:00:00 GMT-0400 (EDT)", "scientific programming 2.0 talk"],
        ["Sat Apr 02 2016 15:25:00 GMT-0400 (EDT)", "what is a programming language? talk"],
        ["Sat Apr 02 2016 16:00:00 GMT-0400 (EDT)", "yoga"],
        ["Sat Apr 02 2016 17:00:00 GMT-0400 (EDT)", "resume workshop & mock interview"],
        ["Sat Apr 02 2016 20:00:00 GMT-0400 (EDT)", "dinner"],
        ["Sat Apr 02 2016 23:00:00 GMT-0400 (EDT)", "juicy connotation mini concert"],

        // sunday
        ["Sun Apr 03 2016 07:30:00 GMT-0400 (EDT)", "coffee"],
        ["Sun Apr 03 2016 08:00:00 GMT-0400 (EDT)", "breakfast"],
        ["Sun Apr 03 2016 08:30:00 GMT-0400 (EDT)", "hacking ends"],
        ["Sun Apr 03 2016 09:30:00 GMT-0400 (EDT)", "presentations"],
        ["Sun Apr 03 2016 10:30:00 GMT-0400 (EDT)", "judging begins"],
        ["Sun Apr 03 2016 11:15:00 GMT-0400 (EDT)", "closing ceremony"],
        ["Fri Mar 31 2017 17:00:00 GMT-0400 (EDT)", "next hackathon"],
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
