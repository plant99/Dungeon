var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var canGoLeft = true, canGoRight = true, canGoTop = true, canGoBottom = true ;
var checkLeft,checkRight, checkTop, checkBottom ;
var canvas1 = document.getElementById('canvas1')
var ctx1 = canvas1.getContext('2d')
var lowerX, lowerY, upperX,upperY ;
var futureX, futureY,xIndex, yIndex ;
var x1,y1,x2,y2 ;
var cantGoHere = [[],[],[],[],[],[],[],[],[],[]] ;
var cantGoHereTemp = [] ;
var secondStageRunning = false ;
var card = document.querySelector('.card')
var timerStarted = false ;
var timerStartButton = document.getElementById('timer_start')
var timeLeft = document.querySelector('.timeLeft')
var timeLeftNumber,timerRunning ;
loadTiles()
makePlayers()
var p = new Player(20,20,0,0) ;
	drawPlayer(p)
	ctx1.font = "14px Monospace"
	ctx1.beginPath()
	ctx1.moveTo(0,0);
	ctx1.fillStyle = "white" ;
	ctx1.fillText('START',0,30) ;
	ctx1.closePath()

	ctx1.beginPath()
	ctx1.moveTo(0,0);
	ctx1.fillStyle = "white" ;
	ctx1.fillText('END',688,385) ;
window.onkeydown = function(e){
	canMove = true ;
	if(timerStarted){
		if(e.keyCode == 37){
		futureX = p.xPos - 40 ;
		futureY = p.yPos ;
		xIndex = Math.floor(futureX/40) ;
		yIndex = Math.floor(futureY/40) ;
		canMove = !cantGoHere[yIndex][xIndex]
		canMove = canMove && (p.xPos-40)>=0? true: false ;
		e.preventDefault();
		if(canMove){
			p.yVel = 0;
			p.xVel = -40 ;
			p.xPos += p.xVel ;
		}
	}
	if(e.keyCode == 38){
		futureX = p.xPos ;
		futureY = p.yPos - 40 ;
		xIndex = Math.floor(futureX/40) ;
		yIndex = Math.floor(futureY/40) ;
		canMove = !cantGoHere[yIndex][xIndex]
		canMove = canMove && (p.yPos-40)>=0? true: false ;
		e.preventDefault();
		if(canMove){
			p.yVel = -40;
			p.xVel = 0 ;
			p.yPos += p.yVel ;
		}
	}
	if(e.keyCode == 39){
		futureX = p.xPos + 40 ;
		futureY = p.yPos ;
		xIndex = Math.floor(futureX/40) ;
		yIndex = Math.floor(futureY/40) ;
		canMove = !cantGoHere[yIndex][xIndex]
		canMove = canMove && (p.xPos+40)<=760? true: false ;
		e.preventDefault();
		if(canMove){
			p.yVel = 0;
			p.xVel = +40 ;
			p.xPos += p.xVel ;
		}
	}
	if(e.keyCode == 40){
		console.log('Chutiya')
		futureX = p.xPos ;
		futureY = p.yPos + 40 ;
		xIndex = Math.floor(futureX/40) ;
		yIndex = Math.floor(futureY/40) ;
		canMove = !cantGoHere[yIndex][xIndex]
		canMove = canMove && (p.yPos+40)<=400? true: false ;
		e.preventDefault();
		if(canMove){
			p.yVel = +40;
			p.xVel = 0 ;
			p.yPos += p.yVel ;
		}
	}
	}
	else if (e.keyCode == 27) {
        card.style.display = 'none';
        secondStageRunning = false ;
        p.xPos = 20 ;
        p.yPos = 20 ;
        ctx.clearRect(0,0,1200,1200)
        for(var i=0 ;i<=18 ;i++){
		for(var j=0 ;j<10 ;j++){
			cantGoHere[j][i] = false ;
			}
		}
        generateFirstFloor()
        drawBoxes()
    }
	drawPlayer(p)
	ctx1.font = "14px Monospace"
	ctx1.beginPath()
	ctx1.moveTo(0,0);
	ctx1.fillStyle = "white" ;
	ctx1.fillText('START',0,30) ;
	ctx1.fillText('END',688,385) ;
	/*

	ctx.clearRect(0,0,1200,600)
	ctx.beginPath()
	ctx.arc(p.xPos, p.yPos,  5, 0, 2*Math.PI)
	ctx.fill()
	*/
	//draw other things
}
timerStartButton.onclick = function(){
	timerStarted = true ;
	 timerRunning = setInterval(function(){
		if(timeLeftNumber === 0){
			clearInterval(timerRunning)
			p.xPos = 20 ;
			p.yPos = 20 ;
			p.xVel = 0 ;
			p.yVel = 40 ;
			drawPlayer(p)
			timerStarted = false ;
			timeLeft.innerHTML = 60
			timeLeftNumber = 60 ;
		}else{
			timeLeftNumber = Number( timeLeft.innerHTML ) ;
			timeLeftNumber -- ;
			timeLeft.innerHTML = timeLeftNumber ;
		}
		
	},1000)

	if(secondStageRunning){

	}


}

for(var i=0 ;i<18 ;i++){
	for(var j=0 ;j<10 ;j++){
		cantGoHere[j][i] = false ;
	}
}

generateFirstFloor()
drawBoxes();
//

var checkEndReached = setInterval(checkEnd,100)


function drawBoxes(){
	for(var i=0 ;i<10 ;i++){
	for(var j=0 ;j<=18 ;j++){
		if(cantGoHere[i][j]){
			x1 = j*40 ;
			y1 = i*40 ;
			ctx.beginPath()
			ctx.fillStyle = "red" ;
			//ctx.fillRect(x1,y1,40,40) ;
			ctx.drawImage(six,x1,y1)
		}else{
			x1 = j*40 ;
			y1 = i*40 ;
			ctx.drawImage(five,x1,y1)

		}
	}
}
}
function drawPlayer(p){
	ctx1.clearRect(0,0,1200,600)
	ctx1.beginPath()
//	ctx.fillRect( p.xPos, p.yPos, 100, 100)
	if(p.xVel == 0){
		if(p.yVel > 0){
			ctx1.drawImage(one, p.xPos-15, p.yPos-20)
		}else{
			ctx1.drawImage(two, p.xPos-20, p.yPos-20)
		}
	}else{
		if(p.xVel > 0){
			ctx1.drawImage(three, p.xPos-10, p.yPos-20)
		}else{
			ctx1.drawImage(four, p.xPos-15, p.yPos-20)
		}
	}
}



function buildNoEntryZones(index,list){
	for(var i=0 ;i< list.length ;i++){
		cantGoHere[index][list[i]] = true ;
	}
}
function generateFirstFloor(){
	buildNoEntryZones(0,[1,2,3,4,5,6,15])
	buildNoEntryZones(1,[2,4,5,8,9,10,11,13,15,16,17])
	buildNoEntryZones(2,[7,11,13,14,17])
	buildNoEntryZones(3,[0,2,3,4,6,8,9,13,14,16,17])
	buildNoEntryZones(4,[3,8,9,11])
	buildNoEntryZones(5,[1,5,6,8,9,12,14,15,16,18])
	buildNoEntryZones(6,[3,4,5,12,16,18])
	buildNoEntryZones(7,[0,1,3,7,9,12,11,12,15,16])
	buildNoEntryZones(8,[3,4,6,7,9,10,12,14,15,16,17])
	buildNoEntryZones(9,[0,1,6,12,16])
}
function generateSecondFloor(){
	buildNoEntryZones(0,[5,9,11,16,18])
	buildNoEntryZones(1,[1,2,3,7,11,13,14,16,18])
	buildNoEntryZones(2,[3,4,5,6,7,8,9,11,13,16,18])
	buildNoEntryZones(3,[2,3,4,9,10,11,13,14,18])
	buildNoEntryZones(4,[0,3,4,5,7,9,13,15,16])
	buildNoEntryZones(5,[0,1,5,7,11,16])
	buildNoEntryZones(6,[0,1,2,3,5,8,9,10,15])
	buildNoEntryZones(7,[6,8,11,14,16,18])
	buildNoEntryZones(8,[1,2,4,5,11,12,13,16])
	buildNoEntryZones(9,[2,7,9,16,18])
}

function Player(xPos, yPos, xVel, yVel){
	this.xVel = xVel ;
	this.yVel = yVel ;
	this.xPos = xPos ;
	this.yPos = yPos ;
}
function makePlayers(){

	one = new Image() ;
	one.src = "pics/bottom.png";

	two = new Image() ;
	two.src = "pics/top.png";

	three = new Image() ;
	three.src = "pics/right.png";

	four = new Image() ;
	four.src = "pics/left.png";
}
function loadTiles(){
	five = new Image();
	five.src = 'pics/tile1.jpeg'
	six = new Image();
	six.src = 'pics/tile2.jpeg'
}
function checkEnd(){ 
	if((p.xPos === 700) && (p.yPos === 380)){
		clearInterval(checkEndReached);

		if(secondStageRunning){
			console.log('Chutiya')
			card.style.display = 'block' ;
		}

		clearInterval(timerRunning)
		timerStarted = false ;
		timeLeft.innerHTML = 60
		timeLeftNumber = 60 ;
		secondStageRunning = true ;

		// make every things false again
		for(var i=0 ;i<18 ;i++){
			for(var j=0 ;j<10 ;j++){
				cantGoHere[j][i] = false ;
			}
		}

		//generate Sec floor
		generateSecondFloor() ;

		//draw second floor
		drawBoxes()

		//reset player position
		p.xPos = 20 ;
		p.yPos = 20 ;
		p.xVel =  40 ;
		p.yVel = 0 ;
		drawPlayer(p);
		checkEndReached  = setInterval(checkEnd, 100)
	}
}