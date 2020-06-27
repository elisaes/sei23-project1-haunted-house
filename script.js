//-----------------------Global Var---------------------//

const enemies = {};
const bulletObj = {};
const deltaT = 16;

const player = {
  oldX: 300,
  oldY: 300,
  x: 300,
  y: 300,
  width: 10,
  height: 10,
  live: 10,
  origin: { x: 300, y: 300 },
};
const house = {};
const keys = {};

let bulletId = 0;
let walk = false;

//--------------------CANVAS---------------------------//
const canvasEl = document.createElement("canvas");
canvasEl.width = 600;
canvasEl.height = 600;
document.querySelector(".container").appendChild(canvasEl);

const ctx = canvasEl.getContext("2d");
ctx.fillStyle = "black";
ctx.fillRect(0, 0, 800, 800);
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
  constructor(id, x, y, width, height, deltax, deltay) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.deltay = deltax;
    this.deltax = deltay;
    this.oldX;
    this.oldY;
  }

  update() {
    this.oldX = this.x;
    this.oldY = this.y;
    let dx = this.x - player.x;
    let dy = this.y - player.y;

    let correctx = this.deltax / dx;
    let correcty = this.deltay / dy;
    // console.log(correctx);
    // console.log(correcty);
    //console.log("dx", dx, "dy", dy)

    this.x = this.x - dx * this.deltax * Math.abs(correctx);
    this.y = this.y - dy * this.deltay * Math.abs(correcty);
    //console.log("this", this.x,this.y, "old", this.oldX,this.oldY);
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
  hittingPlayer() {
    // console.log("playerx, playery", player.x, player.y)
    // console.log("this.x, this.y", this.x, this.y)
    if (
      Math.abs(this.x - player.x) <= player.width &&
      Math.abs(this.y - player.y) <= player.width
    ) {
      player.live -= 0.01;
      //console.log("player.live", player.live);
    }
  }
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
      Math.abs(this.x - player.x) > 100 ||
      Math.abs(this.y - player.y) > 100
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
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }
  draw() {
    let x = this.x - player.x + player.origin.x;
    let y = this.y - player.y + player.origin.y;

    ctx.fillStyle = this.color;
    ctx.fillRect(x, y, this.width, this.height);
  }

  checkCollisionPlayer() {
    // console.log(this.direction)

    if (
      player.x + player.width > this.x &&
      player.y < this.y + this.height &&
      player.x < this.x + this.width &&
      player.y + player.width > this.y
    ) {
      player.x = player.oldX;
      player.y = player.oldY;
    }
  }
  checkCollisionEnemy() {
    // console.log(this.direction)
    for (const key in enemies) {
      if (
        enemies[key].x + enemies[key].width > this.x &&
        enemies[key].y < this.y + this.height &&
        enemies[key].x < this.x + this.width &&
        enemies[key].y + enemies[key].width > this.y
      ) {
        enemies[key].x = enemies[key].oldX;
        enemies[key].y = enemies[key].oldY;
      }
    }
  }
  checkCollisionBullet() {
    // console.log(this.direction)
    for (const key in bulletObj) {
      if (
        bulletObj[key].x + bulletObj[key].width > this.x &&
        bulletObj[key].y < this.y + this.height &&
        bulletObj[key].x < this.x + this.width &&
        bulletObj[key].y + bulletObj[key].width > this.y
      ) {
        //console.log('mama');
        delete bulletObj[key];
      }
    }
  }
}

class Img extends Ornament {
  constructor(x, y, width, height, img) {
    super(x, y, width, height);
    this.img = img;
  }

  draw() {
    let x = this.x - player.x + player.origin.x;
    let y = this.y - player.y + player.origin.y;

    // console.log(x,y)
    ctx.drawImage(this.img, x, y, this.width, this.height);
  }
}
//------------------------PLayer------------------------------------//

const makingPlayer = () => {
  ctx.fillStyle = "white";
  ctx.fillRect(player.origin.x, player.origin.y, player.width, player.height);
};

const moving = () => {
  player.oldX = player.x;
  player.oldY = player.y;
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
    //  console.log(keys);
  }
  if (e.type === "keyup") {
    keys[e.code] = false;
  }
};
const dying = () => {
  if (player.live < 1) {
    gameStatus = false;
    alert("sorry, you are dead");
  }
};

window.addEventListener("keydown", playerMoving);
window.addEventListener("keyup", playerMoving);

//----------------------CallingGameCharacters-------------------------//
for (let i = 0; i < 1; i++) {
  let x = Math.random() * 100;
  let y = Math.random() * 100;
  let w = 5;
  let h = 5;
  enemies[i] = new Enemy(i, x, y, w, h, 1, 1);
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
  //console.log(bulletObj);
};

const callingHouse = () => {
  const xArr = [
    0,
    0,
    1000,
    0,
    400,
    400,
    250,
    0,
    400,
    400,
    250,
    0,
    400,
    400,
    700,
    650,
    400,
    700,
    700,
    700,
    900,
    650,
    700,
    900,
  ];
  const yArr = [
    0,
    1000,
    0,
    0,
    850,
    600,
    600,
    600,
    400,
    200,
    200,
    200,
    150,
    0,
    700,
    600,
    600,
    250,
    0,
    600,
    600,
    400,
    400,
    400,
  ];
  const wArr = [
    10,
    1000,
    10,
    1000,
    10,
    10,
    150,
    150,
    150,
    10,
    150,
    150,
    10,
    10,
    10,
    100,
    100,
    10,
    10,
    100,
    100,
    150,
    100,
    100,
  ];
  const hArr = [
    1000,
    10,
    1000,
    10,
    150,
    150,
    10,
    10,
    10,
    200,
    10,
    10,
    50,
    50,
    300,
    10,
    10,
    150,
    150,
    10,
    10,
    10,
    10,
    10,
  ];
  console.log(xArr.length, yArr.length, wArr.length, hArr.length);
  console.log(keys);
  for (let i = 0; i < xArr.length; i++) {
    house[`wall${i}`] = new Ornament(
      xArr[i],
      yArr[i],
      wArr[i],
      hArr[i],
      "pink"
    );
  }
};
callingHouse();

console.log("house", house);
window.addEventListener("keydown", callingBalls);

//---------------------------Set Interval---------------------------//
let time = Date.now();
const loop = () => {
  if (!gameStatus) {
    return;
  }
  const diff = Date.now() - time;
  //  console.log(diff);
  time = Date.now();
  const enemiesArr = Object.values(enemies);
  const bulletArr = Object.values(bulletObj);
  // console.log(bulletArr)
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 600, 600);

  enemiesArr.forEach((enemy) => {
    enemy.update();

    enemy.hittingPlayer();
    enemy.draw();
  });
  bulletArr.forEach((bullet) => {
    bullet.update();

    bullet.shootingEnemies();
    bullet.draw();
  });
  for (const key in house) {
    house[key].checkCollisionPlayer();
    house[key].checkCollisionEnemy();
    house[key].checkCollisionBullet();
    house[key].draw();
  }
  moving();
  makingPlayer();
  dying();

  //console.log(player);
};

setInterval(loop, deltaT);
