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
        this.titleScreen.addChild(assetManager.getSprite("sprites", "sprites/other/background", 300, 300));
        this.gameOverScreen = new createjs.Container();
        this.gameOverScreen.addChild(assetManager.getSprite("sprites", "", 0, 0));
        let gameOverSprite = assetManager.getSprite("sprites", "", 0, 0);
        this.gameOverScreen.addChild(gameOverSprite);
        this.gameScreen = assetManager.getSprite("sprites", "", 0, 0);
        this.eventStartGame = new createjs.Event("gameStarted", true, false);
        this.eventResetGame = new createjs.Event("gameReset", true, false);
        this.eventTitleActive = new createjs.Event("titleActive", true, false);
        this.eventGameOverActive = new createjs.Event("gameOverActive", true, false);
    }
    hideAll() {
        this.stage.removeChild(this.titleScreen);
        this.stage.removeChild(this.gameOverScreen);
        this.stage.removeChild(this.gameScreen);
    }
    showTitleScreen() {
        this.hideAll();
        this.stage.dispatchEvent(this.eventStartGame);
        console.log("event dispatched: titleActive ");
    }
}
exports.ScreenManager = ScreenManager;


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("c9a18f3f8fd8f345a941")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.7e78d72040b18ff1f373.hot-update.js.map