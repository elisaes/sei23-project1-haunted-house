// funThing = "running";

// function nameOfFunction(){
//     funThing ="walking";
//     return "hahaha"
// }
// nameOfFunction();
// console.log(funThing);

// let car = 10;
// let carType = "normal";

// while (car > 0) {
//   if (carType === "normal") {
//     car = car -1;
//     console.log("charge = 1");
//   } else if (carType === "lorry") {
//     car = car-1
//     console.log("charge = 2");
//   } else {
//     car = car-1
//     console.log("charge 7");
//   }
// }

// let sumOfNumbers = (...banana) => {
//   // console.log(banana);
//   // console.log(banana.length)
//   let sum = 0;
//   for (let i = 0; i < banana.length; i++) {
//     if (!Number.isNaN(banana[i])) {
//       sum = banana[i] + sum;
//     }else {
//       console.log('is Nan')
//     }
//     //console.log(banana[i]);

//     // return sum
//   }
//   console.log(sum);
// };
// sumOfNumbers(1, 2, 3, 4,"mamam", 5, 5, 5);

function countBottles(count) {
  for (let i = count; i > 0; i--) {
    if (i > 1) {
      console.log(`${i} bottles of beer`);
    } else {
      console.log(`${i} bottle of beer`);
    }
  }
}

let num = {
  
  age: 5,

  addAge : function(){
    return this.age++;

  }
}

console.log(num.age)

console.log(num.addAge())

console.log(num.age)