(function() 
{
    function $(id) {
        return document.getElementById(id);
    }

    window.initTimers = function() {
        var times = {
            "hacker":"Sun Apr 13 2014 14:00:00 GMT-0400 (EDT)",
            "food":"Sun Apr 13 2014 12:45:00 GMT-0400 (EDT)"
        };

		var update = function()
		{
			var now = new Date();
			
			for (var key in times)
			{
				var end = new Date(times[key]);
				var totalSeconds = (end - now)/1000;
				
				var secs = Math.max(Math.floor(totalSeconds % 60), 0);
				var mins = Math.max(Math.floor((totalSeconds/60) % 60), 0);
				var hours = Math.max(Math.floor((totalSeconds/3600) % 60), 0);

				if (secs.toString().length == 1)
					secs = "0"+secs;

				if (mins.toString().length == 1)
					mins = "0"+mins;

                $(key+'-hours').innerHTML = hours;
                $(key+'-mins').innerHTML = mins;
                $(key+'-secs').innerHTML = secs;
            }

            var end = new Date();
            var secs = end.getSeconds();
            var mins = end.getMinutes();
            var hours = end.getHours();
            if (secs.toString().length == 1)
                secs = "0"+secs;

            if (mins.toString().length == 1)
                mins = "0"+mins;

            $('time-hours').innerHTML = (hours % 12) || 12;
            $('time-mins').innerHTML = mins;
            $('time-secs').innerHTML = secs;
            $('time-ampm').innerHTML = (hours >= 12) ? "pm" : "am";
        };

        update();
        setTimeout(update, 1000);
        setTimeout(function() {
            location.reload();
        }, 15*60*1000);
    };
})();
