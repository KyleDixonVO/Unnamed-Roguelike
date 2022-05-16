"use strict";
self["webpackHotUpdategame_programming_createjs_webpack"]("main",{

/***/ "./src/LevelManager.ts":
/*!*****************************!*\
  !*** ./src/LevelManager.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LevelManager = void 0;
const Constants_1 = __webpack_require__(/*! ./Constants */ "./src/Constants.ts");
class LevelManager {
    constructor(stage) {
        this.stage = stage;
        this._activeLevel = 1;
        this._enemiesSpawned = 0;
        this._readyToSpawn = true;
        this._threshold = 0;
        this.eventCompleteLevel = new createjs.Event("completeLevel", true, false);
        this.eventSpawnWave = new createjs.Event("spawnWave", true, false);
    }
    get activeLevel() {
        return this._activeLevel;
    }
    set activeLevel(value) {
        this._activeLevel = value;
    }
    get defeatedEnemies() {
        return this._defeatedEnemies;
    }
    set defeatedEnemies(value) {
        this._defeatedEnemies = value;
    }
    get enemiesSpawned() {
        return this._enemiesSpawned;
    }
    set enemiesSpawned(value) {
        this._enemiesSpawned = value;
    }
    get readyToSpawn() {
        return this._readyToSpawn;
    }
    set readyToSpawn(value) {
        this._readyToSpawn = value;
    }
    get threshold() {
        return this._threshold;
    }
    checkWinCondition() {
        switch (this._activeLevel) {
            case 1:
                this._threshold = Constants_1.LEVEL_ONE_THRESHOLD;
                if (this._defeatedEnemies == Constants_1.LEVEL_ONE_THRESHOLD) {
                    this.stage.dispatchEvent(this.eventCompleteLevel);
                    this._activeLevel++;
                }
                break;
            case 2:
                this._threshold = Constants_1.LEVEL_TWO_THRESHOLD;
                if (this._defeatedEnemies == Constants_1.LEVEL_TWO_THRESHOLD) {
                    this.stage.dispatchEvent(this.eventCompleteLevel);
                    this._activeLevel++;
                }
                break;
            case 3:
                this._threshold = Constants_1.LEVEL_THREE_THRESHOLD;
                if (this._defeatedEnemies == Constants_1.LEVEL_THREE_THRESHOLD) {
                    this.stage.dispatchEvent(this.eventCompleteLevel);
                    this._activeLevel++;
                }
                break;
            case 4:
                this._threshold = Constants_1.LEVEL_FOUR_THRESHOLD;
                if (this._defeatedEnemies == Constants_1.LEVEL_FOUR_THRESHOLD) {
                    this.stage.dispatchEvent(this.eventCompleteLevel);
                    this._activeLevel++;
                }
            case 5:
                this._threshold = Constants_1.LEVEL_FIVE_THRESHOLD;
                if (this._defeatedEnemies == Constants_1.LEVEL_FIVE_THRESHOLD) {
                    this.stage.dispatchEvent(this.eventCompleteLevel);
                    this._activeLevel++;
                }
            case 6:
                this._threshold = Constants_1.LEVEL_SIX_THRESHOLD;
                if (this._defeatedEnemies == Constants_1.LEVEL_SIX_THRESHOLD) {
                    this.stage.dispatchEvent(this.eventCompleteLevel);
                    this._activeLevel++;
                }
            case 7:
                this._threshold = Constants_1.LEVEL_SEVEN_THRESHOLD;
                if (this._defeatedEnemies == Constants_1.LEVEL_SEVEN_THRESHOLD) {
                    this.stage.dispatchEvent(this.eventCompleteLevel);
                    this._activeLevel++;
                }
        }
    }
    resetForNextLevel() {
        this._defeatedEnemies = 0;
        this._enemiesSpawned = 0;
    }
    reset() {
        this._activeLevel = 1;
        this._defeatedEnemies = 0;
        this._enemiesSpawned = 0;
    }
    checkWaveStatus() {
        console.log("checking wave");
        if (this._defeatedEnemies % this._activeLevel == 1 || this._enemiesSpawned == 0) {
            this._readyToSpawn = false;
            this.stage.dispatchEvent(this.eventSpawnWave);
            console.log("event dispatched: spawnWave");
        }
    }
    update() {
        this.checkWaveStatus();
        this.checkWinCondition();
    }
}
exports.LevelManager = LevelManager;


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("be8cf8c34f5e1ce35f39")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.cb002aa8c774d0d51e5a.hot-update.js.map