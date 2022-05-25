 import { AssetManager } from "./AssetManager";
import { ALIEN_BEAM, DEF_PROJECTILE_DAMAGE, DEF_PROJECTILE_SPEED, LASER, PISTOL, RAILGUN, ROCKET, STAGE_HEIGHT, STAGE_WIDTH, TESLA } from "./Constants";
import { Inventory } from "./Inventory";
import { Pickup } from "./Pickup";
import { GameCharacter } from "./GameCharacter";
import { Tile } from "./Tile";
import { Enemy } from "./Enemy";

export class Projectile {

    private _speed:number;
    private _sprite:createjs.Sprite;
    private _damage:number;
    private _bounces:number;
    private stage:createjs.StageGL;
    private _gameCharacter:GameCharacter;
    private _inventory:Inventory;
    private _used:boolean;
    private deltaX:number;
    private deltaY:number;
    private _gamePaused:boolean;
    private _shouldBounce:boolean;

    constructor (stage:createjs.StageGL, assetManager:AssetManager, animation:string){

        this.stage = stage;
        this._speed = DEF_PROJECTILE_SPEED;
        this._damage = DEF_PROJECTILE_DAMAGE;
        this._sprite = assetManager.getSprite("sprites", animation, 0,0);
        this._used = false;
        this._bounces = 0;
        this.deltaX = 0;
        this.deltaY = 0;
        this._gamePaused = false;
        this._shouldBounce = false;
    }


    // ---------------------------------------------------------------------------------------------- getters/setters

    get speed(){
        return this._speed;
    }

    get damage(){
        return this._damage;
    }

    get bounces(){
        return this._bounces;
    }

    get sprite(){
        return this._sprite;
    }

    get used(){
        return this._used;
    }

    get controllerInventory(){
        return this._inventory;
    }

    set used(value:boolean){
        this._used = value;
    }

    get gamePaused(){
        return this._gamePaused;
    }

    set gamePaused(value:boolean){
        this._gamePaused = value;
    }

    get gamecharacter():GameCharacter{
        return this._gameCharacter;
    }

    set gamecharacter(value:GameCharacter){
        this._gameCharacter = value;
    }


    // -------------------------------------------------------------------------------------------------- private methods



    // -------------------------------------------------------------------------------------------------- public methods

    public passIn(gameCharacter:GameCharacter, inventory:Inventory):void {
        this._gameCharacter = gameCharacter;
        this._inventory = inventory;
    }

    public reset():void{
        
        this._damage = DEF_PROJECTILE_DAMAGE;
        this._speed = DEF_PROJECTILE_SPEED;
        this._used = false;
        this.deltaX = 0;
        this.deltaY = 0;
        this.stage.removeChild(this._sprite);
        this._bounces = 0;
    }

    public activate():void{
        switch (this.gamecharacter.facing) {
            case GameCharacter.DIR_UP:
                this.deltaX = 0;
                this.deltaY = -1;
                this._sprite.rotation = 90;
                break;
            
            case GameCharacter.DIR_DOWN:
                this.deltaX = 0;
                this.deltaY = 1;
                this._sprite.rotation = 270;
                break;

            case GameCharacter.DIR_LEFT:
                this.deltaX = -1;
                this.deltaY = 0;
                this._sprite.rotation = 0;
                break;

            case GameCharacter.DIR_RIGHT:
                this.deltaX = 1;
                this.deltaY = 0;
                this._sprite.rotation = 180;
                break;
            
        }
        this.used = true;
        this._sprite.x = this.gamecharacter.sprite.x;
        this._sprite.y = this.gamecharacter.sprite.y;
        //console.log("about to add projectile of type to stage: " + this.controllerInventory.currentProjectileSprite);
        this.stage.addChild(this._sprite);
        this.applyWeaponCharacteristics();
        //console.log("added projectile of type: " + this.controllerInventory.currentProjectileSprite);
    }

    public applyWeaponCharacteristics():void{
        this._damage = this.controllerInventory.weaponDamage;
        this._speed = this.controllerInventory.currentProjectileSpeed;
        this._sprite.gotoAndStop(this.controllerInventory.currentProjectileSprite);
    }

    public update():void{
        if (this._gamePaused == true) return;
        this._sprite.x += this.deltaX * this._speed;
        this._sprite.y += this.deltaY * this._speed;

        if (this._sprite.x > STAGE_WIDTH + this._sprite.getBounds().width 
         || this._sprite.x < 0 - this._sprite.getBounds().width 
         || this._sprite.y > STAGE_HEIGHT + this._sprite.getBounds().height
         || this._sprite.y < 0 - this._sprite.getBounds().height)
         {
            this.used = false;
            this._sprite.stop();
            this.stage.removeChild(this._sprite);
            this.reset();
            console.log("projectile reclaimed");
         }

    }

    public secondaryEffect(collsionTrigger:unknown):void{
        switch (this.controllerInventory.currentWeapon){
            case PISTOL:
                this.reset();
                break;
            
            case LASER:
                if (collsionTrigger.constructor.name == Enemy.name) return;
                this._bounces++;
                if (this._sprite.rotation == 90 || this._sprite.rotation == 270){ this.deltaY = -this.deltaY};
                if (this._sprite.rotation == 0 || this._sprite.rotation == 180){ this.deltaX = -this.deltaX};
                if (this._bounces >= 2){
                    this.reset();
                }
                break;
            
            case RAILGUN:
                if (collsionTrigger.constructor.name == Enemy.name) return;
                this.reset();
                break;

            case ROCKET:
                this.reset();
                //need to replace this with deployment of secondary sprites and their logic
                break;
            
            case TESLA:
                this.reset();
                //need to replace this with deployment of secondary sprites and their logic
                break;
            
            case ALIEN_BEAM:
                this.reset();
                break;

            default:
                this.reset();
                break;

        }
    }
}