"use strict";
self["webpackHotUpdategame_programming_createjs_webpack"]("main",{

/***/ "./src/Enemy.ts":
/*!**********************!*\
  !*** ./src/Enemy.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Enemy = void 0;
const GameCharacter_1 = __webpack_require__(/*! ./GameCharacter */ "./src/GameCharacter.ts");
class Enemy extends GameCharacter_1.GameCharacter {
    constructor(stage, assetManager, player) {
        super(stage, assetManager, "sprites/firstplayable/smol boi front");
        this.player = player;
        this.shooting = false;
        this._enemyType = "melee";
        this._used = false;
    }
    get used() {
        return this._used;
    }
    set used(value) {
        this._used = value;
    }
}
exports.Enemy = Enemy;


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("c71460d8b40c4727bf79")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.a2c9a8a4cacdb1ce5fab.hot-update.js.map