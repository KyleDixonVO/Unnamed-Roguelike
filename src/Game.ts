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

let weaponNum:number = 0;
let stageNum:number = 1;

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
let playerInventory:Inventory;
let bank:Inventory;



// timers
let invincibleTimer:number;
let collisionTimer:number;
let fireDelayTimer:number;
let reloadTimer:number;







// --------------------------------------------------- event handler
function onReady(e:createjs.Event):void {
    console.log(">> spritesheet loaded – ready to add sprites to game");

    // construct game objects here
    screenManager = new ScreenManager(stage, assetManager);
    
    

    player = new Player(stage, assetManager);

    playerInventory = new Inventory(player);

    userInterface = new UserInterface(stage, assetManager, player, screenManager, playerInventory);
    
    //enemy pool
    for (let i:number =0; i < ENEMY_MAX; i++){
        enemyPool.push(new Enemy(stage, assetManager, player));
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

    // startup the ticker
    createjs.Ticker.framerate = FRAME_RATE;
    createjs.Ticker.on("tick", onTick);        
    console.log(">> game ready");
    screenManager.showTitleScreen();
}

function onGameEvent(e:createjs.Event):void {

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
            if (iFramesActive == true) return;
                iFramesActive = true;
                player.takeDamage(ALIEN_CONTACT_DAMAGE);
                invincibleTimer = window.setInterval(onInvincibleTimer, I_FRAMES_DEFAULT);   
            break;


        case "enemyKilled":
            console.log("received dispatch: enemyKilled");
            userInterface.incrementScore();
            userInterface.updateHUD();
            break;
        

        case "gameStarted":
            console.log("received dispatch: gameStarted ");
            screenManager.showGame();
            showLevel();
            loadLevel(1);
            player.addToStage();
            player.startMovement();

            console.log(player.state);
            userInterface.showPlayerHUD();
            addPickUp();
            onAddEnemy();
            // onAddEnemy();
            // onAddEnemy();
            // onAddEnemy();
            break;


        case "gameReset":
            player.reset();
            userInterface.reset();
            hideLevel();
            screenManager.showTitleScreen();
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
            break;
        
        case "pickupAmmo":
            console.log("received dispatch: pickupAmmo");
            playerInventory.refillAmmo();
            break;
    }
}

function addProjectile():void{
    if (escapePress == true || player.state == GameCharacter.STATE_DEAD || player.state == GameCharacter.STATE_IDLE) return;
    if (playerInventory.currentWeaponAmmo == 0) return;
    playerInventory.decrementAmmo();
    for (newProjectile of playerProjectilePool){
        if (newProjectile.used == false){
            newProjectile.used = true;
            newProjectile.passIn(player, playerInventory);
            newProjectile.activate();
            break;
        }
    }
}

function addPickUp():void{
    if (escapePress == true) return;
    
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
    if (escapePress == true || player.state == GameCharacter.STATE_IDLE) return;
    for (newProjectile of projectilePool){
        if (newProjectile.used == false){
            newProjectile.used = true;
            newProjectile.passIn(player, playerInventory);
            newProjectile.activate();
            break;
        }
    }
}


function onAddEnemy():void{
    if (escapePress == true) return;
    for (newEnemy of enemyPool){
        if (newEnemy.used == false){
            newEnemy.used = true;
            newEnemy.addToStage();
            newEnemy.sprite.x = randomMe(50, 550);
            newEnemy.sprite.y = randomMe(50, 550);
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
            console.log(LEVEL_DATA[i][j][k]);
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
        if (!projectile.used) return;
        for (let enemy of enemyPool){
            if (!enemy.used) return;
            if (radiusHit( enemy.sprite, 16, projectile.sprite, 2)){
                enemy.takeDamage(projectile.damage);
                projectile.secondaryEffect(enemy);
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

    // for (let tile of tilePool)
    // for (let enemy of enemyPool){
    //     if (!enemy.used) return;
    //     if (boxHit())
    // }
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
        console.log("No Input");
    }

    if (spacePress == true){      
        console.log("Fired a projectile!");
        startFireDelayTimer();
    }

    if (shiftPress == true){
        console.log("attempting weapon swap");
        if (shiftUp == false || paused == true) return;
        console.log("changing weapons");
        shiftUp = false;
        weaponNum ++;
        if (weaponNum > 4){
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
                playerInventory.currentWeapon = TESLA;
                break;
            case 3:
                playerInventory.currentWeapon = ROCKET;
                break;
            case 4:
                playerInventory.currentWeapon = RAILGUN;
                break;

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
    monitorKeys();
    player.update();

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
    projectilePlayerCollision();
    playerInventory.update();

    // update the stage
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