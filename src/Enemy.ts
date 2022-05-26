import { AssetManager} from "./AssetManager";
import { DEFAULT_HEALTH, DEFAULT_SPEED, RAILGUN_SPEED, TESLA_CHAIN_DAMAGE } from "./Constants";
import { GameCharacter } from "./GameCharacter";
import { Player } from "./Player";
import { Tile } from "./Tile";
import { boxHit, randomMe } from "./Toolkit";

export class Enemy extends GameCharacter{

  private _enemyType:string;
  public readonly melee:string = "melee";
  public readonly ranged:string = "ranged";
  public readonly boss:string = "boss";  
  private player:Player;
  private shooting:boolean;
  private _used:boolean;
  private eventPlayerHit:createjs.Event;
  private eventEnemyKilled:createjs.Event;
  private _arrayNumber:number;
  private _animating:boolean;

  constructor (stage:createjs.StageGL, assetManager:AssetManager, player:Player, placeInArray:number) {
    super(stage, assetManager, "sprites/firstplayable/smol boi front");
    this._healthMax = 5;
    this._health = 5;
    this.player = player;
    this.shooting = false;
    this._enemyType = this.melee;
    this._used = false;
    this.shooting = false;
    this._state = GameCharacter.STATE_MOVING;
    this._speed = 2;
    this.eventPlayerHit = new createjs.Event("playerHit", true, false);
    this.eventEnemyKilled = new createjs.Event("enemyKilled", true, false);
    this._arrayNumber = placeInArray;
    this._animating = false;
  }

  // -------------------------------------------------------------------------------------------- getters/setters

  get used(){
    return this._used;
  }

  set used(value:boolean){
    this._used = value;
  }

  get enemyType(){
    return this._enemyType;
  }

  set enemyType(value:string){
    this._enemyType = value;
  }

  get arrayNumber():number{
    return this._arrayNumber;
  }


  // set arrayNumber(value:number){
  //   this._arrayNumber = value;
  // }

  // --------------------------------------------------------------------------------------------- private methods

  private onKilled():void {
    this._state = GameCharacter.STATE_DEAD;
    //temporary tween alpha to zero

    //createjs.Tween.get(this._sprite, {useTicks:true}).to({alpha:0}, 30).wait(10).call(()=>{
      this.reset();
    //});

    // this.stopMovement();
    // this._sprite.on("animationend", ()=> {
    //     this._sprite.stop();
    // }, this, true);

    // //need to pass in death animation
    // this._sprite.gotoAndPlay("");

    //this._sprite.dispatchEvent(this.eventKilled);
  }

  // ------------------------------------------------------------------------------------------------- public methods
  public trackPlayer(player:Player):void{
    if (this._state == GameCharacter.STATE_PAUSED  || this._state == GameCharacter.STATE_DEAD) return;
    this.player = player;
    this._sprite.play();
    this._state = GameCharacter.STATE_MOVING;
  }

  public reset():void{
    //need to pass in alive animation
    this._sprite.gotoAndStop("sprites/firstplayable/smol boi front");
    this._sprite.x = 300;
    this._sprite.y = 300;
    this._speed = 2;
    this._health = this._healthMax;
    this._state = GameCharacter.STATE_IDLE;
    this._used = false;
    this._enemyType = this.melee;
    this._colliding = false; 
    //createjs.Tween.removeTweens(this._sprite);
    this.removeFromStage();
  }

  public killed(): void {
    this.stopMovement();
    this.onKilled();
  }

    

  public update(): void {

    if (this._state == GameCharacter.STATE_DEAD || this._state == GameCharacter.STATE_PAUSED || this._state == GameCharacter.STATE_IDLE) { return };

    //replace with trig later to solve diagonal speed boost
    if (this._colliding == false){
      if (this._sprite.x > this.player.sprite.x){ this.deltaX = -1}
      else if (this._sprite.x < this.player.sprite.x){ this.deltaX = 1}
      else (this.deltaX = 0);
  
      if (this._sprite.y > this.player.sprite.y){ this.deltaY = -1}
      else if (this._sprite.y < this.player.sprite.y){ this.deltaY = 1}
      else (this.deltaY = 0);
    }

    if (this._animating == false){
      this._animating = true;
      if (this.deltaX == 1){
        this._sprite.gotoAndPlay("sprites/firstplayable/smol boi right walk");
      }
      else if (this.deltaX == -1){
        this._sprite.gotoAndPlay("sprites/firstplayable/smol boi left walk");
      }
      else if (this.deltaY == 1){
        this._sprite.gotoAndPlay("sprites/firstplayable/smol boi forward walk");
      }
      else if (this.deltaY == -1){
        this._sprite.gotoAndPlay("sprites/firstplayable/smol boi back walk");
      }
    }

    this._sprite.on("animationend", ()=> {this._animating = false});

    this._sprite.x += this.deltaX*this._speed;
    this._sprite.y += this.deltaY*this._speed;

    this.colliding = false;
    if (this.player.state == GameCharacter.STATE_DEAD) return;

    if (boxHit(this._sprite, this.player.sprite)){
      //console.log("dispatching event: playerHit");
      this._colliding = true;
      this.sprite.dispatchEvent(this.eventPlayerHit);
      this.returnToLastPosition();
    }

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
      this.stage.dispatchEvent(this.eventEnemyKilled);

    }
  }

  public courseCorrect(object:any){
    if (object.sprite.x > this.sprite.x){
      this.deltaX = -this.deltaX;
    }
    else if (object.sprite.y > this.sprite.y){
      this.deltaY = -this.deltaY;
    }

      let random = randomMe(1,4);
      //console.log(random);
      if (random == 1){
        this.deltaX = 1;
        this.deltaY = 1;
      }
      else if (random == 2){
        this.deltaY = 1;
        this.deltaX = -1;
      }
      else if (random == 3){
        this.deltaX = 1;
        this.deltaY = -1;
      }
      else if (random == 4){
        this.deltaX = -1;
        this.deltaY = -1;
      }
    

  }


}