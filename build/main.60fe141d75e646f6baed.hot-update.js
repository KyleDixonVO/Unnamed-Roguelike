"use strict";
self["webpackHotUpdategame_programming_createjs_webpack"]("main",{

/***/ "./src/Player.ts":
/*!***********************!*\
  !*** ./src/Player.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Player = void 0;
const Constants_1 = __webpack_require__(/*! ./Constants */ "./src/Constants.ts");
const GameCharacter_1 = __webpack_require__(/*! ./GameCharacter */ "./src/GameCharacter.ts");
class Player extends GameCharacter_1.GameCharacter {
    constructor(stage, assetManager) {
        super(stage, assetManager, "sprites/firstplayable/player forward");
        this.eventKilled = new createjs.Event("playerKilled", true, false);
        this.eventReloading = new createjs.Event("reloading", true, false);
        this.shooting = false;
    }
    onKilled() {
        this._state = GameCharacter_1.GameCharacter.STATE_DEAD;
        this.dispatchKilled();
    }
    onDamaged() {
    }
    onReload() {
    }
    killed() {
        this.stopMovement();
        this.onKilled();
    }
    reset() {
        this._sprite.gotoAndStop("sprites/firstplayable/player forward");
        this._sprite.x = 300;
        this._sprite.y = 300;
        this._speed = Constants_1.DEFAULT_SPEED;
        this._health = Constants_1.DEFAULT_HEALTH;
        this._state = GameCharacter_1.GameCharacter.STATE_IDLE;
        this.sprite.alpha = 0;
        this._sprite.alpha = 1;
    }
    takeDamage(value) {
        if (this._state == GameCharacter_1.GameCharacter.STATE_DEAD || this._state == GameCharacter_1.GameCharacter.STATE_DYING || this._state == GameCharacter_1.GameCharacter.STATE_PAUSED)
            return;
        if (value <= 0 || value >= Number.MAX_SAFE_INTEGER || value <= Number.MIN_SAFE_INTEGER)
            return;
        this._health -= value;
        if (this._health < 0) {
            this._health = 0;
        }
        if (this.health == 0) {
            this.killed();
        }
    }
    update() {
        super.update();
    }
    dispatchKilled() {
        this.stage.dispatchEvent(this.eventKilled);
        console.log("dispatched event: playerKilled");
    }
}
exports.Player = Player;


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("03361346f8efa6d4779f")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.60fe141d75e646f6baed.hot-update.js.map