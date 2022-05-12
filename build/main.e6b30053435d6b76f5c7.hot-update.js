"use strict";
self["webpackHotUpdategame_programming_createjs_webpack"]("main",{

/***/ "./src/Inventory.ts":
/*!**************************!*\
  !*** ./src/Inventory.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Inventory = void 0;
const Constants_1 = __webpack_require__(/*! ./Constants */ "./src/Constants.ts");
class Inventory {
    constructor(gameCharacter) {
        this.gameCharacter = gameCharacter;
        this._weaponSlot1 = Constants_1.PISTOL;
        this._weaponSlot2 = null;
        this._currentWeapon = this._weaponSlot1;
    }
    set currentWeapon(value) {
        this._currentWeapon = value;
    }
    get currentWeapon() {
        return this._currentWeapon;
    }
    get pistolAmmo() {
        return this._pistolAmmo;
    }
    get laserAmmo() {
        return this._laserAmmo;
    }
    get railgunAmmo() {
        return this._railgunAmmo;
    }
    get teslagunAmmo() {
        return this._teslagunAmmo;
    }
    get rocketAmmo() {
        return this._rocketAmmo;
    }
    get fireDelay() {
        return this._currentFireDelay;
    }
    get weaponDamage() {
        return this._currentWeaponDamage;
    }
    get weaponSlot1() {
        return this._weaponSlot1;
    }
    get weaponSlot2() {
        return this._weaponSlot2;
    }
    get splashDamage() {
        return this._splashDamage;
    }
    update() {
        this.checkEquippedWeapon();
    }
    checkEquippedWeapon() {
        switch (this._currentWeapon) {
            case Constants_1.PISTOL:
                this._currentWeaponDamage = Constants_1.PISTOL_DAMAGE;
                this._splashDamage = 0;
                break;
            case Constants_1.TESLA:
                this._currentWeaponDamage = Constants_1.TESLA_IMPACT_DAMAGE;
                this._splashDamage = Constants_1.TESLA_CHAIN_DAMAGE;
                break;
            case Constants_1.LASER:
                this._currentWeaponDamage = Constants_1.LASER_DAMAGE;
                this._splashDamage = 0;
                break;
            case Constants_1.ROCKET:
                this._currentWeaponDamage = Constants_1.ROCKET_IMPACT_DAMAGE;
                this._splashDamage = Constants_1.ROCKET_SPLASH_DAMAGE;
                break;
        }
    }
}
exports.Inventory = Inventory;


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("d94becf7a7176fab0822")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.e6b30053435d6b76f5c7.hot-update.js.map