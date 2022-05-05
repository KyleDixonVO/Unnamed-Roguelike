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
        this.gameScreen = assetManager.getSprite("sprites", "", 0, 0);
        this.eventStartGame = new createjs.Event("gameStarted", true, false);
        this.eventResetGame = new createjs.Event("gameReset", true, false);
        this.eventTitleActive = new createjs.Event("titleActive", true, false);
        this.eventGameOverActive = new createjs.Event("gameOverActive", true, false);
        this.eventOpenSettings = new createjs.Event("openSettings", true, false);
        this.eventPaused = new createjs.Event("gamePaused", true, false);
    }
    hideAll() {
        this.stage.removeChild(this.titleScreen);
        this.stage.removeChild(this.gameOverScreen);
        this.stage.removeChild(this.gameScreen);
    }
    showTitleScreen() {
        this.hideAll();
        this.stage.dispatchEvent(this.eventTitleActive);
        console.log("event dispatched: titleActive ");
    }
    startDispatch() {
        this.stage.dispatchEvent(this.eventStartGame);
        console.log("event dispatched: startGame ");
    }
    settingsDispatch() {
        this.stage.dispatchEvent(this.eventOpenSettings);
        console.log("event dispatched: openSettings");
    }
    showSettingOverlay() {
        this.stage.addChild(this.titleScreen);
        this.stage.dispatchEvent(this.eventPaused);
        console.log("event dispatched: gamePaused");
    }
    showGame() {
        this.hideAll();
    }
}
exports.ScreenManager = ScreenManager;


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("56318097f7d8b85d7162")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.3312aecd9f50625ef8b3.hot-update.js.map