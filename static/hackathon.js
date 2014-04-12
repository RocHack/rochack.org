(function() 
{
	$(document).ready(function() {
		var times = {
            "hacker":"Sun Apr 13 2014 14:30:00 GMT-0400 (EDT)",
            //"hacker":"Sun Apr 12 2014 14:00:00 GMT-0400 (EDT)",
            "food":"Sun Apr 12 2014 17:30:00 GMT-0400 (EDT)"
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

				$('#'+key+'-hours').html(hours);
				$('#'+key+'-mins').html(mins);
				$('#'+key+'-secs').html(secs);
			}
		};

		update();
		setInterval(update, 1000); 

		setInterval(function () {
			location.reload();
		}, 60000); 
	})
})();
