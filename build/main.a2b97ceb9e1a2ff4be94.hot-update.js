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
        this.shooting = false;
        this._state = GameCharacter_1.GameCharacter.STATE_MOVING;
    }
    get used() {
        return this._used;
    }
    set used(value) {
        this._used = value;
    }
    trackPlayer(player) {
        this.player = player;
    }
    update() {
        if (this._sprite.x > this.player.sprite.x) {
            this.deltaX = -1;
        }
        else if (this._sprite.x < this.player.sprite.x) {
            this.deltaX = 1;
        }
        else
            (this.deltaX = 2);
        if (this._sprite.y > this.player.sprite.y) {
            this.deltaY = -1;
        }
        else if (this._sprite.y < this.player.sprite.y) {
            this.deltaY = 1;
        }
        else
            (this.deltaY = 2);
        super.update();
    }
}
exports.Enemy = Enemy;


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("5964681224012f15f837")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.a2b97ceb9e1a2ff4be94.hot-update.js.map