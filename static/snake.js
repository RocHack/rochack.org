/* multisnake, hastily hacked by victor liu */

var canvas = document.getElementById('snake-canvas');

var ctx = canvas.getContext('2d');
var SCREEN_WIDTH = $(window).width();
var SCREEN_HEIGHT = $(window).height();

$('#snake-canvas').attr('width', SCREEN_WIDTH);
$('#snake-canvas').attr('height', SCREEN_HEIGHT);

var pixel_width = 20, pixel_height = 20;

var width = Math.floor(SCREEN_WIDTH / pixel_width), height = Math.floor(SCREEN_HEIGHT / pixel_height);

var GAME_OVER;
var PAUSED;

var speed = 200;

var snake;
var numSnakes = 4;
var length;

var dir, userdir;
// 	0 left
//  1 up
//  2 right
//  3 down

var sequence, areas;
var target;
var gap = 1;

var auto = true;

init();

$(this).keydown(function(e) {
	if (e.keyCode == 37) {	// left
		
			userdir = 0;
		
	} else if (e.keyCode == 38) {	// up
		
			userdir = 1;
		
	} else if (e.keyCode == 39) {	// right
		
			userdir = 2;
		
	} else if (e.keyCode == 40) {	// down
		
			userdir = 3;
		
	} else if (e.keyCode == 84) { 	// t
		auto = !auto;
	}
});

var triggered = false;
var timer = setInterval(function() {
	// paint canvas
	
	if (!PAUSED) update();
	
	if (GAME_OVER) {
		if (!triggered) {
		ctx.fillStyle = "#FF0000";
		ctx.fillText("GAME OVER", 5, 15);
			triggered = true;
			setTimeout('init()', 3000);
		}
		return;
	}
	
	ctx.fillStyle = "#111";
	ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

	// draw path
	if (auto) {
		for (var sNum = 0; sNum < numSnakes; sNum++) {
			//var k = 0;
			var r = 90;
			var g = 90;
			var b = 90;
			if (sNum == 0) r = 120;
			if (sNum == 1) g = 120;
			if (sNum == 2) b = 120;
			if (sNum == 3) b = 14;
			ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
			for (var n = sequence[sNum].length - 1; n >= 0; n--) {
				//k++;
				//if (k % 2 == 0) continue;
				var p = sequence[sNum][n];
				ctx.fillRect(p.x * pixel_width + (10 * gap) / 2, p.y * pixel_height + (10 * gap) / 2,
							pixel_width - 10 * gap, pixel_height - 10 * gap);
			}
		}
	}
	
	// draw snake
	for (var sNum = 0; sNum < numSnakes; sNum++) {
		for (var i = 0; i < snake[sNum].length; i++) {
			var	v = 1 - (i * 0.5 / snake[sNum].length);
			var r = Math.floor(255 * v);
			var g = Math.floor(255 * v);
			var b = Math.floor(255 * v);
			if (sNum == 0) r = 255;
			if (sNum == 1) g = 255;
			if (sNum == 2) b = 255;
			ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
			ctx.fillRect(snake[sNum][i].x * pixel_width, snake[sNum][i].y * pixel_height, pixel_width - gap, pixel_height - gap);
		}
	}
	
	// draw food
	for (var sNum = 0; sNum < numSnakes; sNum++) {
		var	v = 1 - (i * 0.5 / snake[sNum].length);
		var r = Math.floor(255 * v);
		var g = Math.floor(255 * v);
		var b = Math.floor(255 * v);
		if (sNum == 0) r = 255;
		if (sNum == 1) g = 255;
		if (sNum == 2) b = 255;
		ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
		ctx.fillRect(food[sNum].x * pixel_width + gap/2, food[sNum].y * pixel_height + gap/2, pixel_width - gap, pixel_height - gap);
	}

}, speed);

function init() {
	triggered = false;
	snake = new Array(numSnakes);
	for (var i = 0; i < numSnakes; i++) snake[i] = [];
	food = [];
	for (var n = 0; n < numSnakes; n++) food[n] = makeFood();
	length = [15, 15, 15, 15];
	for (var n = 0; n < numSnakes; n++) {
		var randomSeed = {};
		randomSeed.x = Math.floor(Math.random() * (width - length[n] - 10) + length[n] + 2);
		randomSeed.y = n * 3;
		for (var i = 0; i < length[n]; i++) {
			var p = {};
			p.x = randomSeed.x - i;
			p.y = randomSeed.y;
			snake[n].unshift(p);
		}
	}
	GAME_OVER = false;
	PAUSED = false;
	dir = [0, 0, 0, 0];
	userdir = 0;
	pixel_width = SCREEN_WIDTH / width;
	pixel_height = SCREEN_HEIGHT / height;
	sequence = [];
	areas = [];
	target = {};
	target.x = 0;
	target.y = 0;
}

function makeFood() {
	points = [];
	var p;
	for (var n = 0; n < numSnakes; n++) {
		for (var x = 0; x < width; x++) {
			for (var y = 0; y < height; y++) {
				p = {};
				p.x = x;
				p.y = y;
				if (!containsPoint(snake[n], p)) {
					points.unshift(p);
				}
			}
		}
		if (points.length == 0) {
			alert('you win!');
		}
	}
	return points[Math.floor(Math.random() * points.length)];
}

function update() {
	if (isDead()) {
		GAME_OVER = true;
		return;
	}
	
	if (auto) {
		dir[0] = dijkstra(food[0], 0);
		dir[1] = dijkstra(food[1], 1);
		dir[2] = dijkstra(food[2], 2);
	} else {
		dir[0] = userdir;
		dir[1] = userdir;
		dir[2] = userdir;
	}
	
	for (var sNum = 0; sNum < numSnakes; sNum++) {
		snake[sNum][0].d = dir[sNum];
		snake[sNum].unshift(nextPoint(snake[sNum][0], dir[sNum]));
	}
	
	for (var sNum = 0; sNum < numSnakes; sNum++) {
		if (snake[sNum][0].x == food[sNum].x && snake[sNum][0].y == food[sNum].y) {
			food[sNum] = makeFood();
			//length++;
		} else {
			snake[sNum].pop();
		}
	}
	
}

function isDead() {

	for (var sNum = 0; sNum < numSnakes; sNum++) {
	for (var sNum1 = 0; sNum1 < numSnakes; sNum1++) {
		for (var i = 0; i < snake[sNum].length; i++) {
			for (var j = 0; j < snake[sNum1].length; j++) {
				if (i == j) continue;
				
					if (snake[sNum][i].x == snake[sNum1][j].x && snake[sNum][i].y == snake[sNum1][j].y) return true;
				
			}
		}
		}
		var head = snake[sNum][0];
		if (head.x < 0 || head.x >= width ||
				   head.y < 0 || head.y >= height) return true;
	}
	
	return false;
}

function nextPoint(point, dir) {
	var p;
	switch (dir) {
		case 0:		// left
			p = {};
			p.x = point.x - 1;
			p.y = point.y;
			p.d = dir;
			return p;
		case 1:		// up
			p = {};
			p.x = point.x;
			p.y = point.y - 1;
			p.d = dir;
			return p;
		case 2:		// right
			p = {};
			p.x = point.x + 1;
			p.y = point.y;
			p.d = dir;
			return p;
		case 3:		// down
			p = {};
			p.x = point.x;
			p.y = point.y + 1;
			p.d = dir;
			return p;
	}
}

















function dijkstra(target, sNum) {

	if (target == undefined) return 0;
	
	var G = {};
	G.graph = new Array(height);			// will be declared
	for (var i = 0; i < height; i++) G.graph[i] = new Array(width);
	for (var i = 0; i < height; i++) {
		for (var j = 0; j < width; j++) {
			var node = {};
			node.x = j;
			node.y = i;
			node.t_dist = Number.POSITIVE_INFINITY;
			node.visited = false;
			G.graph[i][j] = node;
		}
	}
	
	var destination_node = G.graph[target.y][target.x];
	var initial_node = G.graph[snake[sNum][0].y][snake[sNum][0].x];

	initial_node.t_dist = 0;
	unvisited_set = [];
	unvisited_set.push(initial_node);

	var current;
	
	while (unvisited_set.length > 0) {

		var min_dist = Number.POSITIVE_INFINITY;
		for (var n = 0; n < unvisited_set.length; n++) {
			var node = unvisited_set[n];
			if (node.t_dist < min_dist) {
				min_dist = node.t_dist;
				current = node;
			}
		}
	
		var index = -1;
		for (var n = 0; n < unvisited_set.length; n++) {
			if (unvisited_set[n].x == current.x && unvisited_set[n].y == current.y)
				index = n;
		}
		if (index > -1) unvisited_set.splice(index, 1);
		
		current.visited = true;

		neighbors = getNeighbors(current, G, sNum);
		//console.log(neighbors);
		
		var alt;
		for (var n = 0; n < neighbors.length; n++) {
			alt = current.t_dist + 1;
			if (alt < neighbors[n].t_dist) {
				neighbors[n].t_dist = alt;
				neighbors[n].previous = current;
				if (!neighbors[n].visited) {
					unvisited_set.push(neighbors[n]);
				}
			}
		}
		
	}

	sequence[sNum] = [];
	var node = destination_node;
	
	while (node.previous !== undefined) {
		var p = {};
		p.x = node.x;
		p.y = node.y;
		sequence[sNum].unshift(p);
		node = node.previous;
	}

	if (sequence[sNum].length > 0) {
		return getDirection(snake[sNum][0], sequence[sNum][0]);
	}
	
	return 0;
	
}

function getNeighbors(current, G, sNum) {
	var neighbors = [];
	var up = {};
	up.x = current.x;
	up.y = current.y-1;
	if (!containsPoint(snake[0], up) && !containsPoint(snake[1], up) && !containsPoint(snake[2], up) && current.x >= 0 && current.x < width &&
		current.y - 1 >= 0 && current.y - 1 < height) neighbors.push(G.graph[up.y][up.x]);
	var dn = {};
	dn.x = current.x;
	dn.y = current.y+1;
	if (!containsPoint(snake[0], dn) && !containsPoint(snake[1], dn) && !containsPoint(snake[2], dn) && current.x >= 0 && current.x < width &&
		current.y + 1 >= 0 && current.y + 1 < height) neighbors.push(G.graph[dn.y][dn.x]);
	var lt = {};
	lt.x = current.x-1;
	lt.y = current.y;
	if (!containsPoint(snake[0], lt) && !containsPoint(snake[1], lt) && !containsPoint(snake[2], lt) && current.x - 1 >= 0 && current.x - 1 < width &&
		current.y >= 0 && current.y < height) neighbors.push(G.graph[lt.y][lt.x]);
	var rt = {};
	rt.x = current.x+1;
	rt.y = current.y;
	if (!containsPoint(snake[0], rt) && !containsPoint(snake[1], rt) && !containsPoint(snake[2], rt) && current.x + 1 >= 0 && current.x + 1 < width &&
		current.y >= 0 && current.y < height) neighbors.push(G.graph[rt.y][rt.x]);
	return neighbors;
}

function containsPoint(snake, point) {
	var index = -1;
	for (var n = 0; n < snake.length; n++) {
		if (snake[n].x == point.x && snake[n].y == point.y)
			index = n;
	}
	return (index != -1);
}

function getDirection(a, b) {
	if (a == undefined || b == undefined) return;
	if (a.x == b.x) {
		if (a.y > b.y) {
			return 1;
		} else {
			return 3;
		}
	} else {
		if (a.x > b.x) {
			return 0;
		} else {
			return 2;
		}
	}
}
