// createjs typescript definition for TypeScript
/// <reference path="./../node_modules/@types/createjs/index.d.ts" />

// importing createjs framework
import "createjs";
// importing game constants
import { STAGE_WIDTH, STAGE_HEIGHT, FRAME_RATE, ASSET_MANIFEST, ENEMY_MAX, PROJECTILE_MAX, I_FRAMES_DEFAULT, ALIEN_CONTACT_DAMAGE, PISTOL, PISTOL_DAMAGE, WIDTH_IN_TILES, HEIGHT_IN_TILES, NUMBER_OF_LEVELS, LEVEL_DATA, PLAYER_PROJECTILE_MAX, RAILGUN, LASER, ROCKET, TESLA, PICKUP_MAX} from "./Constants";
import { AssetManager } from "./AssetManager";
import { UserInterface } from "./UserInterface";
import { ScreenManager } from "./ScreenManager";
import { Player } from "./Player";
import { Enemy } from "./Enemy";
import { GameCharacter } from "./GameCharacter";
import { Projectile } from "./Projectile";
import { Inventory } from "./Inventory";
import { boxHit, radiusHit, randomMe } from "./Toolkit";
import { Tile } from "./Tile"; 
import { Pickup } from "./Pickup";
import { LevelManager } from "./LevelManager";
import { PoolManager } from "./PoolManager";
import { Settings } from "./Settings";


// game variables
let stage:createjs.StageGL;
let canvas:HTMLCanvasElement;
let assetManager:AssetManager;

let upKey:boolean = false;
let downKey:boolean = false;
let leftKey:boolean = false;
let rightKey:boolean = false;
let spacePress:boolean = false;
let escapePress:boolean = false;
let escapeUp:boolean = true;
let paused:boolean = false;
let iFramesActive:boolean = false;
let projectileTimerActive:boolean = false;
let fireDelayActive:boolean = false;
let shiftPress:boolean = false;
let shiftUp:boolean = true;
let LKey:boolean = false;
let LUp:boolean = true;
let gameStarted:boolean = false;

let weaponNum:number = 0;
let stageNum:number = 1;
let loopingProps:createjs.PlayPropsConfig;

// game objects
let player:Player;
let enemyPool:Enemy[] = [];
let enemyInventories:Inventory[] = [];
let projectilePool:Projectile[] = [];
let playerProjectilePool:Projectile[] = [];
let tilePool:Array<Array<Tile>> = [];
let levelData:Array<Array<Array<String>>> = [];
let pickupPool:Pickup[] = [];
let userInterface:UserInterface;
let screenManager:ScreenManager;
let newProjectile:Projectile;
let newEnemy:Enemy;
let newPickup:Pickup;
let newTile:Tile;
let playerInventory:Inventory;
let levelManager:LevelManager;
let poolManager:PoolManager;
let settings:Settings;
let decorations:createjs.Container;




// timers
let invincibleTimer:number;
let collisionTimer:number;
let fireDelayTimer:number;







// --------------------------------------------------- event handler
function onReady(e:createjs.Event):void {
    console.log(">> spritesheet loaded – ready to add sprites to game");

    // construct game objects here
    settings = new Settings();
    loopingProps = new createjs.PlayPropsConfig();
    loopingProps.set({loop: -1, volume: settings.volume});
    screenManager = new ScreenManager(stage, assetManager);
    
    levelManager = new LevelManager(stage);

    player = new Player(stage, assetManager);

    playerInventory = new Inventory(player);

    userInterface = new UserInterface(stage, assetManager, player, screenManager, playerInventory, settings, levelManager);

    newTile = new Tile(stage, assetManager, "");
    
    //enemy pool
    for (let i:number =0; i < ENEMY_MAX; i++){
        enemyPool.push(new Enemy(stage, assetManager, player, i));
    }

    //enemy inventories
    for (let i:number = 0; i < ENEMY_MAX; i++){
        enemyInventories.push(new Inventory(enemyPool[i]));
    }

    //projectile pool
    for (let i:number =0; i < PROJECTILE_MAX; i++){
        projectilePool.push(new Projectile(stage, assetManager, "sprites/firstplayable/bullet"));
    }

    //playerProjectile pool
    for (let i:number =0; i < PLAYER_PROJECTILE_MAX; i++){
        playerProjectilePool.push(new Projectile(stage, assetManager, "sprites/firstplayable/bullet"));
        playerProjectilePool[i].passIn(player, playerInventory);
    }

    //tile pool
    for (let i:number = 0; i < (HEIGHT_IN_TILES); i++){
        tilePool.push(new Array<any>());
        for (let j:number = 0; j < WIDTH_IN_TILES; j++){
            tilePool[i].push( new Tile(stage, assetManager, "sprites/firstplayable/floor1"));
            tilePool[i][j].setPosition(i * 40, j * 40);
        }
    }

    //level data
    for (let i:number = NUMBER_OF_LEVELS; i < NUMBER_OF_LEVELS; i++){
        levelData.push(new Array<any>());
        for (let j:number =  0; j < HEIGHT_IN_TILES; j++ ){
            levelData[i].push(new Array<any>());
            for (let k:number = 0; k < HEIGHT_IN_TILES; k++){
                levelData[i][j].fill(LEVEL_DATA[i][j][k]);
            }
        }
    }

    //pickup pool
    for (let i:number = 0; i < PICKUP_MAX; i++){
        pickupPool.push(new Pickup(stage, assetManager, player));
    }

    //listen for custom game events
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

    // startup the ticker
    createjs.Ticker.framerate = FRAME_RATE;
    createjs.Ticker.on("tick", onTick);        
    console.log(">> game ready");
    screenManager.showTitleScreen();
}

function onGameEvent(e:createjs.Event):void {
    //console.log("target:" + e.target);
    //console.log("current target:" + e.currentTarget);
    //console.log("called onGameEvent");
    switch (e.type) {
        case "playerKilled":
            userInterface.removeAll();
            player.removeFromStage();
            hideLevel();
            resetPools();
            screenManager.showGameOverScreen();
            createjs.Sound.stop();
            break;
    

        case "playerHit":
            if (iFramesActive == true) return;
                iFramesActive = true;
                player.takeDamage(ALIEN_CONTACT_DAMAGE);
                invincibleTimer = window.setInterval(onInvincibleTimer, I_FRAMES_DEFAULT);
                createjs.Sound.play("PlayerDamage", {volume: settings.volume});  
            break;


        case "enemyKilled":
            console.log("received dispatch: enemyKilled");
            levelManager.defeatedEnemies++;
            console.log("defeated enemies: " + levelManager.defeatedEnemies);
            levelManager.readyToSpawn = true;
            userInterface.incrementScore();
            userInterface.updateHUD();
            createjs.Sound.play("EnemyDeath", {volume: settings.volume});
            let rng = randomMe(1, 20);
            console.log("rng:" + rng);
            if (rng == 20){
                spawnPickup();
            }
            break;
        

        case "gameStarted":
            console.log("received dispatch: gameStarted ");
            screenManager.showGame();
            showLevel();
            screenManager.dispatchNextLevel();
            player.addToStage();
            player.startMovement();

            console.log("player state on game start: " + player.state);
            userInterface.showPlayerHUD();
            //addPickUp();
            gameStarted = true;
            paused = false;
            createjs.Sound.stop();
            createjs.Sound.play("Combat", loopingProps);
            break;


        case "gameReset":
            console.log("recieved dispatch: gameReset");
            player.reset();
            player.removeFromStage();
            stage.removeChild(player.weaponSprite);
            userInterface.reset();
            hideLevel();
            levelManager.reset();
            gameStarted == false;
            resetPools();
            screenManager.showTitleScreen();
            playerInventory.refillAmmo();
            break;
        

        case "titleActive":
            createjs.Sound.stop();
            resetPools();
            console.log("received dispatch: titleActive ");
            hideLevel();
            createjs.Sound.play("MainMenu", loopingProps);
            userInterface.showStartMenu();
            userInterface.onStartClick();
            userInterface.onSettingsClick();
            paused = false;
            gameStarted = false;
            break;
        

        case "gameWin":
            resetPools();
            gameStarted = false;
            paused = true;
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
            createjs.Sound.play("Pause", {volume: settings.volume});
            paused = true;
            break;


        case "closeSettings":
            console.log("recieved dispatch: closeSettings");
            userInterface.hideSettingsMenu();
            screenManager.unpauseGame();
            createjs.Sound.play("Unpause", {volume: settings.volume});
            paused = false;
            break;
        

        case "gamePaused":
            if (paused == true) return;
            paused = true;
            console.log("recieved dispatch: gamePaused");
            player.pause();
            for (let projectile of projectilePool)
            {
                if (projectile.used) projectile.gamePaused = true;
            }

            for (let projectile of playerProjectilePool)
            {
                if (projectile.used) projectile.gamePaused = true;
            }

            for (let enemy of enemyPool)
            {
                if (enemy.used) enemy.pause();
            }
            break;
        

        case "gameUnpaused":
            if (paused == false) return;
            paused = false;
            console.log("recieved dispatch: gameUnpaused");
            player.unpause();
            for (let projectile of projectilePool)
            {
                if (projectile.used) projectile.gamePaused = false;
            }

            for (let projectile of playerProjectilePool)
            {
                if (projectile.used) projectile.gamePaused = false;
            }

            for (let enemy of enemyPool)
            {
                if (enemy.used) enemy.unpause();
            }
            break;
        
        case "pickupMedkit":
            console.log("received dispatch: pickupHealth");
            player.heal();
            createjs.Sound.play("Heal", {volume: settings.volume});
            break;
        
        case "pickupAmmo":
            console.log("received dispatch: pickupAmmo");
            playerInventory.refillAmmo();
            createjs.Sound.play("Ammo", {volume: settings.volume});
            break;
        
        case "spawnWave":
            console.log("received dispatch: spawnWave");
            console.log("enemies spawned: " + levelManager.enemiesSpawned, "levelmanager threshold: " + levelManager.threshold);
            if (levelManager.enemiesSpawned > levelManager.threshold) return;
            for (let i = 0; i < levelManager.activeLevel; i++){
                console.log("spawning enemy");
                onAddEnemy();
                levelManager.enemiesSpawned++;
            }
            break;
        
        case "completeLevel":
            console.log("received dispatch: completeLevel");
            if (levelManager.activeLevel >= 4){
                console.log("game.ts dispatching winScreen");
                screenManager.dispatchWinScreen();
                resetPools();
                return;
            }
            else{
                screenManager.showLevelComplete();
                player.pause();
                levelManager.resetForNextLevel();
                resetPools();
                gameStarted = false;
            }
            break;
        
        case "loadNextLevel":
            console.log("received dispatch: loadNextLevel");
            console.log("active level: " + levelManager.activeLevel);
            resetPools();
            screenManager.showGame();
            player.unpause();
            showLevel();
            loadLevel(levelManager.activeLevel);
            player.addToStage();
            setPlayerSpawn();
            player.startMovement();
            gameStarted = true;

            //console.log(player.state);
            userInterface.showPlayerHUD();
            break;
    }
}

function addProjectile():void{
    if (paused == true || player.state == GameCharacter.STATE_DEAD || gameStarted == false) return;
    if (playerInventory.currentWeaponAmmo == 0) return;
    for (newProjectile of playerProjectilePool){
        if (newProjectile.used == false){
            newProjectile.used = true;
            newProjectile.passIn(player, playerInventory);
            newProjectile.activate();
            playerInventory.decrementAmmo();
            createjs.Sound.play(playerInventory.currentWeaponSound, {volume: settings.volume});
            break;
        }
    }
}

function addPickUp():void{
    if (paused == true) return;
    
    for (newPickup of pickupPool){
        console.log("adding pickup");
        if (newPickup.used == false){
            newPickup.used = true;
            newPickup.randomizeType();
            newPickup.addToStage();
            break;
        }
    }
}

function startFireDelayTimer():void{
    if (fireDelayActive == true) return;
    fireDelayActive = true;
    addProjectile();
    fireDelayTimer = window.setInterval(onFireDelayTimer, playerInventory.fireDelay);
}

function onFireDelayTimer():void{
    fireDelayActive = false;
    window.clearInterval(fireDelayTimer);
}

function addEnemyProjectile():void{
    if (paused == true || player.state == GameCharacter.STATE_IDLE) return;
    for (newProjectile of projectilePool){
        if (newProjectile.used == false){
            newProjectile.used = true;
            newProjectile.passIn(player, playerInventory);
            newProjectile.activate();
            break;
        }
    }
}

function setPlayerSpawn():void{
    let maxX:number;
    let minX:number;
    let maxY:number;
    let minY:number;

    switch (levelManager.activeLevel){
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
    player.sprite.x = randomMe(minX, maxX);
    player.weaponSprite.x = player.sprite.x;
    player.sprite.y = randomMe(minY, maxY);
    player.weaponSprite.y = player.sprite.y;
}

function spawnPickup():void{

    let maxX:number;
    let minX:number;
    let maxY:number;
    let minY:number;

    switch (levelManager.activeLevel){
        case 1:
          minX = 100;
          maxX = 300;
          minY = 150;
          maxY = 300;  
        break;

        case 2:
            minX = 200;
            maxX = 350;
            minY = 125;
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
            minY = 200;
            maxY = 450;
        break;

        case 5:
        
        break;

        case 6:

        break;

        case 7:

        break;
    }

    for (let pickup of pickupPool){
        if (!pickup.used){
            pickup.onDrop(randomMe(minX, maxX), randomMe(minY, maxY));
        }
    }
}


function onAddEnemy():void{
    if (paused == true) return;
    for (newEnemy of enemyPool){
        if (newEnemy.used == false){
            newEnemy.used = true;
            newEnemy.addToStage();
            let maxX:number;
            let minX:number;
            let maxY:number;
            let minY:number;

            switch (levelManager.activeLevel){
                case 1:
                  minX = 100;
                  maxX = 300;
                  minY = 150;
                  maxY = 300;  
                break;

                case 2:
                    minX = 200;
                    maxX = 350;
                    minY = 125;
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
                    minY = 200;
                    maxY = 450;
                break;

                case 5:
                
                break;

                case 6:

                break;

                case 7:

                break;
            }
            newEnemy.sprite.x = randomMe(minX, maxX);
            newEnemy.sprite.y = randomMe(minY, maxY);
            console.log(newEnemy);
            break;
        }
    }
}

function showLevel():void{
    for (let array of tilePool){
        for (let tile of array){
            tile.addToStage();
        }
    }
}

function hideLevel():void{
    for (let array of tilePool){
        for (let tile of array){
            tile.removeFromStage();
        }
    }
}

function loadLevel(value:number):void{
    let i = value - 1;
    for (let j:number =  0; j < HEIGHT_IN_TILES; j++ ){
        for (let k:number = 0; k < WIDTH_IN_TILES; k++){
            //console.log(LEVEL_DATA[i][j][k]);
            tilePool[k][j].sprite.gotoAndStop(LEVEL_DATA[i][j][k]);
        }
    }
}

function resetPools():void{
    for (let enemy of enemyPool){
        if (enemy.used) enemy.reset();
    }

    for (let projectile of projectilePool){
        if (projectile.used) projectile.reset();
    }

    for (let projectile of playerProjectilePool){
        if (projectile.used) projectile.reset();
    }

    for (let pickup of pickupPool){
        if (pickup.used) pickup.reset();
    }

}

function onInvincibleTimer():void{
    window.clearInterval(invincibleTimer);
    iFramesActive = false;
    console.log("I frames no longer active");
}

function startCollsionTimer():void{
    if (projectileTimerActive == true) return;
    projectileTimerActive = true;
    collisionTimer = window.setInterval(onCollsionTimer, 3);
}

function onCollsionTimer():void{
    projectileTimerActive = false;
    //window.clearInterval(collisionTimer);
    projectileEnemyCollision();
}

function projectileEnemyCollision(){
    for (let projectile of playerProjectilePool){
        if (!projectile.used) continue;
        for (let enemy of enemyPool){
            if (!enemy.used) continue;
            //console.log(enemy);
            //console.log("enemy state: " + enemy.state);
            if (radiusHit( enemy.sprite, 16, projectile.sprite, 2)){
                if (enemy.state == GameCharacter.STATE_DEAD || enemy.state == GameCharacter.STATE_DYING || enemy.state == GameCharacter.STATE_IDLE) continue;
                console.log("hit!");
                enemy.takeDamage(projectile.damage);
                projectile.secondaryEffect(enemy);
                createjs.Sound.play("EnemyHurt", {volume: settings.volume});
            }
        }

    }
}

function projectilePlayerCollision(){
    for (let projectile of projectilePool){
        if (!projectile.used) return;
        if (radiusHit(projectile.sprite, 2, player.sprite, 16)){
            player.takeDamage(PISTOL_DAMAGE);
            projectile.reset();
        }

    }
}

function tileCollisionDetection(){

    for (let tile of tilePool){
        for (let i = 0; i < WIDTH_IN_TILES; i++){
            if (tile[i].sprite.currentAnimation == "sprites/firstplayable/floor1") continue;
            for (let enemy of enemyPool){
                if (!enemy.used) continue;
                if (boxHit(enemy.sprite, tile[i].sprite)){
                    enemy.colliding = true;
                    enemy.returnToLastPosition();
                }
            }

            // for (let projectile of projectilePool){
            //     if (!projectile.used) continue;
            //     if (boxHit(projectile.sprite, tile[i].sprite)){
            //         //needs behaviours
            //     }
            // }

            for (let projectile of playerProjectilePool){
                if (!projectile.used) continue;
                if (boxHit(projectile.sprite, tile[i].sprite)){
                    console.log("projectile hit a wall");
                    projectile.secondaryEffect(newTile);
                }
            }

            if (boxHit (player.sprite, tile[i].sprite)){
                player.colliding = true;
                player.returnToLastPosition();
            }
        }

    }

}

function enemyEnemyCollision(){
    for (let enemy of enemyPool){
        if (!enemy.used) continue;
        for (let enemy2 of enemyPool){
            if (!enemy2.used) continue;
            if (enemy.arrayNumber == enemy2.arrayNumber) continue;
            if (boxHit(enemy.sprite, enemy2.sprite)){
                enemy.returnToLastPosition();
            }
        }
    }
}

function playerEnemyCollision(){
    for (let enemy of enemyPool){
        if (!enemy.used) continue;
        if (boxHit(enemy.sprite, player.sprite)){
            player.returnToLastPosition();
        }
    }
}

function monitorKeys():void {
    if (upKey == true){
        player.direction = GameCharacter.DIR_UP;
        //console.log("W");
    }

    if (downKey == true){
        player.direction = GameCharacter.DIR_DOWN;
        //console.log("S");
    }

    if (leftKey == true){
        player.direction = GameCharacter.DIR_LEFT;
        //console.log("A");
    }

    if (rightKey == true){
        player.direction = GameCharacter.DIR_RIGHT;
        //console.log("D");
    }

    if (rightKey == false && leftKey == false && upKey == false && downKey == false){
        player.direction = GameCharacter.DIR_NEUTRAL;
        //console.log("No Input");
    }

    if (spacePress == true){      
        //console.log("Fired a projectile!");
        startFireDelayTimer();
    }

    if (shiftPress == true){
        console.log("attempting weapon swap");
        if (shiftUp == false || paused == true) return;
        console.log("changing weapons");
        shiftUp = false;
        weaponNum ++;
        if (weaponNum > 2){
            weaponNum = 0;
        }
        switch (weaponNum){
            case 0:
                playerInventory.currentWeapon = PISTOL;
                break;
            case 1:
                playerInventory.currentWeapon = LASER;
                break;
            case 2:
                playerInventory.currentWeapon = RAILGUN;
                break;
            // case 3:
            //     playerInventory.currentWeapon = ROCKET;
            //     break;
            // case 4:
            //     playerInventory.currentWeapon = RAILGUN;
            //     break;

        }
    }

    if (LKey == true){
        console.log("attempting stage swap");
        if (LUp == false || paused == true) return;
        console.log("changing stage");
        LUp = false;
        stageNum++;
        if (stageNum > 7){
            stageNum = 1;
        }
        switch (stageNum){
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

    if (escapePress == true){
        if (escapeUp == true) return;
        if (paused == true) return;
        console.log("escape toggle active");
        screenManager.openSettings();
    }

    if (escapePress == false){
        if (escapeUp == true) return;
        if (paused == false) return;
        console.log("escape toggle inactive");
        screenManager.closeSettings();
    }
}

//keystroke listeners
document.onkeydown = onKeyDown;
document.onkeyup = onKeyUp;

function onKeyDown(e:KeyboardEvent):void {

   
       
    if (e.key == 'w'|| e.key == 'W'){
        upKey = true;
    }
    else if (e.key == 's' || e.key == 'S'){
        downKey = true;
    }
    else if (e.key == 'a' || e.key == 'A'){
        leftKey = true;
    }
    else if (e.key == 'd' || e.key == 'D'){
        rightKey = true;  
    }
    
    if (e.key == " "){
        spacePress = true;
    }

    if (e.key == "Escape"){
        if (escapeUp = true){
            escapePress = !escapePress;
        }
        
        escapeUp = false;
    }

    if (e.key == "Shift"){
        shiftPress = true;
    }

    if (e.key == "l" || e.key == "L"){
        LKey = true;
    }


}

function onKeyUp(e:KeyboardEvent):void {
    if (e.key == 'w'|| e.key == 'W'){
        upKey = false;
    }
    else if (e.key == 's' || e.key == 'S'){
        downKey = false;
    }
    else if (e.key == 'a' || e.key == 'A'){
        leftKey = false;
    }
    else if (e.key == 'd' || e.key == 'D'){
        rightKey = false;
    }
    
    if(e.key == " "){
        spacePress = false;
    }

    if (e.key == "Escape"){
        escapeUp = true;
    }

    if (e.key == "Shift"){
        shiftPress = false;
        shiftUp = true;
    }

    if (e.key == "l" || e.key == "L"){
        LKey = false;
        LUp = true;
    }
    
}

function onTick(e:createjs.Event) {
    // console.log("TICK!");
    document.getElementById("fps").innerHTML = String(createjs.Ticker.getMeasuredFPS());

    // this is your game loop!
    // ...
    if (player.colliding == false){
        player.setLastPosition();
    }
    monitorKeys();
    player.update();

    for (let enemy of enemyPool){
        if (enemy.used && enemy.colliding == false){
            enemy.setLastPosition();
        }
    }

    for (let projectile of playerProjectilePool)
    {
        if (projectile.used) projectile.update();
    }

    for (let enemy of enemyPool)
    {
        if (enemy.used) {
            enemy.trackPlayer(player);
            enemy.update();
        }
    }

    for (let pickup of pickupPool){
        if(pickup.used){
            pickup.update();
        }
    }

    userInterface.updateHUD();
    startCollsionTimer();
    //projectilePlayerCollision();
    tileCollisionDetection();
    enemyEnemyCollision();
    playerEnemyCollision();
    settings.update(userInterface.volume);
    loopingProps.set({volume: settings.volume});
    
    levelManager.checkWinCondition();
    //console.log(paused, gameStarted);
    if (gameStarted == true && paused == false){
        //console.log("update checking wave");
        levelManager.checkWaveStatus();
    }
    playerInventory.update();
    playerInventory.WeaponSpriteDirection(player);

    // update the stage
    console.log("escape press: " + escapePress, "\ngame started: " + gameStarted, "\npaused: " + paused, "\nplayer state: " + player.state);
    stage.update();
}

// --------------------------------------------------- main method
function main():void {
    // get reference to canvas
    canvas = <HTMLCanvasElement> document.getElementById("game-canvas");
    // set canvas width and height - this will be the stage size
    canvas.width = STAGE_WIDTH;
    canvas.height = STAGE_HEIGHT;    

    // create stage object
    stage = new createjs.StageGL(canvas, { antialias: true });
    stage.enableMouseOver(10);

    // AssetManager setup
    assetManager = new AssetManager(stage);
    stage.on("allAssetsLoaded", onReady, null, true);
    // load the assets
    assetManager.loadAssets(ASSET_MANIFEST);
}

main();