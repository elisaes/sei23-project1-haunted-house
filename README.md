# elisa-project1-game

## MAIN JAVASCRIPT FUNCTIONS

- Making the player using functions and then making the enemies using classes.
- Implementing Bullets for the player to kill the enemies.
- Drawing the house using classes and canvas.
- Drawing objects using classes and canvas.

```
class Floor {
constructor(x, y, w, h, imgUrl) {
this.x = x;
this.y = y;
this.w = w;
this.h = h;
this.img = document.createElement("img");
this.img.src = imgUrl;
}
draw() {
let x = this.x - player.x + player.origin.x;
let y = this.y - player.y + player.origin.y;

    ctx.drawImage(this.img, x, y, this.w, this.h);

}
}
```

- Making the game interactive using set interval.
- Putting hints around the house using classes.

## HTML

creating a container div to store the canvas.

## CSS

Displaying the legend at the beginning of the game, give style to the legend.

## CONCLUSION

This game helped me to understand the Object Oriented PRogramming better.

## FUTURE IMPROVEMENTS

Improve my css.
