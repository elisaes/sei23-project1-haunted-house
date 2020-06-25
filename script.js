//-----------------------Global Var---------------------//

const enemies = {};
const bulletObj = {};

const player = {
  x: 300,
  y: 300,
  width: 10,
  height: 10,
  live: 10,
  origin: { x: 300, y: 300 },
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
  constructor(id, x, y, width, height) {
    this.id = id;
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
    // if (this.x > 600 || this.y > 600 || this.y < 0) {
    //   this.x = 0;
    //   this.y = 0;
    // }
  }

  draw() {
    ctx.fillStyle = "pink";
    ctx.fillRect(
      this.x - player.x + player.origin.x,
      this.y - player.y + player.origin.y,
      this.width,
      this.height
    );
  }
  hittingPlayer() {}
}

class Bullet {
  constructor(x, y, w, h, id, direction = "right") {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.id = id;
    this.direction = direction;
  }
  update() {
    //console.log(this.x,this.y)
    if (this.direction === "right") {
      this.x = this.x + 10;
    }
    if (this.direction === "left") {
      this.x = this.x - 10;
    }
    if (this.direction === "down") {
      this.y = this.y + 10;
    }
    if (this.direction === "up") {
      this.y = this.y - 10;
    }
    if (
      Math.abs(this.x - player.x) > 600 ||
      Math.abs(this.y - player.y) > 600
    ) {
      delete bulletObj[this.id];
    }
  }
  draw() {
    ctx.fillStyle = "red";

    ctx.fillRect(
      this.x - player.x + player.origin.x,
      this.y - player.y + player.origin.y,
      this.width,
      this.height
    );
  }

  shootingEnemies() {
    for (const key in enemies) {
      //    console.log("this.x",this.x);
      //    console.log("enemies[key].x",enemies[key].x);
      if (
        Math.abs(this.x - enemies[key].x) <= enemies[key].width &&
        Math.abs(this.y - enemies[key].y) <= enemies[key].width
      ) {
        delete enemies[key];
      }
    }
  }
}

class Ornament {
  constructor(x, y, width, height, img) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.img = img;
  }
  draw() {
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
//------------------------PLayer------------------------------------//

const makingPlayer = () => {
  ctx.fillStyle = "white";
  ctx.fillRect(player.origin.x, player.origin.y, player.width, player.height);
};

const keys = {};

const moving = () => {
  if (keys["ArrowRight"]) {
    player.x = player.x + 2;
    keys.direction = "right";
  }
  if (keys["ArrowLeft"]) {
    player.x = player.x - 2;
    keys.direction = "left";
  }
  if (keys["ArrowDown"]) {
    player.y = player.y + 2;
    keys.direction = "down";
  }
  if (keys["ArrowUp"]) {
    player.y = player.y - 2;
    keys.direction = "up";
  }
};

const movingKeysArr = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
const playerMoving = (e) => {
  // console.log(e.type);
  if (e.type === "keydown") {
    keys[e.code] = true;
    //console.log(keys);
  }
  if (e.type === "keyup") {
    keys[e.code] = false;
  }
};

window.addEventListener("keydown", playerMoving);
window.addEventListener("keyup", playerMoving);

//----------------------CallingGameCharacters-------------------------//
for (let i = 0; i < 10; i++) {
  let x = Math.random() * 100;
  let y = Math.random() * 100;
  let w = 5;
  let h = 5;
  enemies[i] = new Enemy(i, x, y, w, h);
}

const callingBalls = (e) => {
  // console.log("helllllll");

  if (e.code === "KeyX") {
    // console.log("xxxxxxxxxxxxxxxxxx");
    bulletId = bulletId + 1;
    let bullet = new Bullet(player.x, player.y, 5, 5, bulletId, keys.direction);
    bulletObj[bulletId] = bullet;
    //console.log("id", bulletId);
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
  // console.log(bulletArr)
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 600, 600);

  enemiesArr.forEach((enemy) => {
    enemy.update();
    enemy.draw();
  });
  bulletArr.forEach((bullet) => {
    bullet.update();
    bullet.draw();
    bullet.shootingEnemies();
  });
  //console.log(enemies);

  moving();
  makingPlayer();
};

setInterval(loop, 44);
