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
let stage;
let UI_Stage;
let canvas;
let assetManager;
let upKey;
let downKey;
let leftKey;
let rightKey;
let player;
let enemyPool = [];
let userInterface;
let screenManager;
function onReady(e) {
    console.log(">> spritesheet loaded – ready to add sprites to game");
    screenManager = new ScreenManager_1.ScreenManager(stage, assetManager);
    userInterface = new UserInterface_1.UserInterface(UI_Stage, assetManager);
    player = new Player_1.Player(stage, assetManager);
    for (let i = 0; i < Constants_1.ENEMY_MAX; i++) {
        enemyPool.push(new Enemy_1.Enemy(stage, assetManager, player));
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
function monitorKeys() {
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
}
function onTick(e) {
    document.getElementById("fps").innerHTML = String(createjs.Ticker.getMeasuredFPS());
    player.update();
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
/******/ 	__webpack_require__.h = () => ("55e77ce3b1b3d0e22fc7")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.a331104c1212b2fe4549.hot-update.js.map