"use strict";
self["webpackHotUpdategame_programming_createjs_webpack"]("main",{

/***/ "./src/UserInterface.ts":
/*!******************************!*\
  !*** ./src/UserInterface.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserInterface = void 0;
class UserInterface {
    constructor(stage, assetManager) {
        this.stage = stage;
        this.txtScore = new createjs.BitmapText("0", assetManager.getSpriteSheet("glyphs"));
        this.txtScore.x = 200;
        this.txtScore.y = 20;
        this.txtScore.letterSpacing = 1;
        this.startButton = new createjs.Sprite(assetManager.getSpriteSheet("sprites"));
        this.startButton.gotoAndStop("sprites/button/up");
        this.settingsButton = new createjs.Sprite(assetManager.getSpriteSheet("sprites"));
        this.settingsButton.gotoAndStop("sprites/button/settingsUp");
        this.pauseOverlay = new createjs.Sprite(assetManager.getSpriteSheet("sprites"));
        this.pauseOverlay.gotoAndStop("sprites/other/pauseOverlay");
        this.settingsHeader = new createjs.Sprite(assetManager.getSpriteSheet("sprites"));
        this.settingsHeader.gotoAndStop("sprites/other/settingsText");
        this.healthBar = new createjs.Sprite(assetManager.getSpriteSheet("sprites"));
        this.healthBar.gotoAndStop("sprites/other/healthBar");
        this.healthOutline = new createjs.Sprite(assetManager.getSpriteSheet("sprites"));
        this.healthOutline.gotoAndStop("sprites/other/healthOutline");
        this._paused = false;
        this.reset();
    }
    set score(value) {
        this._score = value;
        this.txtScore.text = String(this._score);
    }
    get score() {
        return this._score;
    }
    set paused(value) {
        this._paused = value;
    }
    get paused() {
        return this._paused;
    }
    passIn(player, screenManager) {
        this.player = player;
        this.screenManager = screenManager;
    }
    reset() {
        this.score = 0;
    }
    showStartMenu() {
        this.startButton.x = 200;
        this.startButton.y = 450;
        this.stage.addChild(this.startButton);
        this.settingsButton.x = 350;
        this.settingsButton.y = 450;
        this.settingsButton.scaleY = 0.9;
        this.stage.addChild(this.settingsButton);
    }
    onStartClick() {
        this.startButton.on("mouseover", () => {
            this.startButton.gotoAndStop("sprites/button/over");
        });
        this.startButton.on("mouseout", () => {
            this.startButton.gotoAndStop("sprites/button/up");
        });
        this.startButton.on("click", () => {
            if (this._paused == true)
                return;
            this.screenManager.startDispatch();
        });
    }
    onSettingsClick() {
        this.settingsButton.on("mouseover", () => {
            this.settingsButton.gotoAndStop("sprites/button/settingsOver");
        });
        this.settingsButton.on("mouseout", () => {
            this.settingsButton.gotoAndStop("sprites/button/settingsUp");
        });
        this.settingsButton.on("click", () => {
            if (this._paused == true)
                return;
            this.screenManager.openSettings();
        });
    }
    removeAll() {
        this.stage.removeChild(this.startButton);
        this.stage.removeChild(this.settingsButton);
        this.stage.removeChild(this.pauseOverlay);
    }
    showSettingsMenu() {
        this._paused = true;
        this.pauseOverlay.x = 300;
        this.pauseOverlay.y = 300;
        this.stage.addChild(this.pauseOverlay);
        this.settingsHeader.x = 300;
        this.settingsHeader.y = 100;
        this.stage.addChild(this.settingsHeader);
    }
    hideSettingsMenu() {
        this._paused = false;
        this.stage.removeChild(this.pauseOverlay);
        this.stage.removeChild(this.settingsHeader);
    }
    showPlayerHUD() {
        this.healthBar.x = 110;
        this.healthBar.y = 30;
        this.healthBar.scaleY = 0.8;
        this.healthOutline.x = 110;
        this.healthOutline.y = 30;
        this.healthOutline.x = 1.1;
        this.stage.addChild(this.healthOutline);
        this.stage.addChild(this.healthBar);
    }
}
exports.UserInterface = UserInterface;


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("6db745fd75637b605283")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.1c04889bbb36b532f75b.hot-update.js.map