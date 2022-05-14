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
        this._currentWeapon = Constants_1.PISTOL;
        this._currentWeaponAmmo = this._pistolAmmo;
        this._currentReloadDelay = Constants_1.PISTOL_RELOAD_DELAY;
        this._pistolAmmo = Constants_1.PISTOL_AMMO_MAX;
        this._railgunAmmo = Constants_1.RAILGUN_AMMO_MAX;
        this._rocketAmmo = Constants_1.ROCKET_AMMO_MAX;
        this._teslagunAmmo = Constants_1.TESLA_AMMO_MAX;
        this._laserAmmo = Constants_1.LASER_AMMO_MAX;
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
    get splashDamage() {
        return this._splashDamage;
    }
    get currentProjectileSpeed() {
        return this._currentProjectileSpeed;
    }
    get currentProjectileSprite() {
        return this._currentProjectileSprite;
    }
    get currentWeaponSprite() {
        return this._currentWeaponSprite;
    }
    get currentWeaponAmmo() {
        return this._currentWeaponAmmo;
    }
    set currentWeaponAmmo(value) {
        this._currentWeaponAmmo;
    }
    checkEquippedWeapon() {
        switch (this._currentWeapon) {
            case Constants_1.PISTOL:
                this._currentFireDelay = Constants_1.PISTOL_FIRE_DELAY;
                this._currentWeaponDamage = Constants_1.PISTOL_DAMAGE;
                this._splashDamage = 0;
                this._currentWeaponSprite = "";
                this._currentProjectileSprite = Constants_1.PISTOL_ROUND;
                this._currentProjectileSpeed = Constants_1.PISTOL_SPEED;
                this._currentReloadDelay = Constants_1.PISTOL_RELOAD_DELAY;
                break;
            case Constants_1.TESLA:
                this._currentFireDelay = Constants_1.TESLA_FIRE_DELAY;
                this._currentWeaponDamage = Constants_1.TESLA_IMPACT_DAMAGE;
                this._splashDamage = Constants_1.TESLA_CHAIN_DAMAGE;
                this._currentProjectileSprite = Constants_1.TESLA_ROUND;
                this._currentProjectileSpeed = Constants_1.TESLA_SPEED;
                this._currentReloadDelay = Constants_1.TESLA_RELOAD_DELAY;
                break;
            case Constants_1.LASER:
                this._currentFireDelay = Constants_1.LASER_FIRE_DELAY;
                this._currentWeaponDamage = Constants_1.LASER_DAMAGE;
                this._splashDamage = 0;
                this._currentProjectileSprite = Constants_1.LASER_ROUND;
                this._currentProjectileSpeed = Constants_1.LASER_SPEED;
                this._currentReloadDelay = Constants_1.LASER_RELOAD_DELAY;
                break;
            case Constants_1.ROCKET:
                this._currentFireDelay = Constants_1.ROCKET_FIRE_DELAY;
                this._currentWeaponDamage = Constants_1.ROCKET_IMPACT_DAMAGE;
                this._splashDamage = Constants_1.ROCKET_SPLASH_DAMAGE;
                this._currentProjectileSprite = Constants_1.ROCKET_ROUND;
                this._currentProjectileSpeed = Constants_1.ROCKET_SPEED;
                this._currentReloadDelay = Constants_1.ROCKET_RELOAD_DELAY;
                break;
            case Constants_1.RAILGUN:
                this._currentFireDelay = Constants_1.RAILGUN_FIRE_DELAY;
                this._currentWeaponDamage = Constants_1.RAILGUN_DAMAGE;
                this._splashDamage = 0;
                this._currentProjectileSprite = Constants_1.RAILGUN_ROUND;
                this._currentProjectileSpeed = Constants_1.RAILGUN_SPEED;
                this._currentReloadDelay = Constants_1.ROCKET_RELOAD_DELAY;
                break;
            case Constants_1.ALIEN_BEAM:
                this._currentFireDelay = Constants_1.ALIEN_BEAM_DELAY;
                this._currentWeaponDamage = Constants_1.ALIEN_BEAM_DAMAGE;
                this._splashDamage = 0;
                this._currentProjectileSprite = Constants_1.ALIEN_ROUND;
                this._currentProjectileSpeed = Constants_1.ALIEN_BEAM_SPEED;
            default:
                this._currentFireDelay = Constants_1.DEF_FIRE_DELAY;
                this._currentWeaponDamage = Constants_1.DEF_PROJECTILE_DAMAGE;
                this._splashDamage = 0;
                this._currentProjectileSpeed = Constants_1.DEF_PROJECTILE_SPEED;
                this._currentProjectileSprite = Constants_1.PISTOL_ROUND;
                this._currentReloadDelay = Constants_1.PISTOL_RELOAD_DELAY;
                break;
        }
    }
    update() {
        this.checkEquippedWeapon();
    }
    reload() {
        switch (this._currentWeapon) {
            case Constants_1.PISTOL:
                break;
            case Constants_1.TESLA:
                break;
            case Constants_1.LASER:
                break;
            case Constants_1.ROCKET:
                break;
            case Constants_1.RAILGUN:
                break;
        }
    }
    refillAmmo() {
        this._pistolAmmo = Constants_1.PISTOL_AMMO_MAX;
        this._laserAmmo = Constants_1.LASER_AMMO_MAX;
        this._teslagunAmmo = Constants_1.TESLA_AMMO_MAX;
        this._rocketAmmo = Constants_1.ROCKET_AMMO_MAX;
        this._railgunAmmo = Constants_1.RAILGUN_AMMO_MAX;
    }
}
exports.Inventory = Inventory;


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("f86ce1822eda5efa24a7")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.e28e6d923ac0feeef51a.hot-update.js.map