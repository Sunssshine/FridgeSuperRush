let canvas = document.getElementById("gameCanvas");

gameManager = new GameManager(
    canvas,
    ['/levels/level1.json', '/levels/level2.json', '/levels/level3.json'], // level tilemap paths
    '/sprites/sprites.json',   // entity sprites description path
    '/images/spritesheet.png');// entity sprites packed image path

// let hello = new Player(100);
// (hello);