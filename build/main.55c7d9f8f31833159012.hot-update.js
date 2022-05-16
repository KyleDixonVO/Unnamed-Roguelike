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
    constructor(stage, assetManager, player, placeInArray) {
        super(stage, assetManager, "sprites/firstplayable/smol boi front");
        this.melee = "melee";
        this.ranged = "ranged";
        this.boss = "boss";
        this.player = player;
        this.shooting = false;
        this._enemyType = this.melee;
        this._used = false;
        this.shooting = false;
        this._state = GameCharacter_1.GameCharacter.STATE_MOVING;
        this._speed = 2;
        this.eventPlayerHit = new createjs.Event("playerHit", true, false);
        this.eventEnemyKilled = new createjs.Event("enemyKilled", true, false);
        this._arrayNumber = placeInArray;
    }
    get used() {
        return this._used;
    }
    set used(value) {
        this._used = value;
    }
    get enemyType() {
        return this._enemyType;
    }
    set enemyType(value) {
        this._enemyType = value;
    }
    get arrayNumber() {
        return this._arrayNumber;
    }
    onKilled() {
        this._state = GameCharacter_1.GameCharacter.STATE_DEAD;
        createjs.Tween.get(this._sprite, { useTicks: true }).to({ alpha: 0 }, 30).wait(10).call(() => {
            this.reset();
        });
    }
    trackPlayer(player) {
        if (this._state == GameCharacter_1.GameCharacter.STATE_PAUSED || this._state == GameCharacter_1.GameCharacter.STATE_IDLE || this._state == GameCharacter_1.GameCharacter.STATE_DEAD)
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
        this._enemyType = this.melee;
        createjs.Tween.removeTweens(this._sprite);
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
            this.sprite.dispatchEvent(this.eventPlayerHit);
        }
    }
    takeDamage(value) {
        if (this._state == GameCharacter_1.GameCharacter.STATE_DEAD || this._state == GameCharacter_1.GameCharacter.STATE_DYING || this._state == GameCharacter_1.GameCharacter.STATE_PAUSED)
            return;
        if (value <= 0 || value >= Number.MAX_SAFE_INTEGER || value <= Number.MIN_SAFE_INTEGER)
            return;
        this._health -= value;
        if (this._health < 0) {
            this._health = 0;
        }
        if (this.health == 0) {
            this.killed();
            this.stage.dispatchEvent(this.eventEnemyKilled);
        }
    }
}
exports.Enemy = Enemy;


/***/ }),

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
const LevelManager_1 = __webpack_require__(/*! ./LevelManager */ "./src/LevelManager.ts");
const PoolManager_1 = __webpack_require__(/*! ./PoolManager */ "./src/PoolManager.ts");
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
    poolManager = new PoolManager_1.PoolManager(stage, assetManager, player, playerInventory);
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
            poolManager.pause();
            break;
        case "gameUnpaused":
            if (paused == false)
                return;
            paused = false;
            console.log("recieved dispatch: gameUnpaused");
            player.unpause();
            poolManager.unpause();
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
    poolManager.projectileEnemyCollision();
}
function projectilePlayerCollision() {
    poolManager.projectilePlayerCollision();
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
    poolManager.update();
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


/***/ }),

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
        this._sprite = assetManager.getSprite("sprites", this.typeMedkit, 50, 50);
        this._hit = false;
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
        if (this._hit == true)
            return;
        if ((0, Toolkit_1.boxHit)(this._sprite, this.player.sprite)) {
            this._hit = true;
            console.log(this._pickupType);
            if (this._pickupType == this.typeMedkit) {
                this.stage.dispatchEvent(this.eventPickupMedkit);
                console.log("dispatching event: pickupMedkit");
                this.removeFromStage();
            }
            else if (this._pickupType == this.typeAmmo) {
                this.stage.dispatchEvent(this.eventPickupAmmo);
                console.log("dispatching event: pickupAmmo");
                this.removeFromStage();
            }
        }
    }
    addToStage() {
        this.checkType();
        this.stage.addChild(this._sprite);
    }
    removeFromStage() {
        this.stage.removeChild(this._sprite);
        this.reset();
    }
    randomizeType() {
        let randomize;
        console.log("randomizing");
        randomize = (0, Toolkit_1.randomMe)(0, 1);
        if (randomize == 0) {
            this._pickupType = this.typeAmmo;
        }
        else if (randomize == 1) {
            this._pickupType = this.typeMedkit;
        }
        console.log(this._pickupType);
    }
    setPostion(valueX, valueY) {
        this._sprite.x = valueX;
        this._sprite.y = valueY;
    }
    reset() {
        this._used = false;
        this._hit = false;
    }
}
exports.Pickup = Pickup;


/***/ }),

/***/ "./src/PoolManager.ts":
/*!****************************!*\
  !*** ./src/PoolManager.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PoolManager = void 0;
const Inventory_1 = __webpack_require__(/*! ./Inventory */ "./src/Inventory.ts");
const Enemy_1 = __webpack_require__(/*! ./Enemy */ "./src/Enemy.ts");
const Projectile_1 = __webpack_require__(/*! ./Projectile */ "./src/Projectile.ts");
const Tile_1 = __webpack_require__(/*! ./Tile */ "./src/Tile.ts");
const Pickup_1 = __webpack_require__(/*! ./Pickup */ "./src/Pickup.ts");
const Constants_1 = __webpack_require__(/*! ./Constants */ "./src/Constants.ts");
const Toolkit_1 = __webpack_require__(/*! ./Toolkit */ "./src/Toolkit.ts");
const GameCharacter_1 = __webpack_require__(/*! ./GameCharacter */ "./src/GameCharacter.ts");
class PoolManager {
    constructor(stage, assetManager, player, playerInventory) {
        this.enemyPool = [];
        this.enemyInventories = [];
        this.projectilePool = [];
        this.playerProjectilePool = [];
        this.tilePool = [];
        this.levelData = [];
        this.pickupPool = [];
        for (let i = 0; i < Constants_1.ENEMY_MAX; i++) {
            this.enemyPool.push(new Enemy_1.Enemy(stage, assetManager, player, i));
        }
        for (let i = 0; i < Constants_1.ENEMY_MAX; i++) {
            this.enemyInventories.push(new Inventory_1.Inventory(this.enemyPool[i]));
        }
        for (let i = 0; i < Constants_1.PROJECTILE_MAX; i++) {
            this.projectilePool.push(new Projectile_1.Projectile(stage, assetManager, "sprites/firstplayable/bullet"));
        }
        for (let i = 0; i < Constants_1.PLAYER_PROJECTILE_MAX; i++) {
            this.playerProjectilePool.push(new Projectile_1.Projectile(stage, assetManager, "sprites/firstplayable/bullet"));
            this.playerProjectilePool[i].passIn(player, playerInventory);
        }
        for (let i = 0; i < (Constants_1.HEIGHT_IN_TILES); i++) {
            this.tilePool.push(new Array());
            for (let j = 0; j < Constants_1.WIDTH_IN_TILES; j++) {
                this.tilePool[i].push(new Tile_1.Tile(stage, assetManager, "sprites/firstplayable/floor1"));
                this.tilePool[i][j].setPosition(i * 40, j * 40);
            }
        }
        for (let i = Constants_1.NUMBER_OF_LEVELS; i < Constants_1.NUMBER_OF_LEVELS; i++) {
            this.levelData.push(new Array());
            for (let j = 0; j < Constants_1.HEIGHT_IN_TILES; j++) {
                this.levelData[i].push(new Array());
                for (let k = 0; k < Constants_1.HEIGHT_IN_TILES; k++) {
                    this.levelData[i][j].fill(Constants_1.LEVEL_DATA[i][j][k]);
                }
            }
        }
        for (let i = 0; i < Constants_1.PICKUP_MAX; i++) {
            this.pickupPool.push(new Pickup_1.Pickup(stage, assetManager, player));
        }
    }
    addPlayerProjectile() {
        for (this.newProjectile of this.playerProjectilePool) {
            if (this.newProjectile.used == false) {
                this.newProjectile.used = true;
                this.newProjectile.passIn(this.player, this.playerInventory);
                this.newProjectile.activate();
                break;
            }
        }
    }
    addPickUp() {
        for (this.newPickup of this.pickupPool) {
            console.log("adding pickup");
            if (this.newPickup.used == false) {
                this.newPickup.used = true;
                this.newPickup.randomizeType();
                this.newPickup.addToStage();
                break;
            }
        }
    }
    addProjectile() {
        for (this.newProjectile of this.projectilePool) {
            if (this.newProjectile.used == false) {
                this.newProjectile.used = true;
                this.newProjectile.passIn(this.player, this.playerInventory);
                this.newProjectile.activate();
                break;
            }
        }
    }
    addEnemy() {
        for (this.newEnemy of this.enemyPool) {
            if (this.newEnemy.used == false) {
                this.newEnemy.used = true;
                this.newEnemy.addToStage();
                this.newEnemy.sprite.x = (0, Toolkit_1.randomMe)(50, 550);
                this.newEnemy.sprite.y = (0, Toolkit_1.randomMe)(50, 550);
                console.log(this.newEnemy);
                break;
            }
        }
    }
    showLevel() {
        for (let array of this.tilePool) {
            for (let tile of array) {
                tile.addToStage();
            }
        }
    }
    hideLevel() {
        for (let array of this.tilePool) {
            for (let tile of array) {
                tile.removeFromStage();
            }
        }
    }
    loadLevel(value) {
        let i = value - 1;
        for (let j = 0; j < Constants_1.HEIGHT_IN_TILES; j++) {
            for (let k = 0; k < Constants_1.WIDTH_IN_TILES; k++) {
                console.log(Constants_1.LEVEL_DATA[i][j][k]);
                this.tilePool[k][j].sprite.gotoAndStop(Constants_1.LEVEL_DATA[i][j][k]);
            }
        }
    }
    resetPools() {
        for (let enemy of this.enemyPool) {
            if (enemy.used)
                enemy.reset();
        }
        for (let projectile of this.projectilePool) {
            if (projectile.used)
                projectile.reset();
        }
        for (let projectile of this.playerProjectilePool) {
            if (projectile.used)
                projectile.reset();
        }
        for (let pickup of this.pickupPool) {
            if (pickup.used)
                pickup.reset();
        }
    }
    projectileEnemyCollision() {
        for (let projectile of this.playerProjectilePool) {
            if (!projectile.used)
                continue;
            for (let enemy of this.enemyPool) {
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
    projectilePlayerCollision() {
        for (let projectile of this.projectilePool) {
            if (!projectile.used)
                return;
            if ((0, Toolkit_1.radiusHit)(projectile.sprite, 2, this.player.sprite, 16)) {
                this.player.takeDamage(Constants_1.ALIEN_BEAM_DAMAGE);
                projectile.reset();
            }
        }
    }
    tileCollisionDetection() {
    }
    update() {
        for (let projectile of this.playerProjectilePool) {
            if (projectile.used)
                projectile.update();
        }
        for (let enemy of this.enemyPool) {
            if (enemy.used) {
                enemy.trackPlayer(this.player);
                enemy.update();
            }
        }
        for (let pickup of this.pickupPool) {
            if (pickup.used) {
                pickup.update();
            }
        }
    }
    unpause() {
        for (let projectile of this.projectilePool) {
            if (projectile.used)
                projectile.gamePaused = false;
        }
        for (let projectile of this.playerProjectilePool) {
            if (projectile.used)
                projectile.gamePaused = false;
        }
        for (let enemy of this.enemyPool) {
            if (enemy.used)
                enemy.unpause();
        }
    }
    pause() {
        for (let projectile of this.projectilePool) {
            if (projectile.used)
                projectile.gamePaused = true;
        }
        for (let projectile of this.playerProjectilePool) {
            if (projectile.used)
                projectile.gamePaused = true;
        }
        for (let enemy of this.enemyPool) {
            if (enemy.used)
                enemy.pause();
        }
    }
}
exports.PoolManager = PoolManager;


/***/ }),

/***/ "./src/Projectile.ts":
/*!***************************!*\
  !*** ./src/Projectile.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Projectile = void 0;
const Constants_1 = __webpack_require__(/*! ./Constants */ "./src/Constants.ts");
const GameCharacter_1 = __webpack_require__(/*! ./GameCharacter */ "./src/GameCharacter.ts");
const Tile_1 = __webpack_require__(/*! ./Tile */ "./src/Tile.ts");
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
        this._sprite.gotoAndStop(this.controllerInventory.currentProjectileSprite);
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
    secondaryEffect(collsionTrigger) {
        switch (this.controllerInventory.currentWeapon) {
            case Constants_1.PISTOL:
                this.reset();
                break;
            case Constants_1.LASER:
                if (collsionTrigger.type != Tile_1.Tile)
                    return;
                this._bounces++;
                if (this._bounces >= 5) {
                    this.reset();
                }
                break;
            case Constants_1.RAILGUN:
                if (collsionTrigger.type != Tile_1.Tile)
                    return;
                this.reset();
                break;
            case Constants_1.ROCKET:
                this.reset();
                break;
            case Constants_1.TESLA:
                this.reset();
                break;
            case Constants_1.ALIEN_BEAM:
                this.reset();
                break;
            default:
                this.reset();
                break;
        }
    }
}
exports.Projectile = Projectile;


/***/ }),

/***/ "./src/Tile.ts":
/*!*********************!*\
  !*** ./src/Tile.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Tile = void 0;
class Tile {
    constructor(stage, assetManager, animation) {
        this.stage = stage;
        this._sprite = assetManager.getSprite("sprites", animation);
    }
    get sprite() {
        return this._sprite;
    }
    setPosition(valueX, valueY) {
        this._sprite.x = valueX;
        this._sprite.y = valueY;
    }
    addToStage() {
        this.stage.addChild(this._sprite);
    }
    removeFromStage() {
        this.stage.removeChild(this._sprite);
    }
}
exports.Tile = Tile;


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
/******/ 	__webpack_require__.h = () => ("a1889279d8a0d633eea9")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.55c7d9f8f31833159012.hot-update.js.map