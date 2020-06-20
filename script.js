//-----------------------Global Var---------------------//

const enemies = {};
const bulletObj = {};

const player = {
  x: 300,
  y: 300,
  width: 10,
  height: 10,
};

let bulletId = 0;
let walk = false;

//--------------------CANVAS---------------------------//
const canvasEl = document.createElement("canvas");
canvasEl.width = 600;
canvasEl.height = 600;
document.querySelector(".container").appendChild(canvasEl);

const ctx = canvasEl.getContext("2d");
ctx.fillStyle = "black";
ctx.fillRect(0, 0, 600, 600);
//---------------------------Stop----------------------//

let gameStatus = true;
const button = document.createElement("button");
button.innerText = "stop/start";
const stop = () => {
  gameStatus = !gameStatus;
};
button.addEventListener("click", stop);
document.querySelector("body").appendChild(button);

//---------------------------CLASSES-----------------------//

class Enemy {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.deltay = 1;
  }

  update() {
    this.x = this.x + 1;
    //console.log("this.x", this.x);
    this.y += Math.sin(this.x / 10) * 10 + this.deltay;
    //console.log("this.y", this.y);
    if (this.x > 600 || this.y > 600 || this.y < 0) {
      this.x = 0;
      this.y = 0;
    }
  }
  draw() {
    ctx.fillStyle = "pink";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

class Bullet {
  constructor(x, y, w, h, id) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.id = id;
  }
  update() {
    this.x = this.x + 10;
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

//------------------------PLayer------------------------------------//

const makingPlayer = () => {
  ctx.fillStyle = "white";
  ctx.fillRect(player.x, player.y, player.width, player.height);
};

const moving = () => {
  player.x = player.x + 2;
};

const movingKeysArr = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
const playerMoving = (e) => {
  
  if (e.code === "ArrowRight") {
    walk = true;
  }
};
const playerStopping = (e) => {
  if (e.code === "ArrowRight") {
    walk = false;
  }
};

window.addEventListener("keydown", playerMoving);
window.addEventListener("keyup", playerStopping);

//----------------------CallingGameCharacters-------------------------//
for (let i = 0; i < 10; i++) {
  let x = Math.random() * 100;
  let y = Math.random() * 100;
  let w = 5;
  let h = 5;
  enemies[i] = new Enemy(x, y, w, h);
}

const callingBalls = (e) => {
  console.log("helllllll");

  if (e.code === "KeyX") {
    console.log("xxxxxxxxxxxxxxxxxx");
    bulletId = bulletId + 1;
    let bullet = new Bullet(player.x, player.y, 5, 5, bulletId);
    bulletObj[bulletId] = bullet;
    console.log("id", bulletId);
  }
  console.log(bulletObj);
};

window.addEventListener("keydown", callingBalls);

//---------------------------Set Interval---------------------------//

const loop = () => {
  if (!gameStatus) {
    return;
  }
  const enemiesArr = Object.values(enemies);
  const bulletArr = Object.values(bulletObj);

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 600, 600);
  makingPlayer();

  enemiesArr.forEach((enemy) => {
    enemy.update();
    enemy.draw();
  });
  bulletArr.forEach((bullet) => {
    bullet.update();
    bullet.draw();
  });

  if (walk === true) {
    moving();
  }
  ctx.fillStyle = "white";
  ctx.fillRect(player.x, player.y, player.width, player.height);
};

setInterval(loop, 44);
