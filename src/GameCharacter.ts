import { AssetManager } from "./AssetManager";
import { DEFAULT_HEALTH, DEFAULT_SPEED, STAGE_HEIGHT, STAGE_WIDTH } from "./Constants";
import { Player } from "./Player";

export class GameCharacter {

//State constants
public static STATE_IDLE:number = 0;
public static STATE_ATTACKING:number = 1;
public static STATE_MOVING:number = 2;
public static STATE_DYING:number = 3;
public static STATE_DEAD:number = 4;
public static STATE_PAUSED:number = 99;

//Direction constants
public static DIR_UP:number = 0;
public static DIR_DOWN:number = 1;
public static DIR_LEFT:number = 2;
public static DIR_RIGHT:number = 3;
public static DIR_NE:number = 4;
public static DIR_SE:number = 5;
public static DIR_SW:number = 6;
public static DIR_NW:number = 7;
public static DIR_NEUTRAL:number =99;

//Property variables
protected _speed:number;
protected _sprite:createjs.Sprite;
protected _state:number;
protected _health:number;
protected _healthMax:number;
protected _direction:number;
protected _facing:number;
protected _stateBeforePause:number;

//Protected variables
protected stage:createjs.StageGL;
protected _deltaX:number;
protected _deltaY:number;
protected _lastX:number;
protected _lastY:number;
protected _colliding:boolean;
protected _moving:boolean;
protected _idleAnimating:boolean;
protected _walkAnimating:boolean;

protected _weaponSprite:createjs.Sprite;

constructor (stage:createjs.StageGL, assetManager:AssetManager, animation:string){
    //initialization
    this.stage = stage;
    this._state = GameCharacter.STATE_IDLE;
    this._stateBeforePause = GameCharacter.STATE_IDLE;
    this._speed = DEFAULT_SPEED;
    this._health = DEFAULT_HEALTH;
    this._deltaX = 0;
    this._deltaY = 0;
    this._direction = GameCharacter.DIR_NEUTRAL;
    this._facing = GameCharacter.DIR_DOWN;
    this._healthMax = DEFAULT_HEALTH;
    this._moving = false;
    this._idleAnimating = false;
    this._walkAnimating = false;

    //construct and place sprite
    this._sprite = assetManager.getSprite("sprites", animation, STAGE_WIDTH/2, STAGE_HEIGHT/2);
    this._lastX = this._sprite.x;
    this._lastY = this._sprite.y;
    this._colliding = false;
    this._weaponSprite = assetManager.getSprite("sprites", "sprites/firstplayable/pistol front", this._sprite.x, this._sprite.y);
}

//---------------------------------------------------------------------------------------------------------------- getters/setters
set speed(value:number) {
    this._speed = value;
}

get speed():number {
    return this._speed;
}

set direction(value:number) {
    this._direction = value;
}

get direction():number {
    return this._direction;
}

set facing(value:number){
    this._facing = value;
}

get facing():number {
    return this._facing;
}

// set state(value:number) {
//     this._state = value;
// }

get state():number {
    return this._state;
}

// set health(value:number) {
//     this._health = value;
// }

get health():number {
    return this._health;
}

get sprite():createjs.Sprite {
    return this._sprite;
}

get weaponSprite():createjs.Sprite {
    return this._weaponSprite;
}

set healthMax(value:number){
    this._healthMax = value;
}
get healthMax(){
    return this._healthMax;
}

get deltaX():number{
    return this._deltaX;
}

set deltaX(value:number){
    this._deltaX = value;
}

get deltaY():number{
    return this._deltaY;
}

set deltaY(value:number){
    this._deltaY = value;
}

get lastX():number{
    return this._lastX;
}

set lastX(value:number){
    this._lastX = value;
}

get lastY():number{
    return this._lastY;
}

set lastY(value:number){
    this._lastY = value;
}

get colliding():boolean{
    return this._colliding;
}

set colliding(value:boolean){
    this._colliding = value;
}

//--------------------------------------------------------------------------------------------------------------------- public methods

public addToStage():void{
    this.stage.addChild(this._sprite);
    //this.stage.addChild(this.weaponSprite);
    this.stage.setChildIndex(this._sprite, this.stage.numChildren);
    //this.stage.setChildIndex(this._weaponSprite, this.stage.numChildren);
}

public removeFromStage():void {
    this._sprite.stop();
    this._weaponSprite.stop();
    this.stage.removeChild(this._sprite);
    this.stage.removeChild(this._weaponSprite);
}

//could be renamed later
public movingDirection():void {
    if (this._state == GameCharacter.STATE_DEAD || this._state == GameCharacter.STATE_PAUSED) { return };

    switch (this._direction){
        case GameCharacter.DIR_UP:
            this._deltaX = 0;
            this._deltaY = -1;
            if (this._walkAnimating == false){
                this._walkAnimating = true;
                this._sprite.gotoAndPlay("sprites/firstplayable/playerBackWalk");
            }
            this._weaponSprite.x = this._sprite.x;
            this._weaponSprite.y = this._sprite.y - this._sprite.getBounds().height/2;
            this._facing = GameCharacter.DIR_UP;
            this._moving = true;
            //console.log("up");
            break;

        case GameCharacter.DIR_DOWN:
            this._deltaX = 0;
            this._deltaY = 1;
            if (this._walkAnimating == false){
                this._walkAnimating = true;
                this._sprite.gotoAndPlay("sprites/firstplayable/playerForwardWalk");
            }

            this._weaponSprite.x = this._sprite.x;
            this._weaponSprite.y = this._sprite.y;
            this._facing = GameCharacter.DIR_DOWN;
            this._moving = true;
            //console.log("down");
            break;
        
        case GameCharacter.DIR_LEFT:
            this._deltaX = -1;
            this._deltaY = 0;
            if (this._walkAnimating == false){
                this._walkAnimating = true;
                this._sprite.gotoAndPlay("sprites/firstplayable/playerLeftWalk");
            }

            this._weaponSprite.x = this._sprite.x - this._sprite.getBounds().width/2;
            this._weaponSprite.y = this._sprite.y;
            this._facing = GameCharacter.DIR_LEFT;
            this._moving = true;
            //console.log("left");
            break;

        case GameCharacter.DIR_RIGHT:
            this._deltaX = 1;
            this._deltaY = 0;
            if (this._walkAnimating == false){
                this._walkAnimating = true;
                this._sprite.gotoAndPlay("sprites/firstplayable/playerRightWalk");
            }

            this._weaponSprite.x = this._sprite.x + this._sprite.getBounds().width/2;
            this._weaponSprite.y = this._sprite.y;
            this._facing = GameCharacter.DIR_RIGHT;
            this._moving = true;
            //console.log("right");
            break;

        case GameCharacter.DIR_NEUTRAL:
            this._walkAnimating = false;
            this._deltaX = 0;
            this._deltaY = 0
            this._moving = false;
            break;
    }
    //console.log(this._direction);
}

public idleDirection():void{
    if (this._moving == true){
        this._idleAnimating = false;
        return;
    } 
    if (this._idleAnimating == true){ return; }
    this._idleAnimating = true;
    switch(this._facing){
        case GameCharacter.DIR_DOWN:
            this._sprite.gotoAndPlay("sprites/firstplayable/player forward idle");
        break;

        case GameCharacter.DIR_UP:
            this._sprite.gotoAndPlay("sprites/firstplayable/player back idle");
        break;

        case GameCharacter.DIR_LEFT:
            this._sprite.gotoAndPlay("sprites/firstplayable/player left idle");
        break;

        case GameCharacter.DIR_RIGHT:
            this._sprite.gotoAndPlay("sprites/firstplayable/player right idle");
        break;

    }
}

public stopMovement():void {
    if (this._state == GameCharacter.STATE_DEAD || this._state == GameCharacter.STATE_PAUSED) { return };

    this._sprite.stop();
    this._weaponSprite.stop();
    this._state = GameCharacter.STATE_IDLE;
}

public startMovement():void{
    if (this._state == GameCharacter.STATE_DEAD || this._state == GameCharacter.STATE_PAUSED) { return };
    //console.log("started movement");
    this.sprite.play();
    this.weaponSprite.play();
    this._state = GameCharacter.STATE_MOVING;

}

public update():void {

    this.movingDirection();

    if (this._state == GameCharacter.STATE_DEAD || this._state == GameCharacter.STATE_PAUSED || this._state == GameCharacter.STATE_IDLE) { return };
    this.sprite.on("animationend", ()=> {this._walkAnimating = false});
    this.idleDirection();
    //move based on displacements
    this._sprite.x += this._deltaX * this.speed;
    this._sprite.y += this._deltaY * this.speed;
    this._weaponSprite.x += this._deltaX * this.speed;
    this._weaponSprite.y += this._deltaY * this.speed;
    this._colliding = false;
}

public pause():void{
    this._stateBeforePause = this._state;
    //console.log("state before pausing: " + this._stateBeforePause);
    this._state = GameCharacter.STATE_PAUSED;
}

public unpause():void{
    this._state = this._stateBeforePause;
    //console.log("state after pausing: " + this._state);
}

public setLastPosition(){
    this.lastX = this._sprite.x;
    this.lastY = this._sprite.y;
}

public returnToLastPosition(){
    this._sprite.x = this._lastX;
    this._sprite.y = this._lastY;
}
}