let canvas = document.getElementById("gameCanvas");

gameManager = new GameManager(
    canvas,
    '/levels/level1.json', // level tilemap path
    '/sprites/sprites.json',   // entity sprites description path
    '/images/spritesheet.png');// entity sprites packed image path

// let hello = new Player(100);
// (hello);