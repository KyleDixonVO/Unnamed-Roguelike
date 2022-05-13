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
        this._bounces = 0;
        this.deltaX = 0;
        this.deltaY = 0;
        this._gamePaused = false;
        this._shouldBounce = false;
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
    get controllerInventory() {
        return this._inventory;
    }
    set used(value) {
        this._used = value;
    }
    get gamePaused() {
        return this._gamePaused;
    }
    set gamePaused(value) {
        this._gamePaused = value;
    }
    get gamecharacter() {
        return this._gameCharacter;
    }
    set gamecharacter(value) {
        this._gameCharacter = value;
    }
    passIn(gameCharacter, inventory) {
        this._gameCharacter = gameCharacter;
        this._inventory = inventory;
        this.weaponType = inventory.currentWeapon;
    }
    reset() {
        this._bounces = 0;
        this._damage = Constants_1.DEF_PROJECTILE_DAMAGE;
        this._speed = Constants_1.DEF_PROJECTILE_SPEED;
        this._used = false;
        this.deltaX = 0;
        this.deltaY = 0;
        this.stage.removeChild(this._sprite);
    }
    activate() {
        switch (this.gamecharacter.facing) {
            case GameCharacter_1.GameCharacter.DIR_UP:
                this.deltaX = 0;
                this.deltaY = -1;
                this._sprite.rotation = 90;
                break;
            case GameCharacter_1.GameCharacter.DIR_DOWN:
                this.deltaX = 0;
                this.deltaY = 1;
                this._sprite.rotation = 270;
                break;
            case GameCharacter_1.GameCharacter.DIR_LEFT:
                this.deltaX = -1;
                this.deltaY = 0;
                this._sprite.rotation = 0;
                break;
            case GameCharacter_1.GameCharacter.DIR_RIGHT:
                this.deltaX = 1;
                this.deltaY = 0;
                this._sprite.rotation = 180;
                break;
        }
        this.used = true;
        this._sprite.x = this.gamecharacter.sprite.x;
        this._sprite.y = this.gamecharacter.sprite.y;
        console.log("about to add projectile of type to stage: " + this.controllerInventory.currentProjectileSprite);
        this.stage.addChild(this._sprite);
        this.applyWeaponCharacteristics();
        console.log("added projectile of type: " + this.controllerInventory.currentProjectileSprite);
    }
    applyWeaponCharacteristics() {
        this._damage = this.controllerInventory.weaponDamage;
        this._speed = this.controllerInventory.currentProjectileSpeed;
    }
    update() {
        if (this._gamePaused == true)
            return;
        this._sprite.x += this.deltaX * this._speed;
        this._sprite.y += this.deltaY * this._speed;
        if (this._sprite.x > Constants_1.STAGE_WIDTH + this._sprite.getBounds().width
            || this._sprite.x < 0 - this._sprite.getBounds().width
            || this._sprite.y > Constants_1.STAGE_HEIGHT + this._sprite.getBounds().height
            || this._sprite.y < 0 - this._sprite.getBounds().height) {
            this.used = false;
            this._sprite.stop();
            this.stage.removeChild(this._sprite);
            this.reset();
            console.log("projectile reclaimed");
        }
    }
}
exports.Projectile = Projectile;


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("624bdbc56421e3f109e4")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.4d0650c75ddc25edd752.hot-update.js.map