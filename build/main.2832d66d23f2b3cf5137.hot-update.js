"use strict";
self["webpackHotUpdategame_programming_createjs_webpack"]("main",{

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! createjs */ "./node_modules/createjs/builds/1.0.0/createjs.min.js");
const Constants_1 = __webpack_require__(/*! ./Constants */ "./src/Constants.ts");
const AssetManager_1 = __webpack_require__(/*! ./AssetManager */ "./src/AssetManager.ts");
const UserInterface_1 = __webpack_require__(/*! ./UserInterface */ "./src/UserInterface.ts");
const ScreenManager_1 = __webpack_require__(/*! ./ScreenManager */ "./src/ScreenManager.ts");
const Player_1 = __webpack_require__(/*! ./Player */ "./src/Player.ts");
const Enemy_1 = __webpack_require__(/*! ./Enemy */ "./src/Enemy.ts");
const GameCharacter_1 = __webpack_require__(/*! ./GameCharacter */ "./src/GameCharacter.ts");
const Projectile_1 = __webpack_require__(/*! ./Projectile */ "./src/Projectile.ts");
const Inventory_1 = __webpack_require__(/*! ./Inventory */ "./src/Inventory.ts");
let stage;
let UI_Stage;
let canvas;
let assetManager;
let upKey = false;
let downKey = false;
let leftKey = false;
let rightKey = false;
let spacePress = false;
let player;
let enemyPool = [];
let enemyInventories = [];
let projectilePool = [];
let userInterface;
let screenManager;
let newProjectile;
let playerInventory;
let bank;
function onReady(e) {
    console.log(">> spritesheet loaded – ready to add sprites to game");
    screenManager = new ScreenManager_1.ScreenManager(stage, assetManager);
    userInterface = new UserInterface_1.UserInterface(UI_Stage, assetManager);
    player = new Player_1.Player(stage, assetManager);
    playerInventory = new Inventory_1.Inventory(player);
    for (let i = 0; i < Constants_1.ENEMY_MAX; i++) {
        enemyPool.push(new Enemy_1.Enemy(stage, assetManager, player));
    }
    for (let i = 0; i < Constants_1.PROJECTILE_MAX; i++) {
        projectilePool.push(new Projectile_1.Projectile(stage, assetManager, "sprites/firstplayable/bullet"));
    }
    stage.on("playerKilled", onGameEvent);
    stage.on("playerDamaged", onGameEvent);
    stage.on("gameStarted", onGameEvent);
    stage.on("gameReset", onGameEvent);
    stage.on("titleActive", onGameEvent);
    stage.on("gameOverActive", onGameEvent);
    createjs.Ticker.framerate = Constants_1.FRAME_RATE;
    createjs.Ticker.on("tick", onTick);
    console.log(">> game ready");
}
function onGameEvent(e) {
    switch (e.type) {
        case "playerKilled":
            break;
        case "playerDamaged":
            break;
        case "gameStarted":
            break;
        case "gameReset":
            break;
        case "titleActive":
            break;
        case "gameOverActive":
            break;
    }
}
function onAddProjectile() {
    for (newProjectile of projectilePool) {
        if (newProjectile.used == false) {
            newProjectile.used = true;
            newProjectile.passIn(player, playerInventory);
            newProjectile.activate();
            break;
        }
    }
}
function monitorKeys() {
    if (upKey == true) {
        player.direction = GameCharacter_1.GameCharacter.DIR_UP;
        console.log("W");
    }
    if (downKey == true) {
        player.direction = GameCharacter_1.GameCharacter.DIR_DOWN;
        console.log("S");
    }
    if (leftKey == true) {
        player.direction = GameCharacter_1.GameCharacter.DIR_LEFT;
        console.log("A");
    }
    if (rightKey == true) {
        player.direction = GameCharacter_1.GameCharacter.DIR_RIGHT;
        console.log("D");
    }
    if (rightKey == false && leftKey == false && upKey == false && downKey == false) {
        player.direction = GameCharacter_1.GameCharacter.DIR_NEUTRAL;
        console.log("No Input");
    }
    if (spacePress == true) {
        console.log("Fired a projectile!");
        onAddProjectile();
    }
}
document.onkeydown = onKeyDown;
document.onkeyup = onKeyUp;
function onKeyDown(e) {
    if (e.key == 'w' || e.key == 'W') {
        upKey = true;
    }
    else if (e.key == 's' || e.key == 'S') {
        downKey = true;
    }
    else if (e.key == 'a' || e.key == 'A') {
        leftKey = true;
    }
    else if (e.key == 'd' || e.key == 'D') {
        rightKey = true;
    }
    if (e.key == " ") {
        spacePress = true;
    }
}
function onKeyUp(e) {
    if (e.key == 'w' || e.key == 'W') {
        upKey = false;
    }
    else if (e.key == 's' || e.key == 'S') {
        downKey = false;
    }
    else if (e.key == 'a' || e.key == 'A') {
        leftKey = false;
    }
    else if (e.key == 'd' || e.key == 'D') {
        rightKey = false;
    }
    if (e.key == " ") {
        spacePress = false;
    }
}
function onTick(e) {
    document.getElementById("fps").innerHTML = String(createjs.Ticker.getMeasuredFPS());
    monitorKeys();
    player.update();
    for (let projectile of projectilePool) {
        if (projectile.used)
            projectile.update();
    }
    stage.update();
}
function main() {
    canvas = document.getElementById("game-canvas");
    canvas.width = Constants_1.STAGE_WIDTH;
    canvas.height = Constants_1.STAGE_HEIGHT;
    stage = new createjs.StageGL(canvas, { antialias: true });
    UI_Stage = new createjs.StageGL(canvas, { antialias: true });
    assetManager = new AssetManager_1.AssetManager(stage);
    stage.on("allAssetsLoaded", onReady, null, true);
    assetManager.loadAssets(Constants_1.ASSET_MANIFEST);
}
main();


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("98017d58049a2c17f0e9")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.2832d66d23f2b3cf5137.hot-update.js.map