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
    passIn(player, inventory) {
        this.player = player;
        this.inventory = inventory;
        this.weaponType = inventory.currentWeapon;
    }
    activate() {
    }
}
exports.Projectile = Projectile;


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("b8e0f0b59ca698c26670")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.544b8d56afea587db9a2.hot-update.js.map