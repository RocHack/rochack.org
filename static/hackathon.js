(function() 
{
	$(document).ready(function() {
		var times = {
            //"hacker":"Sun Apr 13 2014 14:00:00 GMT-0400 (EDT)",
            "hacker":"Sun Apr 12 2014 14:00:00 GMT-0400 (EDT)",
            "food":"Sun Apr 12 2014 17:30:00 GMT-0400 (EDT)"
        };

		var update = function()
		{
			var now = new Date();
			
			for (var key in times)
			{
				var end = new Date(times[key]);
				var totalSeconds = (end - now)/1000;
				
				var secs = Math.floor(totalSeconds % 60);
				var mins = Math.floor((totalSeconds/60) % 60);
				var hours = Math.floor((totalSeconds/3600) % 60);

				$('#'+key+'-hours').html(hours);
				$('#'+key+'-mins').html(mins);
				$('#'+key+'-secs').html(secs);
			}
		};

		update();
		setInterval(update, 1000); 
	})
})();
