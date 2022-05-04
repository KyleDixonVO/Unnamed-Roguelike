import { AssetManager} from "./AssetManager";
import { GameCharacter } from "./GameCharacter";
import { Player } from "./Player";

export class Enemy extends GameCharacter{

    private _enemyType:string;
    private player:Player;
    private shooting:boolean;

    constructor (stage:createjs.StageGL, assetManager:AssetManager, player:Player) {
      super(stage, assetManager, "sprites/firstplayable/smol boi front");
      this.player = player;
      this.shooting = false;
      this._enemyType = "melee";
    

    }
}