var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var canGoLeft = true, canGoRight = true, canGoTop = true, canGoBottom = true ;
var checkLeft,checkRight, checkTop, checkBottom ;
var canvas1 = document.getElementById('canvas1')
var ctx1 = canvas1.getContext('2d')
var lowerX, lowerY, upperX,upperY ;
function Player(xPos, yPos, xVel, yVel){
	this.xVel = xVel ;
	this.yVel = yVel ;
	this.xPos = xPos ;
	this.yPos = yPos ;
}
function makePlayers(){

	one = new Image() ;
	one.src = "pics/one.jpg";

	two = new Image() ;
	two.src = "pics/two.jpg";

	three = new Image() ;
	three.src = "pics/three.jpg";

	four = new Image() ;
	four.src = "pics/four.jpg";
}
makePlayers()
var p = new Player(15,15,0,0) ;

	ctx.clearRect(0,0,1200,600)
	ctx.beginPath()
	ctx.arc(p.xPos, p.yPos,  5, 0, 2*Math.PI)
	ctx.fill()
window.onkeydown = function(e){
	if(e.keyCode == 37){
		e.preventDefault();
		if(canGoLeft){
			p.yVel = 0;
			p.xVel = -5 ;
			p.xPos += p.xVel ;
		}
	}
	if(e.keyCode == 38){
		e.preventDefault();
		if(canGoTop){
			p.yVel = -5;
			p.xVel = 0 ;
			p.yPos += p.yVel ;
		}
	}
	if(e.keyCode == 39){
		e.preventDefault();
		if(canGoRight){
			p.yVel = 0;
			p.xVel = 5 ;
			p.xPos += p.xVel ;
		}
	}
	if(e.keyCode == 40){
		e.preventDefault();
		if(canGoBottom){
			p.yVel = 5 ;
			p.xVel = 0;
			p.yPos += p.yVel ;
		}
	}
	//drawPlayer(p)
	ctx.clearRect(0,0,1200,600)
	ctx.beginPath()
	ctx.arc(p.xPos, p.yPos,  5, 0, 2*Math.PI)
	ctx.fill()
}
function drawPlayer(p){
	ctx.clearRect(0,0,1200,600)
	ctx.beginPath()
//	ctx.fillRect( p.xPos, p.yPos, 100, 100)
	if(p.xVel == 0){
		if(p.yVel > 0){
			ctx.drawImage(one, p.xPos, p.yPos)
		}else{
			ctx.drawImage(two, p.xPos, p.yPos)
		}
	}else{
		if(p.xVel > 0){
			ctx.drawImage(three, p.xPos, p.yPos)
		}else{
			ctx.drawImage(four, p.xPos, p.yPos)
		}
	}
}
var wallExitsBetween = [] ;

wallExitsBetween.push('40-40-80-40')
wallExitsBetween.push('80-40-80-80')
wallExitsBetween.push('40-80-80-80')
wallExitsBetween.push('40-40-40-80')

for(var i=0 ;i<wallExitsBetween.length ;i++){
	ctx1.beginPath();
	coordinates = wallExitsBetween[i].split('-')
	var x1 = coordinates[0] ;
	var y1 = coordinates[1] ;
	var x2 = coordinates[2] ;
	var y2 = coordinates[3] ;
	ctx1.moveTo(x1,y1 ) ;
	ctx1.lineTo(x2,y2 ) ;
	ctx1.stroke() ;
	console.log('done')
}

function checkWallAround(){
	lowerX = Math.floor(p.xPos/40)*40 ;
	upperX = lowerX + 40 ;
	lowerY = Math.floor(p.yPos/40)*40 ;
	upperY = lowerY + 40 ;
		
	if(p.xPos == lowerX+5){
		if(wallExitsBetween.indexOf(lowerX+'-'+lowerY + '-'+lowerX + '-' +upperY) != -1){
		canGoLeft = false;
		}else{
			canGoLeft = true ;
		}
	}else{
		canGoLeft = true ;
	}

	if(p.xPos == upperX-5){
		if(wallExitsBetween.indexOf(upperX+'-'+lowerY + '-'+upperX + '-' +upperY) != -1){
		canGoRight = false;
		}else{
			canGoRight = true ;
		}
	}else{
		canGoRight = true ;
	}


	if(p.yPos == lowerY+5){
		if(wallExitsBetween.indexOf(lowerX+'-'+lowerY + '-'+upperX + '-' +lowerY) != -1){
		canGoTop = false;
		}else{
			canGoTop = true ;
		}
	}else{
		canGoTop = true ;
	}
	if(p.yPos == upperY-5){
		if(wallExitsBetween.indexOf(lowerX+'-'+upperY + '-'+upperX + '-' +upperY) != -1){
		canGoBottom = false;
		}else{
			canGoBottom = true ;
		}
	}else{
		canGoBottom = true ;
	}
	
}

setInterval(checkWallAround,200) ;