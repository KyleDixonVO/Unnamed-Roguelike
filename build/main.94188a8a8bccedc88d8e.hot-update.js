"use strict";
self["webpackHotUpdategame_programming_createjs_webpack"]("main",{

/***/ "./src/Inventory.ts":
/*!**************************!*\
  !*** ./src/Inventory.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Inventory = void 0;
class Inventory {
    constructor(gameCharacter) {
        this.gameCharacter = gameCharacter;
        this._currentWeapon = " ";
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
}
exports.Inventory = Inventory;


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("79424022e8d4aa136ccf")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.94188a8a8bccedc88d8e.hot-update.js.map