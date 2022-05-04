import { AssetManager } from "./AssetManager";
import { DEFAULT_HEALTH, DEFAULT_SPEED } from "./Constants";
import { GameCharacter } from "./GameCharacter";

export class Player extends GameCharacter {

//custom events
private eventKilled:createjs.Event;
private eventDamaged:createjs.Event;
private eventReloading:createjs.Event;

//private vars
private shooting:boolean;

constructor(stage:createjs.StageGL, assetManager:AssetManager) {
    //need to pass in animation frame
    super(stage, assetManager, "sprites/firstplayable/player forward");

    //custom event objects
    this.eventKilled = new createjs.Event("playerKilled", true, false);
    this.eventDamaged = new createjs.Event("playerDamaged", true, false);
    this.eventReloading = new createjs.Event("reloading", true, false);

    //init unique vars
    this.shooting = false;
}

// -------------------------------------------------------------------- event handlers
private onKilled():void {
    this._state = GameCharacter.STATE_DEAD;
    this.stopMovement();
    this._sprite.on("animationend", ()=> {
        this._sprite.stop();
    }, this, true);

    //need to pass in death animation
    this._sprite.gotoAndPlay("");

    this._sprite.dispatchEvent(this.eventKilled);
}

private onDamaged():void {

}

private onReload():void {

}

// ------------------------------------------------------------------------- public methods

public reset():void{
    //need to pass in alive animation
    this._sprite.gotoAndStop("");
    this._sprite.x = 300;
    this._sprite.y = 300;
    this._speed = DEFAULT_SPEED;
    this._health = DEFAULT_HEALTH;
    this._state = GameCharacter.STATE_IDLE;
}

public update(): void {
    super.update();
}
}