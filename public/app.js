$(document).ready(function(){
	var map = {width:30, height:20};
	var initState = {left: (map.width*10)/2, top:(map.height*10)/2};
	var canvas = $('#map');
	var adjustment = 2; // Icon width + (x=0, y=0 point)
	canvas.css({width:(map.width+adjustment)*10, height:(map.height+adjustment)*10, border: "2px solid #333"});

	$.ajax({
        type: "POST",
        url: '/init',
		data: map,
        success: function (data) {
            $("#info").text("X: " + data.x + ", Y: " + data.y + ", Direction: " + data.direction);
            $(".pointer").css(initState);
        },
        error: function (data) {
            console.log(data);
        }
    });

    $('.controls button').click(function(){
    	var dir = $(this).val();
    	$.ajax({
	        type: "POST",
	        url: '/move',
			data: {action:"move", direction: dir},
	        success: function (data) {
				$("#info").text("X: " + data.x + ", Y: " + data.y + ", Direction: " + data.direction);
	            var state = {left: initState.left + (data.x * 5), top: initState.top -(data.y*5)};
	            $(".pointer").css(state);
	        },
	        error: function (data) {
	            console.log(data);
	        }
	    });

    });
});