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
    constructor(stage, assetManager, player, screenManager, inventory, settings, levelManager) {
        this.stage = stage;
        this.txtScore = new createjs.BitmapText("0", assetManager.getSpriteSheet("glyphs"));
        this.txtScore.x = 290;
        this.txtScore.y = 15;
        this.txtScore.letterSpacing = 1;
        this.txtAmmo = new createjs.BitmapText("0", assetManager.getSpriteSheet("glyphs"));
        this.txtAmmo.x = 525;
        this.txtAmmo.y = 15;
        this.txtAmmo.letterSpacing = 1;
        this.txtObjective = new createjs.BitmapText("0", assetManager.getSpriteSheet("glyphs"));
        this.txtObjective.x = 175;
        this.txtObjective.y = 55;
        this.txtAmmo.letterSpacing = 1;
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
        this.soundDown = new createjs.Sprite(assetManager.getSpriteSheet("sprites"));
        this.soundDown.gotoAndStop("sprites/button/volUp");
        this.soundUp = new createjs.Sprite(assetManager.getSpriteSheet("sprites"));
        this.soundUp.gotoAndStop("sprites/button/volUp");
        this.controls = new createjs.Sprite(assetManager.getSpriteSheet("sprites"));
        this.controls.gotoAndStop("sprites/other/controls");
        this._paused = false;
        this.player = player;
        this.screenManager = screenManager;
        this.playerInventory = inventory;
        this._ammo = this.playerInventory.currentWeaponAmmo;
        this.settings = settings;
        this.levelManager = levelManager;
        this._enemiesRemaining = this.levelManager.threshold - this.levelManager.defeatedEnemies;
        this.volume = 1;
        this.ammoBacker = new createjs.Sprite(assetManager.getSpriteSheet("sprites"));
        this.ammoBacker.gotoAndStop("sprites/other/ammoUI");
        this.scoreBacker = new createjs.Sprite(assetManager.getSpriteSheet("sprites"));
        this.scoreBacker.gotoAndStop("sprites/other/score");
        this.enemiesLeft = new createjs.Sprite(assetManager.getSpriteSheet("sprites"));
        this.enemiesLeft.gotoAndStop("sprites/other/enemiesLeft");
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
    set ammo(value) {
        this._ammo = value;
        this.txtAmmo.text = String(this._ammo);
    }
    get ammo() {
        return this._ammo;
    }
    set enemiesRemaining(value) {
        this._enemiesRemaining = value;
        this.txtObjective.text = String(this._enemiesRemaining);
    }
    reset() {
        this.score = 0;
        this.ammo = 0;
    }
    showStartMenu() {
        this.startButton.x = 200;
        this.startButton.y = 450;
        this.stage.addChild(this.startButton);
        this.settingsButton.x = 400;
        this.settingsButton.y = 450;
        this.settingsButton.scaleY = 1;
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
            createjs.Sound.play("Select", null, null, null, null, this.settings.volume);
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
            createjs.Sound.play("Select", null, null, null, null, this.settings.volume);
            if (this._paused == true)
                return;
            this.screenManager.openSettings();
        });
    }
    onSoundDownClick() {
        this.soundDown.on("mouseover", () => {
            this.soundDown.gotoAndStop("sprites/button/volDown");
        });
        this.soundDown.on("mouseout", () => {
            this.soundDown.gotoAndStop("sprites/button/volUp");
        });
        this.soundDown.on("click", () => {
            if (this.volume <= 0) {
                this.volume = 0;
                return;
            }
            this.volume -= 0.1;
            console.log(this.volume);
            createjs.Sound.play("Select", null, null, null, null, this.settings.volume);
        });
    }
    onSoundUpClick() {
        this.soundUp.on("mouseover", () => {
            this.soundUp.gotoAndStop("sprites/button/volDown");
        });
        this.soundUp.on("mouseout", () => {
            this.soundUp.gotoAndStop("sprites/button/volUp");
        });
        this.soundUp.on("click", () => {
            if (this.volume >= 1) {
                this.volume = 1;
                return;
            }
            this.volume += 0.1;
            console.log(this.volume);
            createjs.Sound.play("Select", null, null, null, null, this.settings.volume);
        });
    }
    removeAll() {
        this.stage.removeChild(this.startButton);
        this.stage.removeChild(this.settingsButton);
        this.stage.removeChild(this.pauseOverlay);
        this.stage.removeChild(this.healthBar);
        this.stage.removeChild(this.healthOutline);
        this.stage.removeChild(this.txtScore);
        this.stage.removeChild(this.txtScore);
        this.stage.removeChild(this.txtAmmo);
        this.stage.removeChild(this.txtObjective);
        this.stage.removeChild(this.soundDown);
        this.stage.removeChild(this.soundUp);
        this.stage.removeChild(this.controls);
        this.stage.removeChild(this.enemiesLeft);
        this.stage.removeChild(this.ammoBacker);
        this.stage.removeChild(this.scoreBacker);
    }
    showSettingsMenu() {
        this._paused = true;
        this.pauseOverlay.x = 300;
        this.pauseOverlay.y = 300;
        this.stage.addChild(this.pauseOverlay);
        this.settingsHeader.x = 300;
        this.settingsHeader.y = 100;
        this.stage.addChild(this.settingsHeader);
        this.soundDown.x = 200;
        this.soundDown.y = 200;
        this.stage.addChild(this.soundDown);
        this.soundUp.x = 400;
        this.soundUp.y = 200;
        this.stage.addChild(this.soundUp);
        this.controls.x = 300;
        this.controls.y = 400;
        this.stage.addChild(this.controls);
        this.onSoundDownClick();
        this.onSoundUpClick();
    }
    hideSettingsMenu() {
        this._paused = false;
        this.stage.removeChild(this.pauseOverlay);
        this.stage.removeChild(this.settingsHeader);
        this.stage.removeChild(this.soundDown);
        this.stage.removeChild(this.soundUp);
        this.stage.removeChild(this.controls);
    }
    showPlayerHUD() {
        this.healthBar.x = 15;
        this.healthBar.y = 30;
        this.healthBar.scaleY = 0.8;
        this.healthBar.alpha = 0.65;
        this.healthOutline.x = 10;
        this.healthOutline.y = 30;
        this.healthOutline.alpha = 0.65;
        this.healthOutline.scaleX = 1.05;
        this.scoreBacker.x = 275;
        this.scoreBacker.y = 30;
        this.scoreBacker.scaleX = 0.5;
        this.scoreBacker.scaleY = 0.5;
        this.ammoBacker.x = 500;
        this.ammoBacker.y = 30;
        this.ammoBacker.scaleX = 0.75;
        this.ammoBacker.scaleY = 0.75;
        this.enemiesLeft.x = 90;
        this.enemiesLeft.y = 70;
        this.enemiesLeft.scaleX = 0.5;
        this.enemiesLeft.scaleY = 0.5;
        this.stage.addChild(this.healthOutline);
        this.stage.addChild(this.healthBar);
        this.stage.addChild(this.scoreBacker);
        this.stage.addChild(this.ammoBacker);
        this.stage.addChild(this.enemiesLeft);
        this.stage.addChild(this.txtScore);
        this.stage.addChild(this.txtAmmo);
        this.stage.addChild(this.txtObjective);
    }
    updateHUD() {
        this._ammo = this.playerInventory.currentWeaponAmmo;
        this._enemiesRemaining = this.levelManager.threshold - this.levelManager.defeatedEnemies;
        let scaleFactor;
        scaleFactor = this.player.health / this.player.healthMax;
        this.healthBar.scaleX = scaleFactor;
        this.txtScore.text = this._score.toString();
        this.txtAmmo.text = this._ammo.toString();
        this.txtObjective.text = this._enemiesRemaining.toString();
    }
    incrementScore() {
        this._score++;
    }
}
exports.UserInterface = UserInterface;


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("f4e7e2b391cc0b006f0a")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.79ece7d19a6e026109cc.hot-update.js.map