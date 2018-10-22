const SPEED = 90;
const FLD = 20;
const SQ = 20;
var dx, dy;
var px, py;
var ax, ay;
var tail = [];
var toAdd = [];
var score;
var gameOver;
var frames = 0;

function setup() {
  createCanvas(SQ * FLD, SQ * FLD + 50);
	noLoop();
	noStroke();
	init();
}

function randomizeApplePos() {
	ax = floor(random(0, FLD));
	ay = floor(random(0, FLD));
}

function init() {
	randomizeApplePos();
	px = py = FLD / 2;
	dx = dy = 0;
	score = 0;
	tail = [];
	gameOver = false;
	for(let i = 0; i < 3; i++) {
		tail.push({ x: px, y: py - (i + 1) });
	}
}

function draw() {
  background(0);
	
	setTimeout(draw, SPEED);
	
	frames++;
	
	// apple
	push();
	noFill();
	strokeWeight(7);
	stroke(0, abs(-256 + (frames * 40) % 512), 0);
	ellipse(ax * SQ + SQ / 2, ay * SQ + SQ / 2, SQ - 4);
	pop();
	
	// player
	fill(255, 0, 0);
	rect(px * SQ, py * SQ, SQ, SQ);
	for(let t of tail) {
		fill(random(255), random(255), random(255));
		let rnd = random(0, 6);
		rect(t.x * SQ - rnd / 2, t.y * SQ - rnd / 2, SQ + rnd, SQ + rnd);
	}
	
	fill(255);
	text(score + " Apples", 20, height - 20);
	push();
	textAlign(RIGHT);
	text("Restart: R", width - 20, height - 20);
	pop();
			 
	rect(0, height - 50, width, 5);
	
	for(let t of tail) {
		if(t.x == px && t.y == py) {
			gameOver = true;
		}
	}
	
	if(gameOver) {
		push();
		textAlign(CENTER);
		textSize(40 + abs(-20 + (frames * 43) % 40));
		text("GAME OVER", width / 2, height / 2 - 20);
		pop();
		return;
	}
	
	if(px == ax && py == ay) {
		randomizeApplePos();
		toAdd.push(tail[tail.length - 1]);
		score++;
	}
	
	
	if(!(dx === 0 && dy === 0)) {
		tail.splice(0, 0, { x: px, y: py });
		tail.pop();
	}
	
	if(toAdd.length > 0) {
		tail.push(toAdd[0]);
		toAdd.pop();
	}
	
	px += dx;
	py += dy;
	
	px = (px + 20) % FLD;
	py = (py + 20) % FLD;
	
}

function keyReleased() {
	switch(keyCode) {
		case DOWN_ARROW:  if(dy == - 1) { break; } dx = 0;  dy =  1; break;
		case UP_ARROW:    if(dy ==   1) { break; } dx = 0;  dy = -1; break;
		case LEFT_ARROW:  if(dx ==   1) { break; } dx = -1; dy =  0; break;
		case RIGHT_ARROW: if(dx == - 1) { break; } dx = 1;  dy =  0; break;
		case 82: init(); break;
	}
	
}