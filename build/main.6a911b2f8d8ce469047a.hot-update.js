"use strict";
self["webpackHotUpdategame_programming_createjs_webpack"]("main",{

/***/ "./src/Projectile.ts":
/*!***************************!*\
  !*** ./src/Projectile.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Projectile = void 0;
const Constants_1 = __webpack_require__(/*! ./Constants */ "./src/Constants.ts");
const GameCharacter_1 = __webpack_require__(/*! ./GameCharacter */ "./src/GameCharacter.ts");
class Projectile {
    constructor(stage, assetManager, animation) {
        this.stage = stage;
        this._speed = Constants_1.DEF_PROJECTILE_SPEED;
        this._damage = Constants_1.DEF_PROJECTILE_DAMAGE;
        this._sprite = assetManager.getSprite("sprites", animation, 0, 0);
        this._used = false;
    }
    get speed() {
        return this._speed;
    }
    get damage() {
        return this._damage;
    }
    get bounces() {
        return this._bounces;
    }
    get sprite() {
        return this._sprite;
    }
    get used() {
        return this._used;
    }
    set used(value) {
        this._used = value;
    }
    passIn(gameCharacter, inventory) {
        this.gameCharacter = gameCharacter;
        this.inventory = inventory;
        this.weaponType = inventory.currentWeapon;
    }
    activate() {
        switch (this.gameCharacter.facing) {
            case GameCharacter_1.GameCharacter.DIR_UP:
                this.deltaX = 0;
                this.deltaY = -1;
                break;
            case GameCharacter_1.GameCharacter.DIR_DOWN:
                this.deltaX = 0;
                this.deltaY = 1;
                break;
            case GameCharacter_1.GameCharacter.DIR_LEFT:
                this.deltaX = -1;
                this.deltaY = 0;
                break;
            case GameCharacter_1.GameCharacter.DIR_RIGHT:
                this.deltaX = 1;
                this.deltaY = 0;
                break;
        }
        this.used = true;
        this._sprite.x = this.gameCharacter.sprite.x;
        this._sprite.y = this.gameCharacter.sprite.y;
        this.stage.addChild(this._sprite);
    }
    update() {
        this._sprite.x += this.deltaX * this._speed;
        this._sprite.y += this.deltaY * this._speed;
    }
}
exports.Projectile = Projectile;


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("bc8eba3f935275b5c5e0")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.6a911b2f8d8ce469047a.hot-update.js.map