let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

mapManager = new MapManager('/levels/level1test.json');
mapManager.draw(ctx);