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
        this._weaponSprite = assetManager.getSprite("sprites", "sprites/firstplayable/pistol front");
        this.eventKilled = new createjs.Event("playerKilled", true, false);
        this.eventReloading = new createjs.Event("reloading", true, false);
        this.shooting = false;
    }
    onKilled() {
        this._state = GameCharacter_1.GameCharacter.STATE_DEAD;
        createjs.Tween.get(this._sprite, { useTicks: true }).to({ alpha: 0 }, 30).wait(5).call(() => {
            this.dispatchKilled();
        }, null, this);
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
        this.stopMovement();
        this._sprite.x = 300;
        this._sprite.y = 300;
        this._speed = Constants_1.DEFAULT_SPEED;
        this._health = Constants_1.DEFAULT_HEALTH;
        this._state = GameCharacter_1.GameCharacter.STATE_IDLE;
        createjs.Tween.removeTweens(this._sprite);
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
/******/ 	__webpack_require__.h = () => ("f3ce03db7df9eceb3da6")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.9504f2f0569cfd783a1c.hot-update.js.map