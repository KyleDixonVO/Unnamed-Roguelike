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
        this.deltaX = 0;
        this.deltaY = 0;
        this._direction = GameCharacter.DIR_NEUTRAL;
        this._facing = GameCharacter.DIR_DOWN;
        this._healthMax = Constants_1.DEFAULT_HEALTH;
        this._sprite = assetManager.getSprite("sprites", animation, Constants_1.STAGE_WIDTH / 2, Constants_1.STAGE_HEIGHT / 2);
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
    set healthMax(value) {
        this._healthMax = value;
    }
    get healthMax() {
        return this._healthMax;
    }
    addToStage() {
        this.stage.addChild(this._sprite);
        this.stage.setChildIndex(this._sprite, this.stage.numChildren);
    }
    removeFromStage() {
        this._sprite.stop();
        this.stage.removeChild(this._sprite);
    }
    spriteDirection() {
        if (this._state == GameCharacter.STATE_DEAD || this._state == GameCharacter.STATE_PAUSED || this._state == GameCharacter.STATE_IDLE) {
            return;
        }
        ;
        switch (this._direction) {
            case GameCharacter.DIR_UP:
                this.deltaX = 0;
                this.deltaY = -1;
                this._sprite.gotoAndPlay("sprites/firstplayable/player back");
                this._facing = GameCharacter.DIR_UP;
                break;
            case GameCharacter.DIR_DOWN:
                this.deltaX = 0;
                this.deltaY = 1;
                this._sprite.gotoAndPlay("sprites/firstplayable/player forward");
                this._facing = GameCharacter.DIR_DOWN;
                break;
            case GameCharacter.DIR_LEFT:
                this.deltaX = -1;
                this.deltaY = 0;
                this._sprite.gotoAndPlay("sprites/firstplayable/player left");
                this._facing = GameCharacter.DIR_LEFT;
                break;
            case GameCharacter.DIR_RIGHT:
                this.deltaX = 1;
                this.deltaY = 0;
                this._sprite.gotoAndPlay("sprites/firstplayable/player right");
                this._facing = GameCharacter.DIR_RIGHT;
                break;
            case GameCharacter.DIR_NEUTRAL:
                this.deltaX = 0;
                this.deltaY = 0;
                break;
        }
        this._sprite.play();
        this._state = GameCharacter.STATE_MOVING;
    }
    stopMovement() {
        if (this._state == GameCharacter.STATE_DEAD || this._state == GameCharacter.STATE_PAUSED) {
            return;
        }
        ;
        this._sprite.stop();
        this._state = GameCharacter.STATE_IDLE;
    }
    startMovement() {
        if (this._state == GameCharacter.STATE_DEAD || this._state == GameCharacter.STATE_PAUSED || this._state == GameCharacter.STATE_IDLE) {
            return;
        }
        ;
        this._state == GameCharacter.STATE_IDLE;
    }
    update() {
        this.spriteDirection();
        if (this._state == GameCharacter.STATE_DEAD || this._state == GameCharacter.STATE_PAUSED || this._state == GameCharacter.STATE_IDLE) {
            return;
        }
        ;
        this._sprite.x += this.deltaX * this.speed;
        this._sprite.y += this.deltaY * this.speed;
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
/******/ 	__webpack_require__.h = () => ("1da8036c9df6da0bcc26")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.87b9ee2f089edfeb3990.hot-update.js.map