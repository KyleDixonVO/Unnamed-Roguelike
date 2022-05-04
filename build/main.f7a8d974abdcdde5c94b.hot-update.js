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
    }
}
exports.Enemy = Enemy;


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("9067fac040d2e8c409ef")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.f7a8d974abdcdde5c94b.hot-update.js.map