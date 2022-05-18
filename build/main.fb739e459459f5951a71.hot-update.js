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
const Toolkit_1 = __webpack_require__(/*! ./Toolkit */ "./src/Toolkit.ts");
class Enemy extends GameCharacter_1.GameCharacter {
    constructor(stage, assetManager, player, placeInArray) {
        super(stage, assetManager, "sprites/firstplayable/smol boi front");
        this.melee = "melee";
        this.ranged = "ranged";
        this.boss = "boss";
        this.player = player;
        this.shooting = false;
        this._enemyType = this.melee;
        this._used = false;
        this.shooting = false;
        this._state = GameCharacter_1.GameCharacter.STATE_MOVING;
        this._speed = 2;
        this.eventPlayerHit = new createjs.Event("playerHit", true, false);
        this.eventEnemyKilled = new createjs.Event("enemyKilled", true, false);
        this._arrayNumber = placeInArray;
    }
    get used() {
        return this._used;
    }
    set used(value) {
        this._used = value;
    }
    get enemyType() {
        return this._enemyType;
    }
    set enemyType(value) {
        this._enemyType = value;
    }
    get arrayNumber() {
        return this._arrayNumber;
    }
    onKilled() {
        this._state = GameCharacter_1.GameCharacter.STATE_DEAD;
        createjs.Tween.get(this._sprite, { useTicks: true }).to({ alpha: 0 }, 30).wait(10).call(() => {
            this.reset();
        });
    }
    trackPlayer(player) {
        if (this._state == GameCharacter_1.GameCharacter.STATE_PAUSED || this._state == GameCharacter_1.GameCharacter.STATE_IDLE || this._state == GameCharacter_1.GameCharacter.STATE_DEAD)
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
        this._enemyType = this.melee;
        this._colliding = false;
        createjs.Tween.removeTweens(this._sprite);
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
        this._colliding = false;
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
        if (this.player.state == GameCharacter_1.GameCharacter.STATE_DEAD)
            return;
        if ((0, Toolkit_1.boxHit)(this._sprite, this.player.sprite)) {
            this.sprite.dispatchEvent(this.eventPlayerHit);
            this.returnToLastPosition();
        }
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
            this.stage.dispatchEvent(this.eventEnemyKilled);
        }
    }
}
exports.Enemy = Enemy;


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("dc41884c6fa4e48b7bfd")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.fb739e459459f5951a71.hot-update.js.map