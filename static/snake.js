/* snake game and ai -- sloppily hacked by victor liu */

var canvas = document.getElementById('snake-canvas');

var ctx = canvas.getContext('2d');
var SCREEN_WIDTH = $(window).width();
var SCREEN_HEIGHT = $(window).height();

$('#snake-canvas').attr('width', SCREEN_WIDTH);
$('#snake-canvas').attr('height', SCREEN_HEIGHT);

var pixel_width = 40, pixel_height = 40;

var width = Math.floor(SCREEN_WIDTH / pixel_width), height = Math.floor(SCREEN_HEIGHT / pixel_height);

var GAME_OVER;
var PAUSED;

var speed = 100;

var snake;
var length;

var dir, userdir;
// 	0 left
//  1 up
//  2 right
//  3 down

var sequence, areas;
var target;
var gap = 5;

var auto = true;

init();

$(this).keydown(function(e) {
	if (e.keyCode == 37) {	// left
		if (dir != 2) {
			userdir = 0;
		}
	} else if (e.keyCode == 38) {	// up
		if (dir != 3) {
			userdir = 1;
		}
	} else if (e.keyCode == 39) {	// right
		if (dir != 0) {
			userdir = 2;
		}
	} else if (e.keyCode == 40) {	// down
		if (dir != 1) {
			userdir = 3;
		}
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
		ctx.fillStyle = "#CCFF33";
		for (var n = 0; n < sequence.length; n++) {
			var p = sequence[n];
			ctx.fillRect(p.x * pixel_width + (5 * gap) / 2, p.y * pixel_height + (5 * gap) / 2,
                        pixel_width - 5 * gap, pixel_height - 5 * gap);
		}
	}
	
	// draw snake
	for (var i = 0; i < snake.length; i++) {
		var	v = 1 - (i * 0.5 / snake.length);
		var r = Math.floor(255 * v);
		var g = Math.floor(255 * v);
		var b = Math.floor(255);
		ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
		ctx.fillRect(snake[i].x * pixel_width, snake[i].y * pixel_height, pixel_width - gap, pixel_height - gap);
	}
	
	// draw food
	ctx.fillStyle = "#FF6600";
	ctx.fillRect(food.x * pixel_width + gap/2, food.y * pixel_height + gap/2, pixel_width - gap, pixel_height - gap);

}, speed);

function init() {
	triggered = false;
	snake = [];
	food = makeFood();
	length = 5;
	for (var i = 0; i < length; i++) {
		var p = {};
		p.x = Math.floor(width / 2) - i;
		p.y = Math.floor(height / 2);
		snake.unshift(p);
	}
	GAME_OVER = false;
	PAUSED = false;
	dir = userdir = 0;
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
	for (var x = 0; x < width; x++) {
		for (var y = 0; y < height; y++) {
			p = {};
			p.x = x;
			p.y = y;
			if (!containsPoint(snake, p)) {
				points.unshift(p);
			}
		}
	}
	if (points.length == 0) {
		alert('you win!');
	}
	return points[Math.floor(Math.random() * points.length)];
}

function update() {
	if (isDead()) {
		GAME_OVER = true;
		return;
	}
	
	if (auto) {
		dir = userdir = dijkstra(food);
	} else {
		dir = userdir;
	}
	
	snake[0].d = dir;
	snake.unshift(nextPoint(snake[0], dir));
	
	if (ateFood()) {
		food = makeFood();
		length++;
	} else {
		snake.pop();
	}
	
}

function isDead() {
	for (var i = 0; i < snake.length; i++) {
		for (var j = 0; j < snake.length; j++) {
			if (i == j) continue;
			if (snake[i].x == snake[j].x && snake[i].y == snake[j].y) return true;
		}
	}
	var head = snake[0];
	return head.x < 0 || head.x >= width ||
               head.y < 0 || head.y >= height;
}

function ateFood() {
	return snake[0].x == food.x && snake[0].y == food.y;
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

















function dijkstra(target) {
	
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
	var initial_node = G.graph[snake[0].y][snake[0].x];

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

		neighbors = getNeighbors(current, G);
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

	sequence = [];
	var node = destination_node;
	
	while (node.previous !== undefined) {
		var p = {};
		p.x = node.x;
		p.y = node.y;
		sequence.unshift(p);
		node = node.previous;
	}

	if (sequence.length > 0) {
		return getDirection(snake[0], sequence[0]);
	}
	
	return 0;
	
}

function getNeighbors(current, G) {
	var neighbors = [];
	var up = {};
	up.x = current.x;
	up.y = current.y-1;
	if (!containsPoint(snake, up) && current.x >= 0 && current.x < width &&
		current.y - 1 >= 0 && current.y - 1 < height) neighbors.push(G.graph[up.y][up.x]);
	var dn = {};
	dn.x = current.x;
	dn.y = current.y+1;
	if (!containsPoint(snake, dn) && current.x >= 0 && current.x < width &&
		current.y + 1 >= 0 && current.y + 1 < height) neighbors.push(G.graph[dn.y][dn.x]);
	var lt = {};
	lt.x = current.x-1;
	lt.y = current.y;
	if (!containsPoint(snake, lt) && current.x - 1 >= 0 && current.x - 1 < width &&
		current.y >= 0 && current.y < height) neighbors.push(G.graph[lt.y][lt.x]);
	var rt = {};
	rt.x = current.x+1;
	rt.y = current.y;
	if (!containsPoint(snake, rt) && current.x + 1 >= 0 && current.x + 1 < width &&
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
