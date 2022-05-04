// createjs typescript definition for TypeScript
/// <reference path="./../node_modules/@types/createjs/index.d.ts" />

// importing createjs framework
import "createjs";
// importing game constants
import { STAGE_WIDTH, STAGE_HEIGHT, FRAME_RATE, ASSET_MANIFEST, ENEMY_MAX, PROJECTILE_MAX } from "./Constants";
import { AssetManager } from "./AssetManager";
import { UserInterface } from "./UserInterface";
import { ScreenManager } from "./ScreenManager";
import { Player } from "./Player";
import { Enemy } from "./Enemy";
import { GameCharacter } from "./GameCharacter";
import { Projectile } from "./Projectile";
import { Inventory } from "./Inventory";


// game variables
let stage:createjs.StageGL;
let UI_Stage:createjs.StageGL;
let canvas:HTMLCanvasElement;
let assetManager:AssetManager;

let upKey:boolean = false;
let downKey:boolean = false;
let leftKey:boolean = false;
let rightKey:boolean = false;
let spacePress:boolean = false;

// game objects
let player:Player;
let enemyPool:Enemy[] = [];
let enemyInventories:Inventory[] = [];
let projectilePool:Projectile[] = [];
let userInterface:UserInterface;
let screenManager:ScreenManager;
let newProjectile:Projectile;
let playerInventory:Inventory;
let bank:Inventory;

// timers







// --------------------------------------------------- event handler
function onReady(e:createjs.Event):void {
    console.log(">> spritesheet loaded – ready to add sprites to game");

    // construct game objects here
    screenManager = new ScreenManager(stage, assetManager);
    
    
    userInterface = new UserInterface(stage, assetManager);

    player = new Player(stage, assetManager);

    playerInventory = new Inventory(player);

    userInterface.passIn(player, screenManager);
    
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

    //listen for custom game events
    stage.on("playerKilled", onGameEvent);
    stage.on("playerDamaged", onGameEvent);
    stage.on("gameStarted", onGameEvent);
    stage.on("gameReset", onGameEvent);
    stage.on("titleActive", onGameEvent);
    stage.on("gameOverActive", onGameEvent);

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

            break;
    
        case "playerDamaged":

            break;
        
        case "gameStarted":
            player.addToStage();

            break;

        case "gameReset":

            break;
        
        case "titleActive":
            console.log("received dispatch: titleActive ");
            userInterface.showStartMenu();
            userInterface.onStartClick();

            break;
        
        case "gameOverActive":

            break;
    }
}

function onAddProjectile():void{
    for (newProjectile of projectilePool){
        if (newProjectile.used == false){
            newProjectile.used = true;
            newProjectile.passIn(player, playerInventory);
            newProjectile.activate();
            break;
        }
    }
}

function monitorKeys():void {
    if (upKey == true){
        player.direction = GameCharacter.DIR_UP;
        console.log("W");
    }

    if (downKey == true){
        player.direction = GameCharacter.DIR_DOWN;
        console.log("S");
    }

    if (leftKey == true){
        player.direction = GameCharacter.DIR_LEFT;
        console.log("A");
    }

    if (rightKey == true){
        player.direction = GameCharacter.DIR_RIGHT;
        console.log("D");
    }

    if (rightKey == false && leftKey == false && upKey == false && downKey == false){
        player.direction = GameCharacter.DIR_NEUTRAL;
        console.log("No Input");
    }

    if (spacePress == true){
         
        console.log("Fired a projectile!");
        onAddProjectile();
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
}

function onTick(e:createjs.Event) {
    // console.log("TICK!");
    document.getElementById("fps").innerHTML = String(createjs.Ticker.getMeasuredFPS());

    // this is your game loop!
    // ...
    monitorKeys();
    player.update();

    for (let projectile of projectilePool)
    {
        if (projectile.used) projectile.update();
    }

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