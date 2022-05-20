"use strict";
self["webpackHotUpdategame_programming_createjs_webpack"]("main",{

/***/ "./src/ScreenManager.ts":
/*!******************************!*\
  !*** ./src/ScreenManager.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ScreenManager = void 0;
class ScreenManager {
    constructor(stage, assetManager) {
        this.stage = stage;
        this.titleScreen = new createjs.Container();
        this.titleScreen.addChild(assetManager.getSprite("sprites", "sprites/other/titleScreen", 300, 300));
        this.gameOverScreen = new createjs.Container();
        this.gameOverScreen.addChild(assetManager.getSprite("sprites", "sprites/other/gameOverScreen", 300, 300));
        let gameOverSprite = assetManager.getSprite("sprites", "sprites/other/gameOverScreen", 300, 300);
        this.gameOverScreen.addChild(gameOverSprite);
        this.gameScreen = assetManager.getSprite("sprites", "sprites/other/background", 0, 0);
        this.winScreen = new createjs.Container();
        let winSprite = assetManager.getSprite("sprites", "sprites/other/winScreen", 300, 300);
        this.winScreen.addChild(winSprite);
        this.levelCompleteScreen = new createjs.Container();
        let levelCompleteSprite = assetManager.getSprite("sprites", "sprites/other/levelComplete", 300, 300);
        this.levelCompleteScreen.addChild(levelCompleteSprite);
        this.eventStartGame = new createjs.Event("gameStarted", true, false);
        this.eventResetGame = new createjs.Event("gameReset", true, false);
        this.eventTitleActive = new createjs.Event("titleActive", true, false);
        this.eventWin = new createjs.Event("gameWin", true, false);
        this.eventOpenSettings = new createjs.Event("openSettings", true, false);
        this.eventCloseSettings = new createjs.Event("closeSettings", true, false);
        this.eventPaused = new createjs.Event("gamePaused", true, false);
        this.eventUnpaused = new createjs.Event("gameUnpaused", true, false);
        this.eventLoadNextLevel = new createjs.Event("loadNextLevel", true, false);
    }
    hideAll() {
        this.stage.removeChild(this.titleScreen);
        this.stage.removeChild(this.gameOverScreen);
        this.stage.removeChild(this.gameScreen);
        this.stage.removeChild(this.winScreen);
        this.stage.removeChild(this.levelCompleteScreen);
    }
    showTitleScreen() {
        this.hideAll();
        this.stage.addChildAt(this.titleScreen, 0);
        this.stage.dispatchEvent(this.eventTitleActive);
        console.log("event dispatched: titleActive ");
    }
    startDispatch() {
        this.stage.dispatchEvent(this.eventStartGame);
        console.log("event dispatched: startGame ");
    }
    openSettings() {
        this.stage.dispatchEvent(this.eventOpenSettings);
        console.log("event dispatched: openSettings");
    }
    closeSettings() {
        this.stage.dispatchEvent(this.eventCloseSettings);
        console.log("event dispatched: closeSettings");
    }
    pauseGame() {
        this.stage.dispatchEvent(this.eventPaused);
        console.log("event dispatched: gamePaused");
    }
    unpauseGame() {
        this.stage.dispatchEvent(this.eventUnpaused);
        console.log("event dispatched: gameUnpaused");
    }
    dispatchWinScreen() {
        this.stage.dispatchEvent(this.eventWin);
    }
    showGame() {
        this.hideAll();
        this.gameScreen.x = 300;
        this.gameScreen.y = 300;
        this.stage.addChild(this.gameScreen);
    }
    showGameOverScreen() {
        this.hideAll();
        this.gameOverScreen.x = 0;
        this.gameOverScreen.y = 0;
        this.stage.addChild(this.gameOverScreen);
        this.gameOverScreen.on("click", () => {
            this.stage.dispatchEvent(this.eventResetGame);
        });
    }
    showWinScreen() {
        this.hideAll();
        this.winScreen.x = 0;
        this.winScreen.y = 0;
        this.stage.addChild(this.winScreen);
        this.winScreen.on("click", () => {
            this.stage.dispatchEvent(this.eventResetGame);
        });
    }
    showLevelComplete() {
        this.hideAll();
        this.levelCompleteScreen.x = 0;
        this.levelCompleteScreen.y = 0;
        this.stage.addChild(this.levelCompleteScreen);
        this.levelCompleteScreen.on("click", () => {
            this.dispatchNextLevel();
        });
    }
    dispatchNextLevel() {
        this.stage.dispatchEvent(this.eventLoadNextLevel);
    }
}
exports.ScreenManager = ScreenManager;


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("692ae4ab829bacb5c40e")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.76e096a58ae77780359b.hot-update.js.map