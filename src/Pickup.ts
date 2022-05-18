import { AssetManager } from "./AssetManager";
import { GameCharacter } from "./GameCharacter";
import { Inventory } from "./Inventory";
import { Player } from "./Player";
import { boxHit, randomMe } from "./Toolkit";

export class Pickup{
    //will refill ammo of equipped weapons on pickup OR restore 50 hitpoints to the player.
    //on box collision with player get weapons in player inventory slot 1 and 2
    //check which weapon types they are and refill the related ammo type to max ammo constant

    public readonly medkit:string = "sprites/firstplayable/medkit";
    public readonly ammoBox:string = "sprites/firstplayable/ammo";
    public readonly typeMedkit:string = "medkit";
    public readonly typeAmmo:string = "ammo";

    private _sprite:createjs.Sprite;
    private _pickupType:string;
    private stage:createjs.StageGL;
    private player:Player;
    private _used:boolean;
    private _hit:boolean;

    private eventPickupMedkit:createjs.Event;
    private eventPickupAmmo:createjs.Event;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, player:Player){
        this.stage = stage;
        this.player = player;
        this._pickupType = this.typeMedkit;
        this._used = false;
        this._sprite = assetManager.getSprite("sprites", this.typeMedkit, 50, 50);
        this._hit = false;

        this.eventPickupAmmo = new createjs.Event("pickupAmmo", true, false);
        this.eventPickupMedkit = new createjs.Event("pickupMedkit", true, false);
    }

    get pickupType():string{
        return this._pickupType;
    }

    set pickupType(value:string){
        this._pickupType = value;
    }

    get used():boolean{
        return this._used;
    }

    set used(value:boolean){
        this._used = value;
    }



    public checkType():void{
        if (this.pickupType == this.typeMedkit){
            this._sprite.gotoAndStop(this.medkit);
        }
        else if (this.pickupType == this.typeAmmo){
            this._sprite.gotoAndStop(this.ammoBox);
        }
    }

    public update():void{
        if (this.player.state == GameCharacter.STATE_PAUSED) return;
        this.checkType();
        if (this._hit == true) return;
        if (boxHit(this._sprite, this.player.sprite)){
            this._hit = true;
            console.log(this._pickupType);
            if (this._pickupType == this.typeMedkit){
                this.stage.dispatchEvent(this.eventPickupMedkit);
                console.log("dispatching event: pickupMedkit");
                this.removeFromStage();
            }
            else if (this._pickupType == this.typeAmmo){
                this.stage.dispatchEvent(this.eventPickupAmmo);
                console.log("dispatching event: pickupAmmo");
                this.removeFromStage();
            }
        }
    }

    public addToStage():void{
        this.checkType();
        this._used = true;
        this.stage.addChild(this._sprite);
    }

    public removeFromStage():void{
        this.stage.removeChild(this._sprite);
        this.reset();
    }

    public randomizeType():void{
        let randomize:number;
        console.log("randomizing");
        randomize = randomMe(0,1);
        if (randomize == 0){
            this._pickupType = this.typeAmmo;
        }
        else if (randomize == 1){
            this._pickupType = this.typeMedkit
        }
        console.log(this._pickupType);
    }

    public setPostion(valueX:number, valueY:number):void{
        this._sprite.x = valueX;
        this._sprite.y = valueY;
    }

    public reset():void{
        this._used = false;
        this._hit = false;
        this.stage.removeChild(this._sprite);
    }

    public onDrop(valueX:number, valueY:number):void{
        this.randomizeType();
        this.setPostion(valueX, valueY);
        this.addToStage();
    }


}