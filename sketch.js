var back = [];
var ninja;
var scl = 600;
var x = scl;
var y=0;
var speed=2;
var ninjax = 75;
var ninjay = 520;
var attackAnimation;
var hearthImg;
var hearthCount=3;
var enemies = new Array();
var currentScene = 2;

//Todo: collision control, jumping speed, speed in general, life management, knife throwing, level system

function setup() {
  createCanvas(scl,scl);
  
  // loading the background images
  for(var i=1; i<12; i++){
		back[i] = loadImage("assets/back" + i + ".png");
  }
  
  // loading hearth image
  hearthImg = loadImage("assets/hearth.png");
  
  // creating the ninja warrior
  ninja = createSprite(ninjax,ninjay,20,20);
  ninja.addAnimation("running", "assets/Run__000.png", "assets/Run__009.png");
  ninja.addAnimation("dying", "assets/Dead__000.png", "assets/Dead__009.png");
  attackAnimation = ninja.addAnimation("attacking", "assets/Attack__000.png", "assets/Attack__009.png");
  attackAnimation.frameDelay = 0.5;
  attackAnimation.looping = false;
  
  var animation = ninja.addAnimation("jumping", "assets/Jump__000.png", "assets/Jump__009.png");
  animation.frameDelay = 8;
  
  // changing the size of ninja
  ninja.scale=0.15;
  ninja.debug= true;
  ninja.setCollider("circle",0,0,120);
  
  // creating enemy
  createEnemies(5);
}

function draw() {	

	switch(currentScene){
		case 1:
			drawGame();
			break;
			
		case 2:
			drawStart();
			break;
			
		default:
			break;		
	}
}

function drawStart(){
	drawStill();
	textSize(40);
	fill(22, 39, 86);
	rect(200,200,200,50);
	rect(200,270,200,100);
	
	fill(255);
	text("Start",250,240);
	textSize(15);
	text("Super early alfa version.", 210, 310);
	text("Use arrows for control", 210, 330);
	text("and 'a' for attacking", 210, 350);
	if((mouseX>200 && mouseX<400)&&(mouseY>200 && mouseY<250)){
		fill(13,108,13,100);
		rect(200,200,200,50);
	}
	
	
}


function drawGame(){
	
	drawBackground();
	drawHearth(hearthCount);
    drawSprites();
	checkNinja();
	checkOverlap();
}

function drawHearth(number){
	
	for(var i=0; i<number; i++){
		image(hearthImg,30+i*30,100, 25,25 );
	}

}

function checkOverlap(){
	
	for(var i =0; i<enemies.length; i++){
		
		if(ninja.overlap(enemies[i])){
			if(ninja.getAnimationLabel()==="attacking" ){
				enemies[i].position.x=scl+random(0,600);
				enemies[i].position.y=ninjay;
				enemies[i].setVelocity(-random(2,6),0);
			}
			else{
				hearthCount--;
				ninja.changeAnimation("dying");
			}
		}
		if(enemies[i].position.x<0){
			enemies[i].position.x=scl+random(0,600);
			enemies[i].position.y=ninjay;
			enemies[i].setVelocity(-random(2,6),0);
		}
	}
	
}


// checking if the ninja position is not conflicting with reality

function checkNinja(){
	// jumping max position
	if(ninja.position.y<ninjay-200){
		ninja.velocity.y=4;
	}
	if(ninja.position.y>ninjay){
		ninja.velocity.y=0;
		ninja.position.y=ninjay;
		ninja.changeAnimation("running");
	}
	if((ninja.getAnimationLabel()==="attacking")&&(attackAnimation.frameChanged===false)){
		attackAnimation.rewind();
		ninja.changeAnimation("running");
		ninja.setCollider("circle",0,0,120);
	}
}

function keyPressed(){
	if(keyCode === UP_ARROW) {
		ninja.changeAnimation("jumping");
		ninja.velocity.y = -4; 
 	} else if (keyCode === RIGHT_ARROW) {
		if(ninja.getAnimationLabel()!=="jumping"){
			ninja.changeAnimation("running");
		}
		ninja.position.x+=10;
	} else if (keyCode === LEFT_ARROW) {
		if(ninja.getAnimationLabel()!=="jumping"){
			ninja.changeAnimation("running");	
		}
		ninja.position.x-=10;
	} else if (keyCode === 65) {
		ninja.changeAnimation("attacking");
		ninja.setCollider("circle",0,0,200);
	}
}

function createEnemies(number){
	
	var enemy;
	
	for(var i=0; i<number; i++){
		
		enemy = createSprite(random(scl,scl+400), ninjay,20,20);
		enemy.addAnimation("walking", "assets/Zombie1.png", "assets/Zombie10.png");
		enemy.scale=0.12;
		enemy.mirrorX(-1);
		enemy.setVelocity(-random(1,4),0);
		enemy.debug= true;
		enemy.setCollider("rectangle",0,0,400,400);
		enemies.push(enemy);
	}
}

function drawBackground(){
	if(x<=0){
		x=scl;
	}
	for(var i=11; i>0; i--){
		image(back[i],x,0,scl,scl);
	}
	x-=speed;
	if(y<=-scl){
		y=0;
	}
	for(var i=11; i>0; i--){
		image(back[i],y,0,scl,scl);
	}
	y-=speed;
}


function drawStill(){
	if(x<=0){
		x=scl;
	}
	for(var i=11; i>0; i--){
		image(back[i],x,0,scl,scl);
	}
	if(y<=-scl){
		y=0;
	}
	for(var i=11; i>0; i--){
		image(back[i],y,0,scl,scl);
	}
}

function mouseClicked(){
	if(currentScene===2){
		if((mouseX>200 && mouseX<400)&&(mouseY>200 && mouseY<250)){
			currentScene=1;
		}
	}
}
