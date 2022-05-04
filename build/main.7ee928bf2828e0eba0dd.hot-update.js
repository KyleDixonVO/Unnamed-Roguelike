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
        this.eventDamaged = new createjs.Event("playerDamaged", true, false);
        this.eventReloading = new createjs.Event("reloading", true, false);
        this.addToStage();
    }
    onKilled() {
        this._state = GameCharacter_1.GameCharacter.STATE_DEAD;
        this.stopMovement();
        this._sprite.on("animationend", () => {
            this._sprite.stop();
        }, this, true);
        this._sprite.gotoAndPlay("");
        this._sprite.dispatchEvent(this.eventKilled);
    }
    onDamaged() {
    }
    onReload() {
    }
    reset() {
        this._sprite.gotoAndStop("");
        this._sprite.x = 300;
        this._sprite.y = 300;
        this._speed = Constants_1.DEFAULT_SPEED;
        this._health = Constants_1.DEFAULT_HEALTH;
        this._state = GameCharacter_1.GameCharacter.STATE_IDLE;
    }
    update() {
        super.update();
    }
}
exports.Player = Player;


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("029640f22fecea8cd164")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.7ee928bf2828e0eba0dd.hot-update.js.map