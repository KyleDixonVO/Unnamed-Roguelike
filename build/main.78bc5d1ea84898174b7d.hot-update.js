"use strict";
self["webpackHotUpdategame_programming_createjs_webpack"]("main",{

/***/ "./src/Pickup.ts":
/*!***********************!*\
  !*** ./src/Pickup.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Pickup = void 0;
const GameCharacter_1 = __webpack_require__(/*! ./GameCharacter */ "./src/GameCharacter.ts");
const Toolkit_1 = __webpack_require__(/*! ./Toolkit */ "./src/Toolkit.ts");
class Pickup {
    constructor(stage, assetManager, player) {
        this.medkit = "sprites/firstplayable/medkit";
        this.ammoBox = "sprites/firstplayable/ammo";
        this.typeMedkit = "medkit";
        this.typeAmmo = "ammo";
        this.stage = stage;
        this.player = player;
        this._pickupType = this.typeMedkit;
        this._used = false;
        this._sprite = assetManager.getSprite("sprites", this.medkit, 0, 0);
        this.eventPickupAmmo = new createjs.Event("pickupAmmo", true, false);
        this.eventPickupMedkit = new createjs.Event("pickupMedkit", true, false);
    }
    get pickupType() {
        return this._pickupType;
    }
    set pickupType(value) {
        this._pickupType = value;
    }
    get used() {
        return this._used;
    }
    set used(value) {
        this._used = value;
    }
    checkType() {
        if (this.pickupType == this.typeMedkit) {
            this._sprite.gotoAndStop(this.medkit);
        }
        else if (this.pickupType == this.typeAmmo) {
            this._sprite.gotoAndStop(this.ammoBox);
        }
    }
    update() {
        if (this.player.state == GameCharacter_1.GameCharacter.STATE_PAUSED)
            return;
        this.checkType();
        if ((0, Toolkit_1.boxHit)(this._sprite, this.player.sprite)) {
            if (this._pickupType = this.typeMedkit) {
                this.stage.dispatchEvent(this.eventPickupMedkit);
            }
            else if (this._pickupType = this.typeAmmo) {
                this.stage.dispatchEvent(this.eventPickupAmmo);
            }
        }
    }
    addToStage() {
        this.checkType();
        this.stage.addChild(this._sprite);
    }
    removeFromStage() {
        this.stage.removeChild(this._sprite);
    }
    randomizeType() {
        let randomize;
        randomize = (0, Toolkit_1.randomMe)(0, 1);
        if (randomize == 0) {
            this._pickupType = this.typeAmmo;
        }
        else if (randomize == 1) {
            this._pickupType = this.typeMedkit;
        }
    }
    reset() {
        this._used = false;
    }
}
exports.Pickup = Pickup;


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("fa2c8731ce073b4f5ce0")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.78bc5d1ea84898174b7d.hot-update.js.map