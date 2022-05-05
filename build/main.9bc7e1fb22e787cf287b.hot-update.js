"use strict";
self["webpackHotUpdategame_programming_createjs_webpack"]("main",{

/***/ "./src/Enemy.ts":
/*!**********************!*\
  !*** ./src/Enemy.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Enemy = void 0;
const Constants_1 = __webpack_require__(/*! ./Constants */ "./src/Constants.ts");
const GameCharacter_1 = __webpack_require__(/*! ./GameCharacter */ "./src/GameCharacter.ts");
const Toolkit_1 = __webpack_require__(/*! ./Toolkit */ "./src/Toolkit.ts");
class Enemy extends GameCharacter_1.GameCharacter {
    constructor(stage, assetManager, player) {
        super(stage, assetManager, "sprites/firstplayable/smol boi front");
        this.player = player;
        this.shooting = false;
        this._enemyType = "melee";
        this._used = false;
        this.shooting = false;
        this._state = GameCharacter_1.GameCharacter.STATE_MOVING;
        this._speed = 2;
        this.eventPlayerHit = new createjs.Event("playerHit", true, false);
    }
    get used() {
        return this._used;
    }
    set used(value) {
        this._used = value;
    }
    onKilled() {
        this._state = GameCharacter_1.GameCharacter.STATE_DEAD;
        createjs.Tween.get(this._sprite, { useTicks: true }).to({ alpha: 0 }, 500).wait(100).call(this.reset);
    }
    trackPlayer(player) {
        if (this._state == GameCharacter_1.GameCharacter.STATE_PAUSED)
            return;
        this.player = player;
        this._sprite.play();
        this._state = GameCharacter_1.GameCharacter.STATE_MOVING;
    }
    reset() {
        this._sprite.gotoAndStop("sprites/firstplayable/smol boi front");
        this._sprite.x = 300;
        this._sprite.y = 300;
        this._speed = 2;
        this._health = Constants_1.DEFAULT_HEALTH;
        this._state = GameCharacter_1.GameCharacter.STATE_IDLE;
        this._used = false;
        this.removeFromStage();
    }
    killed() {
        this.stopMovement();
        this.onKilled();
    }
    update() {
        if (this._state == GameCharacter_1.GameCharacter.STATE_DEAD || this._state == GameCharacter_1.GameCharacter.STATE_PAUSED || this._state == GameCharacter_1.GameCharacter.STATE_IDLE) {
            return;
        }
        ;
        if (this._sprite.x > this.player.sprite.x) {
            this.deltaX = -1;
        }
        else if (this._sprite.x < this.player.sprite.x) {
            this.deltaX = 1;
        }
        else
            (this.deltaX = 0);
        if (this._sprite.y > this.player.sprite.y) {
            this.deltaY = -1;
        }
        else if (this._sprite.y < this.player.sprite.y) {
            this.deltaY = 1;
        }
        else
            (this.deltaY = 0);
        this._sprite.x += this.deltaX * this._speed;
        this._sprite.y += this.deltaY * this._speed;
        if (this.player.state == GameCharacter_1.GameCharacter.STATE_DEAD)
            return;
        if ((0, Toolkit_1.boxHit)(this._sprite, this.player.sprite)) {
            console.log("dispatching event: playerHit");
            this.stage.dispatchEvent(this.eventPlayerHit);
        }
    }
}
exports.Enemy = Enemy;


/***/ }),

/***/ "./src/Toolkit.ts":
/*!************************!*\
  !*** ./src/Toolkit.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.radiusHit = exports.pointHit = exports.boxHit = exports.randomMe = void 0;
function randomMe(low, high) {
    let randomNum = 0;
    randomNum = Math.floor(Math.random() * (high - low + 1)) + low;
    return randomNum;
}
exports.randomMe = randomMe;
function boxHit(sprite1, sprite2) {
    let width1 = sprite1.getBounds().width;
    let height1 = sprite1.getBounds().height;
    let width2 = sprite2.getBounds().width;
    let height2 = sprite2.getBounds().height;
    if ((sprite1.x + width1 > sprite2.x) &&
        (sprite1.y + height1 > sprite2.y) &&
        (sprite1.x < sprite2.x + width2) &&
        (sprite1.y < sprite2.y + height2)) {
        return true;
    }
    else {
        return false;
    }
}
exports.boxHit = boxHit;
function pointHit(sprite1, sprite2, sprite1HitX = 0, sprite1HitY = 0, stage = null) {
    if (stage != null) {
        let markerPoint = sprite1.localToGlobal(sprite1HitX, sprite1HitY);
        let marker = new createjs.Shape();
        marker.graphics.beginFill("#FF00EC");
        marker.graphics.drawRect(0, 0, 4, 4);
        marker.regX = 2;
        marker.regY = 2;
        marker.x = markerPoint.x;
        marker.y = markerPoint.y;
        marker.cache(0, 0, 4, 4);
        stage.addChild(marker);
    }
    let point = sprite1.localToLocal(sprite1HitX, sprite1HitY, sprite2);
    if (sprite2.hitTest(point.x, point.y)) {
        return true;
    }
    else {
        return false;
    }
}
exports.pointHit = pointHit;
function radiusHit(sprite1, radius1, sprite2, radius2) {
    let a = sprite1.x - sprite2.x;
    let b = sprite1.y - sprite2.y;
    let c = Math.sqrt((a * a) + (b * b));
    if (c <= (radius1 + radius2)) {
        return true;
    }
    else {
        return false;
    }
}
exports.radiusHit = radiusHit;


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("d15571a44cca072f3b56")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.9bc7e1fb22e787cf287b.hot-update.js.map