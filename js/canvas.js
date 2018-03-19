
function Circle(x, y, color){
	this.x = x;
	this.y = y;
	this.size = 20;
	this.color = color;
	this.xDir = 1;
	this.yDir = 1;

	this.isCollide = function(another){
		var difx = Math.abs(this.x - another.x);
		var dify = Math.abs(this.y - another.y);
		var dist = Math.sqrt(difx**2 + dify**2)
		return (dist <= this.size + another.size);	
	}
	this.draw = function(c){
		c.beginPath();
		c.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		c.fillStyle = this.color;
		c.fill();
	}
	this.move = function(xA, yA, xMax, yMax){
		var left = this.x - this.size;
		var right = this.x + this.size;
		var bottom = this.y + this.size;
		var up = this.y - this.size;

		if (right >= xMax || left <= 0) this.xDir = -1;
		this.x += this.xDir * xA;

		if(bottom >= yMax || up <= 0) this.yDir = -1;
		this.y = this.yDir * yA;
	}
	this.isClick = function(mouseX, mouseY){
		var res = (mouseX - this.x)**2 + (mouseY - this.y)**2;
		var rsq = this.size**2;
		return (res <= rsq);
	}

}

var mycanvas = document.getElementById("canvas");
mycanvas.width = window.innerWidth;
mycanvas.height = window.innerHeight;
console.log(mycanvas);

ctx = mycanvas.getContext("2d");

// ctx.beginPath(0,0);
ctx.arc(0,0,50,0,2*Math.PI);
ctx.fillStyle = "red";
ctx.fill();
