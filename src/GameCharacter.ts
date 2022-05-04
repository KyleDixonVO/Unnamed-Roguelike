import { AssetManager } from "./AssetManager";
import { DEFAULT_HEALTH, DEFAULT_SPEED, STAGE_HEIGHT, STAGE_WIDTH } from "./Constants";

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
public static DIR_NEUTRAL:number =99;

//Property variables
protected _speed:number;
protected _sprite:createjs.Sprite;
protected _state:number;
protected _health:number;
protected _direction:number;
protected _facing:number;

//Protected variables
protected stage:createjs.StageGL;
protected deltaX:number;
protected deltaY:number;

constructor (stage:createjs.StageGL, assetManager:AssetManager, animation:string){
    //initialization
    this.stage = stage;
    this._state = GameCharacter.STATE_IDLE;
    this._speed = DEFAULT_SPEED;
    this._health = DEFAULT_HEALTH;
    this.deltaX = 0;
    this.deltaY = 0;
    this._direction = GameCharacter.DIR_NEUTRAL;
    this._facing = GameCharacter.DIR_DOWN;

    //construct and place sprite
    this._sprite = assetManager.getSprite("sprites", animation, STAGE_WIDTH/2, STAGE_HEIGHT/2);
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

//--------------------------------------------------------------------------------------------------------------------- public methods

public addToStage():void {
    this.stage.addChild(this._sprite);
}

public removeFromStage():void {
    this._sprite.stop();
    this.stage.removeChild(this._sprite);
}

//could be renamed later
public spriteDirection():void {
    if (this._state == GameCharacter.STATE_DEAD || this._state == GameCharacter.STATE_PAUSED) { return };

    switch (this._direction){
        case GameCharacter.DIR_UP:
            this.deltaX = 0;
            this.deltaY = -1;
            this._sprite.gotoAndPlay("sprites/firstplayable/player back");
            this._facing = GameCharacter.DIR_UP;
            //console.log("up");
            break;

        case GameCharacter.DIR_DOWN:
            this.deltaX = 0;
            this.deltaY = 1;
            this._sprite.gotoAndPlay("sprites/firstplayable/player forward");
            this._facing = GameCharacter.DIR_DOWN;
            //console.log("down");
            break;
        
        case GameCharacter.DIR_LEFT:
            this.deltaX = -1;
            this.deltaY = 0;
            this._sprite.gotoAndPlay("sprites/firstplayable/player left");
            this._facing = GameCharacter.DIR_LEFT;
            //console.log("left");
            break;

        case GameCharacter.DIR_RIGHT:
            this.deltaX = 1;
            this.deltaY = 0;
            this._sprite.gotoAndPlay("sprites/firstplayable/player right");
            this._facing = GameCharacter.DIR_RIGHT;
            //console.log("right");
            break;

        case GameCharacter.DIR_NEUTRAL:
            this.deltaX = 0;
            this.deltaY = 0
            break;
    }
    this._sprite.play();
    this._state = GameCharacter.STATE_MOVING;
}

public stopMovement():void {
    if (this._state == GameCharacter.STATE_DEAD || this._state == GameCharacter.STATE_PAUSED) { return };

    this._sprite.stop();
    this._state = GameCharacter.STATE_IDLE;
}

public update():void {

    this.spriteDirection();

    if (this._state == GameCharacter.STATE_DEAD || this._state == GameCharacter.STATE_PAUSED || this._state == GameCharacter.STATE_IDLE) { return };
    //move based on displacements
    this._sprite.x += this.deltaX * this.speed;
    this._sprite.y += this.deltaY * this.speed;
}
}