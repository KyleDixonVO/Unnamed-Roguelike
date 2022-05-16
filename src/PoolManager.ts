import { Inventory } from "./Inventory";
import { Player } from "./Player";
import { Enemy } from "./Enemy";
import { Projectile } from "./Projectile";
import { Tile } from "./Tile";
import { Pickup } from "./Pickup";
import { ENEMY_MAX, PROJECTILE_MAX, PLAYER_PROJECTILE_MAX, HEIGHT_IN_TILES, WIDTH_IN_TILES, NUMBER_OF_LEVELS, LEVEL_DATA, PICKUP_MAX, ALIEN_CONTACT_DAMAGE, ALIEN_BEAM_DAMAGE,  } from "./Constants";
import { AssetManager } from "./AssetManager";
import { randomMe, radiusHit, boxHit } from "./Toolkit";
import { GameCharacter } from "./GameCharacter";

export class PoolManager {

    private stage:createjs.Stage;
    private player:Player;
    private playerInventory:Inventory;
    public enemyPool:Enemy[] = [];
    public enemyInventories:Inventory[] = [];
    public projectilePool:Projectile[] = [];
    public playerProjectilePool:Projectile[] = [];
    public tilePool:Array<Array<Tile>> = [];
    public levelData:Array<Array<Array<String>>> = [];
    public pickupPool:Pickup[] = [];

    private newProjectile:Projectile;
    private newEnemy:Enemy;
    private newPickup:Pickup;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, player:Player, playerInventory:Inventory){
        
         //enemy pool
    for (let i:number =0; i < ENEMY_MAX; i++){
        this.enemyPool.push(new Enemy(stage, assetManager, player, i));
    }

    //enemy inventories
    for (let i:number = 0; i < ENEMY_MAX; i++){
        this.enemyInventories.push(new Inventory(this.enemyPool[i]));
    }

    //projectile pool
    for (let i:number =0; i < PROJECTILE_MAX; i++){
        this.projectilePool.push(new Projectile(stage, assetManager, "sprites/firstplayable/bullet"));
    }

    //playerProjectile pool
    for (let i:number =0; i < PLAYER_PROJECTILE_MAX; i++){
        this.playerProjectilePool.push(new Projectile(stage, assetManager, "sprites/firstplayable/bullet"));
        this.playerProjectilePool[i].passIn(player, playerInventory);
    }

    //tile pool
    for (let i:number = 0; i < (HEIGHT_IN_TILES); i++){
        this.tilePool.push(new Array<any>());
        for (let j:number = 0; j < WIDTH_IN_TILES; j++){
            this.tilePool[i].push( new Tile(stage, assetManager, "sprites/firstplayable/floor1"));
            this.tilePool[i][j].setPosition(i * 40, j * 40);
        }
    }

    //level data
    for (let i:number = NUMBER_OF_LEVELS; i < NUMBER_OF_LEVELS; i++){
        this.levelData.push(new Array<any>());
        for (let j:number =  0; j < HEIGHT_IN_TILES; j++ ){
            this.levelData[i].push(new Array<any>());
            for (let k:number = 0; k < HEIGHT_IN_TILES; k++){
                this.levelData[i][j].fill(LEVEL_DATA[i][j][k]);
            }
        }
    }

    //pickup pool
    for (let i:number = 0; i < PICKUP_MAX; i++){
        this.pickupPool.push(new Pickup(stage, assetManager, player));
    }


    }

    public addPlayerProjectile():void{
        
        for (this.newProjectile of this.playerProjectilePool){
            if (this.newProjectile.used == false){
                this.newProjectile.used = true;
                this.newProjectile.passIn(this.player, this.playerInventory);
                this.newProjectile.activate();
                break;
            }
        }
    }

    public addPickUp():void{
        for (this.newPickup of this.pickupPool){
            console.log("adding pickup");
            if (this.newPickup.used == false){
                this.newPickup.used = true;
                this.newPickup.randomizeType();
                this.newPickup.addToStage();
                break;
            }
        }
    }

    public addProjectile():void{
        
        for (this.newProjectile of this.projectilePool){
            if (this.newProjectile.used == false){
                this.newProjectile.used = true;
                this.newProjectile.passIn(this.player, this.playerInventory);
                this.newProjectile.activate();
                break;
            }
        }
    }

    public addEnemy():void{
        for (this.newEnemy of this.enemyPool){
            if (this.newEnemy.used == false){
                this.newEnemy.used = true;
                this.newEnemy.addToStage();
                this.newEnemy.sprite.x = randomMe(50, 550);
                this.newEnemy.sprite.y = randomMe(50, 550);
                console.log(this.newEnemy);
                break;
            }
        }
    }

    public showLevel():void{
        for (let array of this.tilePool){
            for (let tile of array){
                tile.addToStage();
            }
        }
    }

    public hideLevel():void{
        for (let array of this.tilePool){
            for (let tile of array){
                tile.removeFromStage();
            }
        }
    }

    public loadLevel(value:number):void{
        let i = value - 1;
        for (let j:number =  0; j < HEIGHT_IN_TILES; j++ ){
            for (let k:number = 0; k < WIDTH_IN_TILES; k++){
                console.log(LEVEL_DATA[i][j][k]);
                this.tilePool[k][j].sprite.gotoAndStop(LEVEL_DATA[i][j][k]);
            }
        }
    }

    public resetPools():void{
        for (let enemy of this.enemyPool){
            if (enemy.used) enemy.reset();
        }
    
        for (let projectile of this.projectilePool){
            if (projectile.used) projectile.reset();
        }
    
        for (let projectile of this.playerProjectilePool){
            if (projectile.used) projectile.reset();
        }
    
        for (let pickup of this.pickupPool){
            if (pickup.used) pickup.reset();
        }
    
    }

    public projectileEnemyCollision(){
        for (let projectile of this.playerProjectilePool){
            if (!projectile.used) continue;
            for (let enemy of this.enemyPool){
                if (!enemy.used) continue;
                //console.log(enemy);
                //console.log("enemy state: " + enemy.state);
                if (radiusHit( enemy.sprite, 16, projectile.sprite, 2)){
                    if (enemy.state == GameCharacter.STATE_DEAD || enemy.state == GameCharacter.STATE_DYING || enemy.state == GameCharacter.STATE_IDLE) continue;
                    console.log("hit!");
                    enemy.takeDamage(projectile.damage);
                    projectile.secondaryEffect(enemy);
                }
            }
    
        }
    }

    public projectilePlayerCollision(){
        for (let projectile of this.projectilePool){
            if (!projectile.used) return;
            if (radiusHit(projectile.sprite, 2, this.player.sprite, 16)){
                this.player.takeDamage(ALIEN_BEAM_DAMAGE);
                projectile.reset();
            }
        }
    }

    public tileCollisionDetection(){

        // for (let tile of tilePool)
        // for (let enemy of enemyPool){
        //     if (!enemy.used) return;
        //     if (boxHit())
        // }
    }

    public update():void{
        for (let projectile of this.playerProjectilePool)
        {
            if (projectile.used) projectile.update();
        }
    
        for (let enemy of this.enemyPool)
        {
            if (enemy.used) {
                enemy.trackPlayer(this.player);
                enemy.update();
            }
        }
    
        for (let pickup of this.pickupPool){
            if(pickup.used){
                pickup.update();
            }
        }
    }

    public unpause():void{
        for (let projectile of this.projectilePool)
        {
            if (projectile.used) projectile.gamePaused = false;
        }

        for (let projectile of this.playerProjectilePool)
        {
            if (projectile.used) projectile.gamePaused = false;
        }

        for (let enemy of this.enemyPool)
        {
            if (enemy.used) enemy.unpause();
        }
    }

    public pause():void{
        for (let projectile of this.projectilePool)
        {
            if (projectile.used) projectile.gamePaused = true;
        }

        for (let projectile of this.playerProjectilePool)
        {
            if (projectile.used) projectile.gamePaused = true;
        }

        for (let enemy of this.enemyPool)
        {
            if (enemy.used) enemy.pause();
        }
    }


}
