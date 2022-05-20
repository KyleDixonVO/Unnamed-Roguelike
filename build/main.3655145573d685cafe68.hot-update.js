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
const Tile_1 = __webpack_require__(/*! ./Tile */ "./src/Tile.ts");
const Pickup_1 = __webpack_require__(/*! ./Pickup */ "./src/Pickup.ts");
const LevelManager_1 = __webpack_require__(/*! ./LevelManager */ "./src/LevelManager.ts");
const Settings_1 = __webpack_require__(/*! ./Settings */ "./src/Settings.ts");
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
let loopingProps;
let player;
let enemyPool = [];
let enemyInventories = [];
let projectilePool = [];
let playerProjectilePool = [];
let tilePool = [];
let levelData = [];
let pickupPool = [];
let userInterface;
let screenManager;
let newProjectile;
let newEnemy;
let newPickup;
let newTile;
let playerInventory;
let levelManager;
let poolManager;
let settings;
let invincibleTimer;
let collisionTimer;
let fireDelayTimer;
function onReady(e) {
    console.log(">> spritesheet loaded – ready to add sprites to game");
    settings = new Settings_1.Settings();
    loopingProps = new createjs.PlayPropsConfig();
    loopingProps.set({ loop: -1, volume: settings.volume });
    screenManager = new ScreenManager_1.ScreenManager(stage, assetManager);
    levelManager = new LevelManager_1.LevelManager(stage);
    player = new Player_1.Player(stage, assetManager);
    playerInventory = new Inventory_1.Inventory(player);
    userInterface = new UserInterface_1.UserInterface(stage, assetManager, player, screenManager, playerInventory, settings, levelManager);
    newTile = new Tile_1.Tile(stage, assetManager, "");
    for (let i = 0; i < Constants_1.ENEMY_MAX; i++) {
        enemyPool.push(new Enemy_1.Enemy(stage, assetManager, player, i));
    }
    for (let i = 0; i < Constants_1.ENEMY_MAX; i++) {
        enemyInventories.push(new Inventory_1.Inventory(enemyPool[i]));
    }
    for (let i = 0; i < Constants_1.PROJECTILE_MAX; i++) {
        projectilePool.push(new Projectile_1.Projectile(stage, assetManager, "sprites/firstplayable/bullet"));
    }
    for (let i = 0; i < Constants_1.PLAYER_PROJECTILE_MAX; i++) {
        playerProjectilePool.push(new Projectile_1.Projectile(stage, assetManager, "sprites/firstplayable/bullet"));
        playerProjectilePool[i].passIn(player, playerInventory);
    }
    for (let i = 0; i < (Constants_1.HEIGHT_IN_TILES); i++) {
        tilePool.push(new Array());
        for (let j = 0; j < Constants_1.WIDTH_IN_TILES; j++) {
            tilePool[i].push(new Tile_1.Tile(stage, assetManager, "sprites/firstplayable/floor1"));
            tilePool[i][j].setPosition(i * 40, j * 40);
        }
    }
    for (let i = Constants_1.NUMBER_OF_LEVELS; i < Constants_1.NUMBER_OF_LEVELS; i++) {
        levelData.push(new Array());
        for (let j = 0; j < Constants_1.HEIGHT_IN_TILES; j++) {
            levelData[i].push(new Array());
            for (let k = 0; k < Constants_1.HEIGHT_IN_TILES; k++) {
                levelData[i][j].fill(Constants_1.LEVEL_DATA[i][j][k]);
            }
        }
    }
    for (let i = 0; i < Constants_1.PICKUP_MAX; i++) {
        pickupPool.push(new Pickup_1.Pickup(stage, assetManager, player));
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
    stage.on("enemyKilled", onGameEvent);
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
    console.log("target:" + e.target);
    console.log("current target:" + e.currentTarget);
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
            createjs.Sound.play("PlayerDamage", { volume: settings.volume });
            break;
        case "enemyKilled":
            console.log("received dispatch: enemyKilled");
            levelManager.defeatedEnemies++;
            console.log(levelManager.defeatedEnemies);
            levelManager.readyToSpawn = true;
            userInterface.incrementScore();
            userInterface.updateHUD();
            createjs.Sound.play("EnemyDeath", { volume: settings.volume });
            let rng = (0, Toolkit_1.randomMe)(1, 20);
            console.log("rng:" + rng);
            if (rng == 20) {
                for (let pickup of pickupPool) {
                    if (!pickup.used) {
                        pickup.onDrop(100, 100);
                    }
                }
            }
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
            createjs.Sound.stop();
            createjs.Sound.play("Combat", loopingProps);
            break;
        case "gameReset":
            player.reset();
            userInterface.reset();
            hideLevel();
            screenManager.showTitleScreen();
            levelManager.reset();
            gameStarted == false;
            resetPools();
            break;
        case "titleActive":
            resetPools();
            console.log("received dispatch: titleActive ");
            hideLevel();
            createjs.Sound.play("MainMenu", loopingProps);
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
            createjs.Sound.stop();
            createjs.Sound.play("MainMenuAlt", loopingProps);
            break;
        case "openSettings":
            console.log("recieved dispatch: openSettings");
            screenManager.pauseGame();
            userInterface.showSettingsMenu();
            createjs.Sound.play("Pause", { volume: settings.volume });
            break;
        case "closeSettings":
            console.log("recieved dispatch: closeSettings");
            userInterface.hideSettingsMenu();
            screenManager.unpauseGame();
            createjs.Sound.play("Unpause", { volume: settings.volume });
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
            createjs.Sound.play("Heal", { volume: settings.volume });
            break;
        case "pickupAmmo":
            console.log("received dispatch: pickupAmmo");
            playerInventory.refillAmmo();
            createjs.Sound.play("Ammo", { volume: settings.volume });
            break;
        case "spawnWave":
            console.log("received dispatch: spawnWave");
            console.log(levelManager.enemiesSpawned, levelManager.threshold);
            if (levelManager.enemiesSpawned > levelManager.threshold)
                return;
            for (let i = 0; i < levelManager.activeLevel; i++) {
                console.log("spawning enemy");
                onAddEnemy();
                levelManager.enemiesSpawned++;
            }
            break;
        case "completeLevel":
            console.log("received dispatch: completeLevel");
            screenManager.showLevelComplete();
            player.pause();
            levelManager.resetForNextLevel();
            resetPools();
            gameStarted = false;
            break;
        case "loadNextLevel":
            console.log("received dispatch: loadNextLevel");
            resetPools();
            screenManager.showGame();
            player.unpause();
            showLevel();
            loadLevel(levelManager.activeLevel);
            player.addToStage();
            setPlayerSpawn();
            player.startMovement();
            gameStarted = true;
            console.log(player.state);
            userInterface.showPlayerHUD();
            if (levelManager.activeLevel >= 4) {
                screenManager.dispatchWinScreen();
            }
            break;
    }
}
function addProjectile() {
    if (escapePress == true || player.state == GameCharacter_1.GameCharacter.STATE_DEAD || gameStarted == false)
        return;
    if (playerInventory.currentWeaponAmmo == 0)
        return;
    for (newProjectile of playerProjectilePool) {
        if (newProjectile.used == false) {
            newProjectile.used = true;
            newProjectile.passIn(player, playerInventory);
            newProjectile.activate();
            playerInventory.decrementAmmo();
            createjs.Sound.play(playerInventory.currentWeaponSound, { volume: settings.volume });
            break;
        }
    }
}
function addPickUp() {
    if (escapePress == true)
        return;
    for (newPickup of pickupPool) {
        console.log("adding pickup");
        if (newPickup.used == false) {
            newPickup.used = true;
            newPickup.randomizeType();
            newPickup.addToStage();
            break;
        }
    }
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
    if (escapePress == true || player.state == GameCharacter_1.GameCharacter.STATE_IDLE)
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
function setPlayerSpawn() {
    let maxX;
    let minX;
    let maxY;
    let minY;
    switch (levelManager.activeLevel) {
        case 1:
            minX = 300;
            maxX = 300;
            minY = 300;
            maxY = 300;
            break;
        case 2:
            minX = 400;
            maxX = 400;
            minY = 300;
            maxY = 300;
            break;
        case 3:
            minX = 300;
            maxX = 300;
            minY = 200;
            maxY = 200;
            break;
        case 4:
            minX = 300;
            maxX = 300;
            minY = 300;
            maxY = 300;
            break;
        case 5:
            break;
        case 6:
            break;
        case 7:
            break;
    }
    player.sprite.x = (0, Toolkit_1.randomMe)(minX, maxX);
    player.sprite.y = (0, Toolkit_1.randomMe)(minY, maxY);
}
function onAddEnemy() {
    if (escapePress == true)
        return;
    for (newEnemy of enemyPool) {
        if (newEnemy.used == false) {
            newEnemy.used = true;
            newEnemy.addToStage();
            let maxX;
            let minX;
            let maxY;
            let minY;
            switch (levelManager.activeLevel) {
                case 1:
                    minX = 100;
                    maxX = 300;
                    minY = 150;
                    maxY = 300;
                    break;
                case 2:
                    minX = 200;
                    maxX = 350;
                    minY = 100;
                    maxY = 250;
                    break;
                case 3:
                    minX = 200;
                    maxX = 350;
                    minY = 400;
                    maxY = 500;
                    break;
                case 4:
                    minX = 150;
                    maxX = 450;
                    minY = 150;
                    maxY = 450;
                    break;
                case 5:
                    break;
                case 6:
                    break;
                case 7:
                    break;
            }
            newEnemy.sprite.x = (0, Toolkit_1.randomMe)(minX, maxX);
            newEnemy.sprite.y = (0, Toolkit_1.randomMe)(minY, maxY);
            console.log(newEnemy);
            break;
        }
    }
}
function showLevel() {
    for (let array of tilePool) {
        for (let tile of array) {
            tile.addToStage();
        }
    }
}
function hideLevel() {
    for (let array of tilePool) {
        for (let tile of array) {
            tile.removeFromStage();
        }
    }
}
function loadLevel(value) {
    let i = value - 1;
    for (let j = 0; j < Constants_1.HEIGHT_IN_TILES; j++) {
        for (let k = 0; k < Constants_1.WIDTH_IN_TILES; k++) {
            console.log(Constants_1.LEVEL_DATA[i][j][k]);
            tilePool[k][j].sprite.gotoAndStop(Constants_1.LEVEL_DATA[i][j][k]);
        }
    }
}
function resetPools() {
    for (let enemy of enemyPool) {
        if (enemy.used)
            enemy.reset();
    }
    for (let projectile of projectilePool) {
        if (projectile.used)
            projectile.reset();
    }
    for (let projectile of playerProjectilePool) {
        if (projectile.used)
            projectile.reset();
    }
    for (let pickup of pickupPool) {
        if (pickup.used)
            pickup.reset();
    }
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
                createjs.Sound.play("EnemyHurt", { volume: settings.volume });
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
    for (let tile of tilePool) {
        for (let i = 0; i < Constants_1.WIDTH_IN_TILES; i++) {
            if (tile[i].sprite.currentAnimation == "sprites/firstplayable/floor1")
                continue;
            for (let enemy of enemyPool) {
                if (!enemy.used)
                    continue;
                if ((0, Toolkit_1.boxHit)(enemy.sprite, tile[i].sprite)) {
                    enemy.colliding = true;
                    enemy.returnToLastPosition();
                }
            }
            for (let projectile of playerProjectilePool) {
                if (!projectile.used)
                    continue;
                if ((0, Toolkit_1.boxHit)(projectile.sprite, tile[i].sprite)) {
                    console.log("projectile hit a wall");
                    projectile.secondaryEffect(newTile);
                }
            }
            if ((0, Toolkit_1.boxHit)(player.sprite, tile[i].sprite)) {
                player.colliding = true;
                player.returnToLastPosition();
            }
        }
    }
}
function enemyEnemyCollision() {
    for (let enemy of enemyPool) {
        if (!enemy.used)
            continue;
        for (let enemy2 of enemyPool) {
            if (!enemy2.used)
                continue;
            if (enemy.arrayNumber == enemy2.arrayNumber)
                continue;
            if ((0, Toolkit_1.boxHit)(enemy.sprite, enemy2.sprite)) {
                enemy.returnToLastPosition();
            }
        }
    }
}
function playerEnemyCollision() {
    for (let enemy of enemyPool) {
        if (!enemy.used)
            continue;
        if ((0, Toolkit_1.boxHit)(enemy.sprite, player.sprite)) {
            player.returnToLastPosition();
        }
    }
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
        if (weaponNum > 2) {
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
    if (player.colliding == false) {
        player.setLastPosition();
    }
    monitorKeys();
    player.update();
    for (let enemy of enemyPool) {
        if (enemy.used && enemy.colliding == false) {
            enemy.setLastPosition();
        }
    }
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
    tileCollisionDetection();
    enemyEnemyCollision();
    playerEnemyCollision();
    levelManager.checkWinCondition();
    if (gameStarted == true && paused == false) {
        levelManager.checkWaveStatus();
    }
    playerInventory.update();
    playerInventory.WeaponSpriteDirection(player);
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
/******/ 	__webpack_require__.h = () => ("7b785fdea345c0ead08d")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.3655145573d685cafe68.hot-update.js.map