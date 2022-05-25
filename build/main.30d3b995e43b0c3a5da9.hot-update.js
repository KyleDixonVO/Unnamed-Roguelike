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
        this.txtObjective.x = 125;
        this.txtObjective.y = 55;
        this.txtAmmo.letterSpacing = 1;
        this.txtSound = new createjs.BitmapText("10", assetManager.getSpriteSheet("glyphs"));
        this.txtSound.x = 290;
        this.txtSound.y = 135;
        this.txtSound.letterSpacing = 1;
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
        this.soundDown.gotoAndStop("sprites/button/volDown");
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
        this.volume = 10;
        this.ammoBacker = new createjs.Sprite(assetManager.getSpriteSheet("sprites"));
        this.ammoBacker.gotoAndStop("sprites/other/ammoUI");
        this.scoreBacker = new createjs.Sprite(assetManager.getSpriteSheet("sprites"));
        this.scoreBacker.gotoAndStop("sprites/other/score");
        this.enemiesLeft = new createjs.Sprite(assetManager.getSpriteSheet("sprites"));
        this.enemiesLeft.gotoAndStop("sprites/other/enemiesLeft");
        this.quitButton = new createjs.Sprite(assetManager.getSpriteSheet("sprites"));
        this.quitButton.gotoAndStop("sprites/button/quitToMenu");
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
        }, null, false);
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
    onQuitButtonClick() {
        this.quitButton.on("click", () => {
            createjs.Sound.play("Select", null, null, null, null, this.settings.volume);
            this.hideSettingsMenu();
            this.removeAll();
            this.screenManager.dispatchReset();
        });
    }
    onSoundDownClick() {
        this.soundDown.on("click", () => {
            if (this.volume < 1) {
                this.volume = 0;
                console.log("UI volume: " + this.volume);
                return;
            }
            else {
                this.volume -= 1;
                console.log("UI volume: " + this.volume);
                createjs.Sound.play("Select", null, null, null, null, this.settings.volume);
            }
        });
    }
    onSoundUpClick() {
        this.soundUp.on("click", () => {
            if (this.volume >= 10) {
                this.volume = 10;
                console.log("UI volume: " + this.volume);
                return;
            }
            else {
                this.volume += 1;
                console.log("UI volume: " + this.volume);
                createjs.Sound.play("Select", null, null, null, null, this.settings.volume);
            }
        });
    }
    removeAll() {
        this.stage.removeChild(this.startButton);
        this.stage.removeChild(this.settingsButton);
        this.stage.removeChild(this.pauseOverlay);
        this.stage.removeChild(this.healthBar);
        this.stage.removeChild(this.healthOutline);
        this.stage.removeChild(this.txtScore);
        this.stage.removeChild(this.settingsHeader);
        this.stage.removeChild(this.txtAmmo);
        this.stage.removeChild(this.txtObjective);
        this.stage.removeChild(this.soundDown);
        this.stage.removeChild(this.soundUp);
        this.stage.removeChild(this.controls);
        this.stage.removeChild(this.enemiesLeft);
        this.stage.removeChild(this.ammoBacker);
        this.stage.removeChild(this.scoreBacker);
        this.stage.removeChild(this.txtSound);
        this.stage.removeChild(this.quitButton);
    }
    showSettingsMenu() {
        this._paused = true;
        this.pauseOverlay.x = 300;
        this.pauseOverlay.y = 300;
        this.stage.addChild(this.pauseOverlay);
        this.settingsHeader.x = 300;
        this.settingsHeader.y = 100;
        this.stage.addChild(this.settingsHeader);
        this.controls.x = 300;
        this.controls.y = 300;
        this.stage.addChild(this.controls);
        this.soundDown.x = 225;
        this.soundDown.y = 150;
        this.stage.addChild(this.soundDown);
        this.soundUp.x = 375;
        this.soundUp.y = 150;
        this.stage.addChild(this.soundUp);
        this.stage.addChild(this.txtSound);
        this.quitButton.x = 300;
        this.quitButton.y = 580;
        this.stage.addChild(this.quitButton);
        this.onSoundDownClick();
        this.onSoundUpClick();
        this.onQuitButtonClick();
    }
    hideSettingsMenu() {
        this._paused = false;
        this.stage.removeChild(this.pauseOverlay);
        this.stage.removeChild(this.settingsHeader);
        this.stage.removeChild(this.soundDown);
        this.stage.removeChild(this.soundUp);
        this.stage.removeChild(this.controls);
        this.stage.removeChild(this.txtSound);
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
        this.scoreBacker.scaleX = 0.7;
        this.scoreBacker.scaleY = 0.7;
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
        this.txtSound.text = this.volume.toString();
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
/******/ 	__webpack_require__.h = () => ("bc2f31738f79bd1dd086")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.30d3b995e43b0c3a5da9.hot-update.js.map