 import { AssetManager } from "./AssetManager";
import { DEF_PROJECTILE_DAMAGE, DEF_PROJECTILE_SPEED, STAGE_HEIGHT, STAGE_WIDTH } from "./Constants";
import { Inventory } from "./Inventory";
import { Pickup } from "./Pickup";
import { GameCharacter } from "./GameCharacter";

export class Projectile {

    private _speed:number;
    private _sprite:createjs.Sprite;
    private _damage:number;
    private _bounces:number;
    private stage:createjs.StageGL;
    private _gameCharacter:GameCharacter;
    private weaponType:string;
    private inventory:Inventory;
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
        this.inventory = inventory;
        this.weaponType = inventory.currentWeapon;
    }

    public reset():void{
        this._bounces = 0;
        this._damage = DEF_PROJECTILE_DAMAGE;
        this._speed = DEF_PROJECTILE_SPEED;
        this._used = false;
        this.deltaX = 0;
        this.deltaY = 0;
        this.stage.removeChild(this._sprite);
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
        this.stage.addChild(this._sprite);
    }

    public applyWeaponCharacteristics():void{
        this._damage = this.inventory.weaponDamage;
        this._speed = this.inventory.currentProjectileSpeed;
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
}