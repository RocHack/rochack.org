(function() 
{
	$(document).ready(function() {
		var times = {
            "hacker":"Sun Apr 13 2014 14:30:00 GMT-0400 (EDT)",
            "food":"Sun Apr 13 2014 09:00:00 GMT-0400 (EDT)"
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

				$('#'+key+'-hours').html(hours);
				$('#'+key+'-mins').html(mins);
				$('#'+key+'-secs').html(secs);
			}

            var end = new Date();
            var secs = end.getSeconds();
            var mins = end.getMinutes();
            var hours = end.getHours();
            if (secs.toString().length == 1)
                secs = "0"+secs;

            if (mins.toString().length == 1)
                mins = "0"+mins;

            $('#time-hours').html(hours == 0 ? 12 : hours % 12);
            $('#time-mins').html(mins);
            $('#time-secs').html(secs);
            $('#time-ampm').html((hours > 12) ? "pm" : "am");
		};

		update();
		setInterval(update, 1000); 
        setInterval(function() {
            location.reload();
        }, 60000);
	})
})();
