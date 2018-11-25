let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

mapManager = new MapManager('/levels/level1test.json');
spriteManager = new SpriteManager('/sprites/sprites.json', '/images/spritesheet.png');

mapManager.draw(ctx);

let hello = new Player(100);
console.log(hello);