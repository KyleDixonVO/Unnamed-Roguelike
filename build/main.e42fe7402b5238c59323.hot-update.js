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
        stage.addChild(this.txtScore);
        this.reset();
    }
    set score(value) {
        this._score = value;
        this.txtScore.text = String(this._score);
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
/******/ 	__webpack_require__.h = () => ("7644cabbf5c1f695cb1e")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.e42fe7402b5238c59323.hot-update.js.map