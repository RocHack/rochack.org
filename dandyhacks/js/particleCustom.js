particlesJS("particles-js", {
	 "particles": {
	 "number": {
	   "value": 118,
	   "density": {
		 "enable": true,
		 "value_area": 1496.652225285545
	   }
	 },
	 "color": {
	   "value": "#1700d6"
	 },
	 "shape": {
	   "type": "circle",
	   "stroke": {
		 "width": 0,
		 "color": "#c8cfd9"
	   },
	   "polygon": {
		 "nb_sides": 4
	   },
	   "image": {
		 "src": "img/github.svg",
		 "width": 100,
		 "height": 100
	   }
	 },
	 "opacity": {
	   "value": 0.6,
	   "random": false,
	   "anim": {
		 "enable": false,
		 "speed": 1,
		 "opacity_min": 0.1,
		 "sync": false
	   }
	 },
	 "size": {
	   "value": 4,
	   "random": true,
	   "anim": {
		 "enable": false,
		 "speed": 40,
		 "size_min": 0.1,
		 "sync": false
	   }
	 },
	 "line_linked": {
	   "enable": true,
	   "distance": 150,
	   "color": "#6670f9",
	   "opacity": 0.1811736904293028,
	   "width": 1
	 },
	 "move": {
	   "enable": true,
	   "speed": 3.5,
	   "direction": "none",
	   "random": false,
	   "straight": false,
	   "out_mode": "bounce",
	   "bounce": false,
	   "attract": {
		 "enable": false,
		 "rotateX": 866.4828672705786,
		 "rotateY": 1200
	   }
	 }
	},
	"interactivity": {
	 "detect_on": "canvas",
	 "events": {
	   "onhover": {
		 "enable": true,
		 "mode": "repulse"
	   },
	   "onclick": {
		 "enable": true,
		 "mode": "push"
	   },
	   "resize": true
	 },
	 "modes": {
	   "grab": {
		 "distance": 400,
		 "line_linked": {
		   "opacity": 1
		 }
	   },
	   "bubble": {
		 "distance": 400,
		 "size": 40,
		 "duration": 2,
		 "opacity": 8,
		 "speed": 3
	   },
	   "repulse": {
		 "distance": 200,
		 "duration": 0.4
	   },
	   "push": {
		 "particles_nb": 4
	   },
	   "remove": {
		 "particles_nb": 2
	   }
	 }
	},
	"retina_detect": true
});

var update;
update = function() {
  requestAnimationFrame(update);
};
requestAnimationFrame(update);
