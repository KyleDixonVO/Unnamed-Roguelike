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
    passIn(player, screenManager) {
        this.player = player;
        this.screenManager = screenManager;
    }
    reset() {
        this.score = 0;
    }
    showStartMenu() {
        this.startButton.x = 300;
        this.startButton.y = 300;
        this.stage.addChild(this.startButton);
    }
    onStartClick() {
        this.startButton.on("mouseover", () => {
            this.startButton.gotoAndStop("sprites/button/over");
        });
        this.startButton.on("click", () => {
            this.screenManager.startDispatch();
        });
    }
}
exports.UserInterface = UserInterface;


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("f1875678e5b9266bd596")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.59f12e2a0ce3ec5ffdff.hot-update.js.map