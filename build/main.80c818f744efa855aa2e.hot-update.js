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
}
exports.Inventory = Inventory;


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("276d451b5a031e69d399")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.80c818f744efa855aa2e.hot-update.js.map