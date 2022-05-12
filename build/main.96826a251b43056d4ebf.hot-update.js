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
    get currentProjectileSpeed() {
        return this._currentProjectileSpeed;
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
            case Constants_1.RAILGUN:
                this._currentWeaponDamage = Constants_1.RAILGUN_DAMAGE;
                this._splashDamage = 0;
                break;
            default:
                this._currentWeaponDamage = Constants_1.DEF_PROJECTILE_DAMAGE;
                this._splashDamage = 0;
                this._currentProjectileSpeed = Constants_1.DEF_PROJECTILE_SPEED;
        }
    }
}
exports.Inventory = Inventory;


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("9ef51d9cc3a052a6c9e1")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.96826a251b43056d4ebf.hot-update.js.map