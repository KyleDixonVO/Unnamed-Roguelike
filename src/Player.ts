import { AssetManager } from "./AssetManager";
import { DEFAULT_HEALTH, DEFAULT_SPEED } from "./Constants";
import { GameCharacter } from "./GameCharacter";

export class Player extends GameCharacter {

//custom events
private eventKilled:createjs.Event;
private eventReloading:createjs.Event;

//private vars
private shooting:boolean;

constructor(stage:createjs.StageGL, assetManager:AssetManager) {
    //need to pass in animation frame
    super(stage, assetManager, "sprites/firstplayable/player forward");

    //custom event objects
    this.eventKilled = new createjs.Event("playerKilled", true, false);
    this.eventReloading = new createjs.Event("reloading", true, false);

    //init unique vars
    this.shooting = false;
}

// -------------------------------------------------------------------- event handlers
private onKilled():void {
    this._state = GameCharacter.STATE_DEAD;
    //temporary tween alpha to zero
    createjs.Tween.get(this._sprite, {useTicks:true}).to({alpha:0}, 30).wait(5).call(()=> {
        this.dispatchKilled();
    }, null, this);
    

    // this.stopMovement();
    // this._sprite.on("animationend", ()=> {
    //     this._sprite.stop();
    // }, this, true);

    // //need to pass in death animation
    // this._sprite.gotoAndPlay("");

    //this._sprite.dispatchEvent(this.eventKilled);
}

private onDamaged():void {

}

private onReload():void {

}

// ------------------------------------------------------------------------- public methods

public killed(): void {
    this.stopMovement();
    this.onKilled();
}

public reset():void{
    this._sprite.gotoAndStop("sprites/firstplayable/player forward");
    this._sprite.x = 300;
    this._sprite.y = 300;
    this._speed = DEFAULT_SPEED;
    this._health = DEFAULT_HEALTH;
    this._state = GameCharacter.STATE_IDLE;
    createjs.Tween.removeTweens(this._sprite);
    this._sprite.alpha = 1;
}

public takeDamage(value:number):void{
    if (this._state == GameCharacter.STATE_DEAD || this._state == GameCharacter.STATE_DYING || this._state == GameCharacter.STATE_PAUSED) return;

    if (value <= 0 || value >= Number.MAX_SAFE_INTEGER || value <= Number.MIN_SAFE_INTEGER) return;
    
    this._health -= value;

    if (this._health < 0){
        this._health = 0;
    }

    if (this.health == 0){
        this.killed();
    }
}

public update(): void {
    super.update();
}

public dispatchKilled():void{
    this.stage.dispatchEvent(this.eventKilled);
    console.log("dispatched event: playerKilled");
}
}