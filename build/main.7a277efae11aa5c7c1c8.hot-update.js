"use strict";
self["webpackHotUpdategame_programming_createjs_webpack"]("main",{

/***/ "./src/Game.ts":
/*!*********************!*\
  !*** ./src/Game.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! createjs */ "./node_modules/createjs/builds/1.0.0/createjs.min.js");
const Constants_1 = __webpack_require__(/*! ./Constants */ "./src/Constants.ts");
const AssetManager_1 = __webpack_require__(/*! ./AssetManager */ "./src/AssetManager.ts");
const UserInterface_1 = __webpack_require__(/*! ./UserInterface */ "./src/UserInterface.ts");
const ScreenManager_1 = __webpack_require__(/*! ./ScreenManager */ "./src/ScreenManager.ts");
const Player_1 = __webpack_require__(/*! ./Player */ "./src/Player.ts");
const Enemy_1 = __webpack_require__(/*! ./Enemy */ "./src/Enemy.ts");
const GameCharacter_1 = __webpack_require__(/*! ./GameCharacter */ "./src/GameCharacter.ts");
const Projectile_1 = __webpack_require__(/*! ./Projectile */ "./src/Projectile.ts");
const Inventory_1 = __webpack_require__(/*! ./Inventory */ "./src/Inventory.ts");
const Toolkit_1 = __webpack_require__(/*! ./Toolkit */ "./src/Toolkit.ts");
let stage;
let canvas;
let assetManager;
let upKey = false;
let downKey = false;
let leftKey = false;
let rightKey = false;
let spacePress = false;
let escapePress = false;
let escapeUp = true;
let paused = false;
let iFramesActive = false;
let player;
let enemyPool = [];
let enemyInventories = [];
let projectilePool = [];
let userInterface;
let screenManager;
let newProjectile;
let newEnemy;
let playerInventory;
let bank;
let invincibleTimer;
let collisionTimer;
let collisionPollingRate;
function onReady(e) {
    console.log(">> spritesheet loaded – ready to add sprites to game");
    screenManager = new ScreenManager_1.ScreenManager(stage, assetManager);
    userInterface = new UserInterface_1.UserInterface(stage, assetManager);
    player = new Player_1.Player(stage, assetManager);
    playerInventory = new Inventory_1.Inventory(player);
    userInterface.passIn(player, screenManager);
    for (let i = 0; i < Constants_1.ENEMY_MAX; i++) {
        enemyPool.push(new Enemy_1.Enemy(stage, assetManager, player));
    }
    for (let i = 0; i < Constants_1.ENEMY_MAX; i++) {
        enemyInventories.push(new Inventory_1.Inventory(enemyPool[i]));
    }
    for (let i = 0; i < Constants_1.PROJECTILE_MAX; i++) {
        projectilePool.push(new Projectile_1.Projectile(stage, assetManager, "sprites/firstplayable/bullet"));
    }
    stage.on("playerKilled", onGameEvent);
    stage.on("playerDamaged", onGameEvent);
    stage.on("gameStarted", onGameEvent);
    stage.on("gameReset", onGameEvent);
    stage.on("titleActive", onGameEvent);
    stage.on("gameWin", onGameEvent);
    stage.on("openSettings", onGameEvent);
    stage.on("closeSettings", onGameEvent);
    stage.on("gamePaused", onGameEvent);
    stage.on("gameUnpaused", onGameEvent);
    stage.on("playerHit", onGameEvent);
    createjs.Ticker.framerate = Constants_1.FRAME_RATE;
    createjs.Ticker.on("tick", onTick);
    console.log(">> game ready");
    screenManager.showTitleScreen();
}
function onGameEvent(e) {
    console.log("called onGameEvent");
    switch (e.type) {
        case "playerKilled":
            userInterface.removeAll();
            player.removeFromStage();
            for (let enemy of enemyPool) {
                if (enemy.used)
                    enemy.reset();
            }
            for (let projectile of projectilePool) {
                if (projectile.used)
                    projectile.reset();
            }
            screenManager.showGameOverScreen();
            break;
        case "playerHit":
            if (iFramesActive == true)
                return;
            iFramesActive = true;
            player.takeDamage(Constants_1.ALIEN_CONTACT_DAMAGE);
            invincibleTimer = window.setInterval(onInvincibleTimer, Constants_1.I_FRAMES_DEFAULT);
            break;
        case "gameStarted":
            console.log("received dispatch: gameStarted ");
            screenManager.showGame();
            player.addToStage();
            userInterface.showPlayerHUD();
            onAddEnemy();
            break;
        case "gameReset":
            player.reset();
            userInterface.reset();
            screenManager.showTitleScreen();
            break;
        case "titleActive":
            console.log("received dispatch: titleActive ");
            userInterface.showStartMenu();
            userInterface.onStartClick();
            userInterface.onSettingsClick();
            break;
        case "gameWin":
            userInterface.removeAll();
            player.removeFromStage();
            for (let enemy of enemyPool) {
                if (enemy.used)
                    enemy.reset();
            }
            for (let projectile of projectilePool) {
                if (projectile.used)
                    projectile.reset();
            }
            break;
        case "openSettings":
            console.log("recieved dispatch: openSettings");
            screenManager.pauseGame();
            userInterface.showSettingsMenu();
            break;
        case "closeSettings":
            console.log("recieved dispatch: closeSettings");
            userInterface.hideSettingsMenu();
            screenManager.unpauseGame();
            break;
        case "gamePaused":
            if (paused == true)
                return;
            paused = true;
            console.log("recieved dispatch: gamePaused");
            player.pause();
            for (let projectile of projectilePool) {
                if (projectile.used)
                    projectile.gamePaused = true;
            }
            for (let enemy of enemyPool) {
                if (enemy.used)
                    enemy.pause();
            }
            break;
        case "gameUnpaused":
            if (paused == false)
                return;
            paused = false;
            console.log("recieved dispatch: gameUnpaused");
            player.unpause();
            for (let projectile of projectilePool) {
                if (projectile.used)
                    projectile.gamePaused = false;
            }
            for (let enemy of enemyPool) {
                if (enemy.used)
                    enemy.unpause();
            }
            break;
    }
}
function onAddProjectile() {
    if (escapePress == true || player.state == GameCharacter_1.GameCharacter.STATE_DEAD)
        return;
    for (newProjectile of projectilePool) {
        if (newProjectile.used == false) {
            newProjectile.used = true;
            newProjectile.passIn(player, playerInventory);
            newProjectile.activate();
            break;
        }
    }
}
function onAddEnemy() {
    if (escapePress == true)
        return;
    for (newEnemy of enemyPool) {
        if (newEnemy.used == false) {
            newEnemy.used = true;
            newEnemy.addToStage();
            newEnemy.sprite.x = 1;
            newEnemy.sprite.y = 1;
            break;
        }
    }
}
function onInvincibleTimer() {
    window.clearInterval(invincibleTimer);
    iFramesActive = false;
    console.log("I frames no longer active");
}
function startCollsionTimer() {
    collisionTimer = window.setInterval(onCollsionTimer, 100);
    console.log("Collision timer started");
}
function onCollsionTimer() {
    window.clearInterval(collisionTimer);
    console.log("checking for projectile collsions");
}
function projectileEnemyCollision() {
    for (let projectile of projectilePool) {
        if (!projectile.used)
            return;
        if (projectile.gamecharacter != this.player)
            return;
        for (let enemy of enemyPool) {
            if (!enemy.used)
                return;
            if ((0, Toolkit_1.radiusHit)(projectile.sprite, 10, enemy.sprite, 10)) {
                enemy.takeDamage(Constants_1.PISTOL_DAMAGE);
                projectile.reset();
            }
        }
    }
}
function monitorKeys() {
    if (upKey == true) {
        player.direction = GameCharacter_1.GameCharacter.DIR_UP;
        console.log("W");
    }
    if (downKey == true) {
        player.direction = GameCharacter_1.GameCharacter.DIR_DOWN;
        console.log("S");
    }
    if (leftKey == true) {
        player.direction = GameCharacter_1.GameCharacter.DIR_LEFT;
        console.log("A");
    }
    if (rightKey == true) {
        player.direction = GameCharacter_1.GameCharacter.DIR_RIGHT;
        console.log("D");
    }
    if (rightKey == false && leftKey == false && upKey == false && downKey == false) {
        player.direction = GameCharacter_1.GameCharacter.DIR_NEUTRAL;
        console.log("No Input");
    }
    if (spacePress == true) {
        console.log("Fired a projectile!");
        onAddProjectile();
    }
    if (escapePress == true) {
        if (escapeUp == true)
            return;
        if (paused == true)
            return;
        console.log("escape toggle active");
        screenManager.openSettings();
    }
    if (escapePress == false) {
        if (escapeUp == true)
            return;
        if (paused == false)
            return;
        console.log("escape toggle inactive");
        screenManager.closeSettings();
    }
}
document.onkeydown = onKeyDown;
document.onkeyup = onKeyUp;
function onKeyDown(e) {
    if (e.key == 'w' || e.key == 'W') {
        upKey = true;
    }
    else if (e.key == 's' || e.key == 'S') {
        downKey = true;
    }
    else if (e.key == 'a' || e.key == 'A') {
        leftKey = true;
    }
    else if (e.key == 'd' || e.key == 'D') {
        rightKey = true;
    }
    if (e.key == " ") {
        spacePress = true;
    }
    if (e.key == "Escape") {
        if (escapeUp = true) {
            escapePress = !escapePress;
        }
        escapeUp = false;
    }
}
function onKeyUp(e) {
    if (e.key == 'w' || e.key == 'W') {
        upKey = false;
    }
    else if (e.key == 's' || e.key == 'S') {
        downKey = false;
    }
    else if (e.key == 'a' || e.key == 'A') {
        leftKey = false;
    }
    else if (e.key == 'd' || e.key == 'D') {
        rightKey = false;
    }
    if (e.key == " ") {
        spacePress = false;
    }
    if (e.key == "Escape") {
        escapeUp = true;
    }
}
function onTick(e) {
    document.getElementById("fps").innerHTML = String(createjs.Ticker.getMeasuredFPS());
    monitorKeys();
    player.update();
    for (let projectile of projectilePool) {
        if (projectile.used)
            projectile.update();
    }
    for (let enemy of enemyPool) {
        if (enemy.used) {
            enemy.trackPlayer(player);
            enemy.update();
        }
    }
    userInterface.updateHUD();
    projectileEnemyCollision();
    stage.update();
}
function main() {
    canvas = document.getElementById("game-canvas");
    canvas.width = Constants_1.STAGE_WIDTH;
    canvas.height = Constants_1.STAGE_HEIGHT;
    stage = new createjs.StageGL(canvas, { antialias: true });
    stage.enableMouseOver(10);
    assetManager = new AssetManager_1.AssetManager(stage);
    stage.on("allAssetsLoaded", onReady, null, true);
    assetManager.loadAssets(Constants_1.ASSET_MANIFEST);
}
main();


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("750acd045724b97bef07")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.7a277efae11aa5c7c1c8.hot-update.js.map