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
const GameCharacter_1 = __webpack_require__(/*! ./GameCharacter */ "./src/GameCharacter.ts");
const Inventory_1 = __webpack_require__(/*! ./Inventory */ "./src/Inventory.ts");
const Toolkit_1 = __webpack_require__(/*! ./Toolkit */ "./src/Toolkit.ts");
const LevelManager_1 = __webpack_require__(/*! ./LevelManager */ "./src/LevelManager.ts");
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
let projectileTimerActive = false;
let fireDelayActive = false;
let shiftPress = false;
let shiftUp = true;
let LKey = false;
let LUp = true;
let gameStarted = false;
let weaponNum = 0;
let stageNum = 1;
let player;
let userInterface;
let screenManager;
let playerInventory;
let levelManager;
let poolManager;
let invincibleTimer;
let collisionTimer;
let fireDelayTimer;
function onReady(e) {
    console.log(">> spritesheet loaded – ready to add sprites to game");
    screenManager = new ScreenManager_1.ScreenManager(stage, assetManager);
    levelManager = new LevelManager_1.LevelManager(stage);
    player = new Player_1.Player(stage, assetManager);
    playerInventory = new Inventory_1.Inventory(player);
    userInterface = new UserInterface_1.UserInterface(stage, assetManager, player, screenManager, playerInventory);
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
    stage.on("enemyKilled", onGameEvent, false);
    stage.on("pickupMedkit", onGameEvent);
    stage.on("pickupAmmo", onGameEvent);
    stage.on("spawnWave", onGameEvent);
    stage.on("completeLevel", onGameEvent);
    stage.on("loadNextLevel", onGameEvent);
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
            hideLevel();
            resetPools();
            screenManager.showGameOverScreen();
            break;
        case "playerHit":
            if (iFramesActive == true)
                return;
            iFramesActive = true;
            player.takeDamage(Constants_1.ALIEN_CONTACT_DAMAGE);
            invincibleTimer = window.setInterval(onInvincibleTimer, Constants_1.I_FRAMES_DEFAULT);
            break;
        case "enemyKilled":
            console.log("received dispatch: enemyKilled");
            levelManager.defeatedEnemies++;
            console.log(levelManager.defeatedEnemies);
            levelManager.readyToSpawn = true;
            userInterface.incrementScore();
            userInterface.updateHUD();
            break;
        case "gameStarted":
            console.log("received dispatch: gameStarted ");
            screenManager.showGame();
            showLevel();
            loadLevel(levelManager.activeLevel);
            player.addToStage();
            player.startMovement();
            console.log(player.state);
            userInterface.showPlayerHUD();
            addPickUp();
            gameStarted = true;
            break;
        case "gameReset":
            player.reset();
            userInterface.reset();
            hideLevel();
            screenManager.showTitleScreen();
            levelManager.reset();
            gameStarted == false;
            break;
        case "titleActive":
            console.log("received dispatch: titleActive ");
            hideLevel();
            userInterface.showStartMenu();
            userInterface.onStartClick();
            userInterface.onSettingsClick();
            break;
        case "gameWin":
            screenManager.showWinScreen();
            userInterface.removeAll();
            hideLevel();
            player.removeFromStage();
            player.reset();
            resetPools();
            levelManager.reset();
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
            for (let projectile of playerProjectilePool) {
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
            for (let projectile of playerProjectilePool) {
                if (projectile.used)
                    projectile.gamePaused = false;
            }
            for (let enemy of enemyPool) {
                if (enemy.used)
                    enemy.unpause();
            }
            break;
        case "pickupMedkit":
            console.log("received dispatch: pickupHealth");
            player.heal();
            break;
        case "pickupAmmo":
            console.log("received dispatch: pickupAmmo");
            playerInventory.refillAmmo();
            break;
        case "spawnWave":
            console.log("received dispatch: spawnWave");
            console.log(levelManager.enemiesSpawned, levelManager.threshold);
            for (let i = 0; i < levelManager.activeLevel; i++) {
                console.log("spawning enemy");
                onAddEnemy();
            }
            break;
        case "completeLevel":
            console.log("received dispatch: completeLevel");
            screenManager.showLevelComplete();
            levelManager.resetForNextLevel();
            resetPools();
            gameStarted = false;
            break;
        case "loadNextLevel":
            console.log("received dispatch: loadNextLevel");
            screenManager.showGame();
            showLevel();
            loadLevel(levelManager.activeLevel);
            player.addToStage();
            player.startMovement();
            gameStarted = true;
            console.log(player.state);
            userInterface.showPlayerHUD();
            break;
    }
}
function addProjectile() {
    if (escapePress == true || player.state == GameCharacter_1.GameCharacter.STATE_DEAD || player.state == GameCharacter_1.GameCharacter.STATE_IDLE)
        return;
    poolManager.addPlayerProjectile();
}
function addPickUp() {
    if (escapePress == true)
        return;
    poolManager.addPickUp();
}
function startFireDelayTimer() {
    if (fireDelayActive == true)
        return;
    fireDelayActive = true;
    addProjectile();
    fireDelayTimer = window.setInterval(onFireDelayTimer, playerInventory.fireDelay);
}
function onFireDelayTimer() {
    fireDelayActive = false;
    window.clearInterval(fireDelayTimer);
}
function addEnemyProjectile() {
    poolManager.addProjectile();
}
function onAddEnemy() {
    if (escapePress == true)
        return;
    poolManager.addEnemy();
}
function showLevel() {
    poolManager.showLevel();
}
function hideLevel() {
    poolManager.hideLevel();
}
function loadLevel(value) {
    poolManager.loadLevel(value);
}
function resetPools() {
    poolManager.resetPools();
}
function onInvincibleTimer() {
    window.clearInterval(invincibleTimer);
    iFramesActive = false;
    console.log("I frames no longer active");
}
function startCollsionTimer() {
    if (projectileTimerActive == true)
        return;
    projectileTimerActive = true;
    collisionTimer = window.setInterval(onCollsionTimer, 3);
}
function onCollsionTimer() {
    projectileTimerActive = false;
    projectileEnemyCollision();
}
function projectileEnemyCollision() {
    for (let projectile of playerProjectilePool) {
        if (!projectile.used)
            continue;
        for (let enemy of enemyPool) {
            if (!enemy.used)
                continue;
            if ((0, Toolkit_1.radiusHit)(enemy.sprite, 16, projectile.sprite, 2)) {
                if (enemy.state == GameCharacter_1.GameCharacter.STATE_DEAD || enemy.state == GameCharacter_1.GameCharacter.STATE_DYING || enemy.state == GameCharacter_1.GameCharacter.STATE_IDLE)
                    continue;
                console.log("hit!");
                enemy.takeDamage(projectile.damage);
                projectile.secondaryEffect(enemy);
            }
        }
    }
}
function projectilePlayerCollision() {
    for (let projectile of projectilePool) {
        if (!projectile.used)
            return;
        if ((0, Toolkit_1.radiusHit)(projectile.sprite, 2, player.sprite, 16)) {
            player.takeDamage(Constants_1.PISTOL_DAMAGE);
            projectile.reset();
        }
    }
}
function tileCollisionDetection() {
}
function monitorKeys() {
    if (upKey == true) {
        player.direction = GameCharacter_1.GameCharacter.DIR_UP;
    }
    if (downKey == true) {
        player.direction = GameCharacter_1.GameCharacter.DIR_DOWN;
    }
    if (leftKey == true) {
        player.direction = GameCharacter_1.GameCharacter.DIR_LEFT;
    }
    if (rightKey == true) {
        player.direction = GameCharacter_1.GameCharacter.DIR_RIGHT;
    }
    if (rightKey == false && leftKey == false && upKey == false && downKey == false) {
        player.direction = GameCharacter_1.GameCharacter.DIR_NEUTRAL;
    }
    if (spacePress == true) {
        startFireDelayTimer();
    }
    if (shiftPress == true) {
        console.log("attempting weapon swap");
        if (shiftUp == false || paused == true)
            return;
        console.log("changing weapons");
        shiftUp = false;
        weaponNum++;
        if (weaponNum > 4) {
            weaponNum = 0;
        }
        switch (weaponNum) {
            case 0:
                playerInventory.currentWeapon = Constants_1.PISTOL;
                break;
            case 1:
                playerInventory.currentWeapon = Constants_1.LASER;
                break;
            case 2:
                playerInventory.currentWeapon = Constants_1.TESLA;
                break;
            case 3:
                playerInventory.currentWeapon = Constants_1.ROCKET;
                break;
            case 4:
                playerInventory.currentWeapon = Constants_1.RAILGUN;
                break;
        }
    }
    if (LKey == true) {
        console.log("attempting stage swap");
        if (LUp == false || paused == true)
            return;
        console.log("changing stage");
        LUp = false;
        stageNum++;
        if (stageNum > 7) {
            stageNum = 1;
        }
        switch (stageNum) {
            case 1:
                loadLevel(1);
                break;
            case 2:
                loadLevel(2);
                break;
            case 3:
                loadLevel(3);
                break;
            case 4:
                loadLevel(4);
                break;
            case 5:
                loadLevel(5);
                break;
            case 6:
                loadLevel(6);
                break;
            case 7:
                loadLevel(7);
                break;
        }
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
    if (e.key == "Shift") {
        shiftPress = true;
    }
    if (e.key == "l" || e.key == "L") {
        LKey = true;
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
    if (e.key == "Shift") {
        shiftPress = false;
        shiftUp = true;
    }
    if (e.key == "l" || e.key == "L") {
        LKey = false;
        LUp = true;
    }
}
function onTick(e) {
    document.getElementById("fps").innerHTML = String(createjs.Ticker.getMeasuredFPS());
    monitorKeys();
    player.update();
    for (let projectile of playerProjectilePool) {
        if (projectile.used)
            projectile.update();
    }
    for (let enemy of enemyPool) {
        if (enemy.used) {
            enemy.trackPlayer(player);
            enemy.update();
        }
    }
    for (let pickup of pickupPool) {
        if (pickup.used) {
            pickup.update();
        }
    }
    userInterface.updateHUD();
    startCollsionTimer();
    projectilePlayerCollision();
    levelManager.checkWinCondition();
    if (gameStarted == true && paused == false) {
        levelManager.checkWaveStatus();
    }
    playerInventory.update();
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
/******/ 	__webpack_require__.h = () => ("6f143a7be4a7fe348e58")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.21a02bc09f1486925371.hot-update.js.map