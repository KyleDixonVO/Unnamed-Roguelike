"use strict";
self["webpackHotUpdategame_programming_createjs_webpack"]("main",{

/***/ "./src/GameCharacter.ts":
/*!******************************!*\
  !*** ./src/GameCharacter.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GameCharacter = void 0;
const Constants_1 = __webpack_require__(/*! ./Constants */ "./src/Constants.ts");
class GameCharacter {
    constructor(stage, assetManager, animation) {
        this.stage = stage;
        this._state = GameCharacter.STATE_IDLE;
        this._stateBeforePause = GameCharacter.STATE_IDLE;
        this._speed = Constants_1.DEFAULT_SPEED;
        this._health = Constants_1.DEFAULT_HEALTH;
        this._deltaX = 0;
        this._deltaY = 0;
        this._direction = GameCharacter.DIR_NEUTRAL;
        this._facing = GameCharacter.DIR_DOWN;
        this._healthMax = Constants_1.DEFAULT_HEALTH;
        this._moving = false;
        this._sprite = assetManager.getSprite("sprites", animation, Constants_1.STAGE_WIDTH / 2, Constants_1.STAGE_HEIGHT / 2);
        this._lastX = this._sprite.x;
        this._lastY = this._sprite.y;
        this._colliding = false;
        this._weaponSprite = assetManager.getSprite("sprites", "sprites/firstplayable/pistol front", this._sprite.x, this._sprite.y);
    }
    set speed(value) {
        this._speed = value;
    }
    get speed() {
        return this._speed;
    }
    set direction(value) {
        this._direction = value;
    }
    get direction() {
        return this._direction;
    }
    set facing(value) {
        this._facing = value;
    }
    get facing() {
        return this._facing;
    }
    get state() {
        return this._state;
    }
    get health() {
        return this._health;
    }
    get sprite() {
        return this._sprite;
    }
    get weaponSprite() {
        return this._weaponSprite;
    }
    set healthMax(value) {
        this._healthMax = value;
    }
    get healthMax() {
        return this._healthMax;
    }
    get deltaX() {
        return this._deltaX;
    }
    set deltaX(value) {
        this._deltaX = value;
    }
    get deltaY() {
        return this._deltaY;
    }
    set deltaY(value) {
        this._deltaY = value;
    }
    get lastX() {
        return this._lastX;
    }
    set lastX(value) {
        this._lastX = value;
    }
    get lastY() {
        return this._lastY;
    }
    set lastY(value) {
        this._lastY = value;
    }
    get colliding() {
        return this._colliding;
    }
    set colliding(value) {
        this._colliding = value;
    }
    addToStage() {
        this.stage.addChild(this._sprite);
        this.stage.setChildIndex(this._sprite, this.stage.numChildren);
    }
    removeFromStage() {
        this._sprite.stop();
        this._weaponSprite.stop();
        this.stage.removeChild(this._sprite);
        this.stage.removeChild(this._weaponSprite);
    }
    movingDirection() {
        if (this._state == GameCharacter.STATE_DEAD || this._state == GameCharacter.STATE_PAUSED) {
            return;
        }
        ;
        switch (this._direction) {
            case GameCharacter.DIR_UP:
                this._deltaX = 0;
                this._deltaY = -1;
                this._sprite.gotoAndPlay("sprites/firstplayable/player back");
                this._weaponSprite.x = this._sprite.x;
                this._weaponSprite.y = this._sprite.y - this._sprite.getBounds().height / 2;
                this._facing = GameCharacter.DIR_UP;
                this._moving = true;
                break;
            case GameCharacter.DIR_DOWN:
                this._deltaX = 0;
                this._deltaY = 1;
                this._sprite.gotoAndPlay("sprites/firstplayable/player forward");
                this._weaponSprite.x = this._sprite.x;
                this._weaponSprite.y = this._sprite.y;
                this._facing = GameCharacter.DIR_DOWN;
                this._moving = true;
                break;
            case GameCharacter.DIR_LEFT:
                this._deltaX = -1;
                this._deltaY = 0;
                this._sprite.gotoAndPlay("sprites/firstplayable/player left");
                this._weaponSprite.x = this._sprite.x - this._sprite.getBounds().width / 2;
                this._weaponSprite.y = this._sprite.y;
                this._facing = GameCharacter.DIR_LEFT;
                this._moving = true;
                break;
            case GameCharacter.DIR_RIGHT:
                this._deltaX = 1;
                this._deltaY = 0;
                this._sprite.gotoAndPlay("sprites/firstplayable/player right");
                this._weaponSprite.x = this._sprite.x + this._sprite.getBounds().width / 2;
                this._weaponSprite.y = this._sprite.y;
                this._facing = GameCharacter.DIR_RIGHT;
                this._moving;
                break;
            case GameCharacter.DIR_NEUTRAL:
                this._deltaX = 0;
                this._deltaY = 0;
                this._moving = false;
                break;
        }
    }
    stopMovement() {
        if (this._state == GameCharacter.STATE_DEAD || this._state == GameCharacter.STATE_PAUSED) {
            return;
        }
        ;
        this._sprite.stop();
        this._weaponSprite.stop();
        this._state = GameCharacter.STATE_IDLE;
    }
    startMovement() {
        if (this._state == GameCharacter.STATE_DEAD || this._state == GameCharacter.STATE_PAUSED) {
            return;
        }
        ;
        console.log("started movement");
        this.sprite.play();
        this.weaponSprite.play();
        this._state = GameCharacter.STATE_MOVING;
    }
    update() {
        this.movingDirection();
        if (this._state == GameCharacter.STATE_DEAD || this._state == GameCharacter.STATE_PAUSED || this._state == GameCharacter.STATE_IDLE) {
            return;
        }
        ;
        this._sprite.x += this._deltaX * this.speed;
        this._sprite.y += this._deltaY * this.speed;
        this._weaponSprite.x += this._deltaX * this.speed;
        this._weaponSprite.y += this._deltaY * this.speed;
        this._colliding = false;
    }
    pause() {
        this._stateBeforePause = this._state;
        console.log("state before pausing: " + this._stateBeforePause);
        this._state = GameCharacter.STATE_PAUSED;
    }
    unpause() {
        this._state = this._stateBeforePause;
        console.log("state after pausing: " + this._state);
    }
    setLastPosition() {
        this.lastX = this._sprite.x;
        this.lastY = this._sprite.y;
    }
    returnToLastPosition() {
        this._sprite.x = this._lastX;
        this._sprite.y = this._lastY;
    }
}
exports.GameCharacter = GameCharacter;
GameCharacter.STATE_IDLE = 0;
GameCharacter.STATE_ATTACKING = 1;
GameCharacter.STATE_MOVING = 2;
GameCharacter.STATE_DYING = 3;
GameCharacter.STATE_DEAD = 4;
GameCharacter.STATE_PAUSED = 99;
GameCharacter.DIR_UP = 0;
GameCharacter.DIR_DOWN = 1;
GameCharacter.DIR_LEFT = 2;
GameCharacter.DIR_RIGHT = 3;
GameCharacter.DIR_NE = 4;
GameCharacter.DIR_SE = 5;
GameCharacter.DIR_SW = 6;
GameCharacter.DIR_NW = 7;
GameCharacter.DIR_NEUTRAL = 99;


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("2644f3a2b7793eb0b2c7")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.cebc1892bfe9d0d0cd18.hot-update.js.map