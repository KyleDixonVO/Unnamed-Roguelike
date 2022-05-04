"use strict";
self["webpackHotUpdategame_programming_createjs_webpack"]("main",{

/***/ "./src/UserInterface.ts":
/*!******************************!*\
  !*** ./src/UserInterface.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserInterface = void 0;
class UserInterface {
    constructor(stage, assetManager) {
        this.stage = stage;
        this.txtScore = new createjs.BitmapText("0", assetManager.getSpriteSheet("glyphs"));
        this.txtScore.x = 200;
        this.txtScore.y = 20;
        this.txtScore.letterSpacing = 1;
        this.startButton = new createjs.Sprite(assetManager.getSpriteSheet("sprites"));
        this.startButton.gotoAndStop("sprites/button/up");
        this.reset();
    }
    set score(value) {
        this._score = value;
        this.txtScore.text = String(this._score);
    }
    get score() {
        return this._score;
    }
    passIn(player) {
        this.player = player;
    }
    reset() {
        this.score = 0;
    }
}
exports.UserInterface = UserInterface;


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("5d905dc71e246c241d16")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.958aa895e658f9b937e7.hot-update.js.map