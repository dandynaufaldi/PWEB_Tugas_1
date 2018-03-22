var mouse = {
	x : undefined,
	y : undefined
}
var mycanvas = document.getElementById("canvas");
var clearbutton = document.getElementById("clear-button");
// mycanvas.addEventListener("click", function(event){
// 	mouse.x = event.x - window.innerWidth*0.23;
// 	mouse.y = event.y - window.innerHeight*0.05;
// 	console.log(mouse);
// })

var colorList = ["red", "yellow", "green"];
var circleCounter = 0;
var myGameArea = {
	canvas : document.getElementById("canvas"),
	start : function(){
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.context = this.canvas.getContext("2d");
		this.interval = setInterval(updateGameArea, 20);
	},
	clear : function(){
		this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
	}
}
var cir_arr = [];
if (localStorage){
	var data = JSON.parse(localStorage.getItem('circleObj'));
	for (var i = data.length - 1; i >= 0; i--) {
		var temp = new Circle(data[i]['x'], data[i]['y'], data[i]['color']);
		temp.size = data[i]['size'];
		temp.color = data[i]['color'];
		temp.xDir = data[i]['xDir'];
		temp.yDir = data[i]['yDir'];
		cir_arr.push(temp);
	}
	console.log('load localStorage');
}
var circles = {
	arr : cir_arr,
	update : function(){
		for (var i = this.arr.length - 1; i >= 0; i--) {
			for (var j = this.arr.length - 1; j >= 0; j--) {
				if (i != j && this.arr[i].isCollide(this.arr[j])){
					this.arr[i].changeDir(this.arr[j]);
					this.arr[i].size *= 4 / 5;
					this.arr[j].size *= 4 / 5;
				}
			}
			if (this.arr[i].size < 5){
				this.arr.splice(i,1);
				i++;
				continue;
			}
			else this.arr[i].move(5,4,myGameArea.canvas.width, myGameArea.canvas.height);
			this.arr[i].draw(myGameArea.context);
		}
	}
}

clearbutton.addEventListener("click", function(e) {
	while(circles.arr.length > 0){
		circles.arr.pop();
	}
	localStorage.clear();
});

mycanvas.addEventListener("click", function(e){
	var temp = mycanvas.getBoundingClientRect();
    mouse.x = e.pageX - mycanvas.offsetLeft;// - temp.left;// - mycanvas.offsetLeft;
    mouse.y = e.pageY - mycanvas.offsetTop;// - temp.top;// - mycanvas.offsetTop;
    // console.log(this.offsetLeft);
    // console.log(this.offsetTop);
    
    // for (var i =circles.arr.length - 1; i >= 0; i--) {
	   //  if (circles.arr[i].isClick(mouse.x, mouse.y)){
	   //  	circles.arr.splice(i,1);
	   //  	return;
	   //  }
    // }
    if (mouse.x - 20 < 0) mouse.x = 20;
    else if (mouse.x + 20 > window.innerWidth) mouse.x = window.innerWidth - 20;
	if (mouse.y - 20 < 0) mouse.y = 20;
    else if (mouse.y + 20 > window.innerHeight) mouse.y = window.innerHeight - 20;

    var obj = new Circle(mouse.x, mouse.y, colorList[Math.floor(Math.random()*colorList.length)]);
    console.log(mouse);
    if (circleCounter % 4 == 0){
    	obj.xDir = -1;
    	obj.yDir = -1;
    }
    else if (circleCounter % 4 == 1){
    	obj.xDir = -1;
    	obj.yDir = 1;
    }
    else if (circleCounter % 4 == 2){
    	obj.xDir = 1;
    	obj.yDir = -1;
    }
    else if (circleCounter % 4 == 3){
    	obj.xDir = 1;
    	obj.yDir = 1;
    }
    circles.arr.push(obj);
    circleCounter++;
});
function Circle(x, y, color){
	this.x = x;
	this.y = y;
	this.size = 40;
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
		c.beginPath(0,0);
		c.arc(this.x, this.y, this.size, 0, 2*Math.PI);
		c.fillStyle = this.color;
		c.fill();
		
	}
	this.move = function(xA, yA, xMax, yMax){
		var left = this.x - this.size;
		var right = this.x + this.size;
		var bottom = this.y + this.size;
		var up = this.y - this.size;

		if (right >= xMax) this.xDir = -1;
		else if (left <= 0) this.xDir = 1;
		this.x += this.xDir * xA;

		if(bottom >= yMax) this.yDir = -1;
		else if (up <= 0) this.yDir = 1;
		this.y += this.yDir * yA;
	}
	this.isClick = function(mouseX, mouseY){
		var res = (mouseX - this.x)**2 + (mouseY - this.y)**2;
		var rsq = this.size**2;
		return (res <= rsq);
	}
	this.changeDir = function(another){
		if (this.xDir != another.xDir){
			this.xDir *= -1;
			another.xDir *= -1;
		}
		else this.xDir *= -1;

		if (this.yDir != another.yDir){
			this.yDir *= -1;
			another.yDir *= -1;
		}
		else this.yDir *= -1;
	}
}


function startGame(){
	myGameArea.start();
}


function updateGameArea(){
	myGameArea.clear();
	circles.update();
	// console.log('update');
	//Update local
	localStorage.setItem('circleObj', JSON.stringify(circles.arr));
}



// mycanvas.width = window.innerWidth;
// mycanvas.height = window.innerHeight;
// console.log(mycanvas);

// ctx = mycanvas.getContext("2d");

// // ctx.beginPath(0,0);
// ctx.arc(0,0,50,0,2*Math.PI);
// ctx.fillStyle = "red";
// ctx.fill();