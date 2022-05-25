"use strict";
self["webpackHotUpdategame_programming_createjs_webpack"]("main",{

/***/ "./src/Settings.ts":
/*!*************************!*\
  !*** ./src/Settings.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Settings = void 0;
const Constants_1 = __webpack_require__(/*! ./Constants */ "./src/Constants.ts");
class Settings {
    constructor() {
        this.volume = Constants_1.DEFAULT_VOLUME;
    }
    update(value) {
        this.volume = value / 10;
    }
}
exports.Settings = Settings;


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("43aa5003a59a9acfae5d")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.30432a537460345eeb20.hot-update.js.map