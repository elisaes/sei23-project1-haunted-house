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
const house = {};

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
    this.x = this.x + 0.5;
    this.y += Math.sin(this.x / 10) * 5 + this.deltay;
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
// const colliding = () => {
//   console.log("player.x, player.y", player.x, player.y);
//   //--------top------------------//
//   if(player.x<=house[5].x && player.y<=house[8].y){

//   }
//   if (player.x <=  && player.y <= this.y) {
//     console.log("player.x, player.y", player.x, player.y);
//     //player.x = this.x;
//     player.y = this.y - 2;
//     player.x = this.x - 2;
//     // console.log("player.x, player.y", player.x, player.y);
//     // console.log("this.x, this.y", this.x, this.y);
//   }
//   if (player.x <= this.x) {
//     console.log("player.x, player.y", player.x, player.y);
//     //player.x = this.x;
//     player.x = this.x;
//     // console.log("player.x, player.y", player.x, player.y);
//     // console.log("this.x, this.y", this.x, this.y);
//   }
// };

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
  console.log(xArr.length,yArr.length,wArr.length,hArr.length)
  for (let i = 0; i < xArr.length; i++) {
    house[`${i}`] = new Ornament(xArr[i], yArr[i], wArr[i], hArr[i], "pink");
  }
};
callingHouse();

// const bottom = new Ornament(0, 500, 500, 10, "pink");
// const left = new Ornament(0, 0, 10, 500, "pink");
// const tup = new Ornament(0, 0, 500, 10, "red");
// const right = new Ornament(490, 0, 10, 500, "red");

//const left = new Ornament(10,1000,10,1000,"pink");
// house["bottom"] = bottom;
// house["left"] = left;
// house["tup"] = tup;
// house["right"] = right;

//house[left]=left;

//console.log("house", house);
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
    enemy.draw();
  });
  bulletArr.forEach((bullet) => {
    bullet.update();
    bullet.draw();
    bullet.shootingEnemies();
  });
  for (const key in house) {
    house[key].draw();
  }
  moving();
  makingPlayer();
  console.log(player.x, player.y);
};

setInterval(loop, 16);
