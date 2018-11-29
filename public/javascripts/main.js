
function startGame()
{
    let canvas = document.getElementById("gameCanvas");

    let infoBlock = document.getElementById("game-info");
    let infoWindow = document.getElementById("game-info-block");
    let scoreElem = document.getElementById("score");
    let hideMePlz = document.getElementById("interact-with-page");
    console.log(infoBlock);

    gameManager = new GameManager(
        canvas,
        ['/levels/level1.json', '/levels/level2.json', '/levels/level3.json'], // level tilemap paths
        '/sprites/sprites.json',   // entity sprites description path
        '/images/spritesheet.png',
        scoreElem,
        infoBlock,
        infoWindow,
        hideMePlz);// entity sprites packed image path
}


// let hello = new Player(100);
// (hello);