/*
	Starfield lets you take a div and turn it into a starfield.
  Adapted from http://www.codeproject.com/Articles/642499/Learn-JavaScript-Part-Create-a-Starfield
*/

// Initialise starfield on load
window.onload = function(e) { 
   	var container = document.getElementById('starfield');
	var starfield = new Starfield();
	starfield.initialise(container);
	starfield.start();
}

//	Define the starfield class.
function Starfield() {
	this.fps = 15;
	this.canvas = null;
	this.width = 0;
	this.width = 0;
	this.minVelocity = 1;
	this.maxVelocity = 5;
	this.stars = 100;
	this.intervalId = 0;
}

//	The main function - initialises the starfield.
Starfield.prototype.initialise = function(div) {
	var self = this;

	//	Store the div.
	this.containerDiv = div;
	self.width = window.innerWidth;
	self.height = window.innerHeight;

	window.onresize = function(event) {
		self.width = window.innerWidth;
		self.height = window.innerHeight;
		self.canvas.width = self.width;
		self.canvas.height = self.height;
		self.draw();
 	}

	//	Create the canvas.
	var canvas = document.createElement('canvas');
	div.appendChild(canvas);
	this.canvas = canvas;
	this.canvas.width = this.width;
	this.canvas.height = this.height;
};

Starfield.prototype.start = function() {

	//	Create the stars.
	var stars = [];
	for(var i=0; i<this.stars; i++) {
		stars[i] = new Star(Math.random()*this.width, Math.random()*this.height, 
		 (Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
	}
	this.stars = stars;

	var self = this;
	//	Start the timer.
	this.intervalId = setInterval(function() {
		self.update();
		self.draw();	
	}, 1000 / this.fps);
};

Starfield.prototype.stop = function() {
	clearInterval(this.intervalId);
};

Starfield.prototype.update = function() {
	var dt = 1 / this.fps;

	for(var i=0; i<this.stars.length; i++) {
		var star = this.stars[i];
		star.y += dt * star.velocity;
		//	If the star has moved from the bottom of the screen, spawn it at the top.
		if(star.y > this.height) {
			this.stars[i] = new Star(Math.random()*this.width, 0, 
		 	(Math.random()*(this.maxVelocity - this.minVelocity))+this.minVelocity);
		}
	}
};

Starfield.prototype.draw = function() {

	//	Get the drawing context.
	var ctx = this.canvas.getContext("2d");

	//	Draw the background.
 	ctx.fillStyle = '#111';
	ctx.fillRect(0, 0, this.width, this.height);

	//	Draw stars.

	for(var i=0; i<this.stars.length;i++) {
	  var star = this.stars[i];
	  ctx.fillStyle = star.color;
		ctx.fillRect(star.x, star.y, star.size, star.size);
	}
};

function Star(x, y, velocity) {
  colors = ['#888','#008D8D','#8D8D00','#8D0000'] //  Spectrum inspired colours
	this.x = x;
	this.y = y; 
	this.size =  Math.random()*3+2;
	this.color = colors[parseInt(Math.random() * colors.length)]
	this.velocity = velocity;
}
