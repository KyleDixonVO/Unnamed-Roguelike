"use strict";
self["webpackHotUpdategame_programming_createjs_webpack"]("main",{

/***/ "./src/Enemy.ts":
/*!**********************!*\
  !*** ./src/Enemy.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Enemy = void 0;
const Constants_1 = __webpack_require__(/*! ./Constants */ "./src/Constants.ts");
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
        this._speed = 2;
    }
    get used() {
        return this._used;
    }
    set used(value) {
        this._used = value;
    }
    onKilled() {
        this._state = GameCharacter_1.GameCharacter.STATE_DEAD;
        createjs.Tween.get(this._sprite, { useTicks: true }).to({ alpha: 0 }, 500).wait(100).call(this.reset);
    }
    trackPlayer(player) {
        if (this._state == GameCharacter_1.GameCharacter.STATE_PAUSED)
            return;
        this.player = player;
        this._sprite.play();
        this._state = GameCharacter_1.GameCharacter.STATE_MOVING;
    }
    reset() {
        this._sprite.gotoAndStop("sprites/firstplayable/smol boi front");
        this._sprite.x = 300;
        this._sprite.y = 300;
        this._speed = 2;
        this._health = Constants_1.DEFAULT_HEALTH;
        this._state = GameCharacter_1.GameCharacter.STATE_IDLE;
        this._used = false;
        this.removeFromStage();
    }
    killed() {
        this.stopMovement();
        this.onKilled();
    }
    update() {
        if (this._state == GameCharacter_1.GameCharacter.STATE_DEAD || this._state == GameCharacter_1.GameCharacter.STATE_PAUSED || this._state == GameCharacter_1.GameCharacter.STATE_IDLE) {
            return;
        }
        ;
        if (this._sprite.x > this.player.sprite.x) {
            this.deltaX = -1;
        }
        else if (this._sprite.x < this.player.sprite.x) {
            this.deltaX = 1;
        }
        else
            (this.deltaX = 0);
        if (this._sprite.y > this.player.sprite.y) {
            this.deltaY = -1;
        }
        else if (this._sprite.y < this.player.sprite.y) {
            this.deltaY = 1;
        }
        else
            (this.deltaY = 0);
        this._sprite.x += this.deltaX * this._speed;
        this._sprite.y += this.deltaY * this._speed;
    }
}
exports.Enemy = Enemy;


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("7f31663742e139e69e3c")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.3b10bb69b0d657a02d2c.hot-update.js.map