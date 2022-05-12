import { AssetManager } from "./AssetManager";

export class Tile{
    private _sprite:createjs.Sprite;
    private stage:createjs.StageGL;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, animation:string){

        this.stage = stage;
        this._sprite = assetManager.getSprite("sprites", animation);

    }

    get sprite():createjs.Sprite{
        return this._sprite;
    }

    public setPosition(valueX:number, valueY:number){
        this._sprite.x = valueX;
        this._sprite.y = valueY;
    }

    public addToStage(){
        this.stage.addChild(this._sprite);
    }

    public removeFromStage(){
        this.stage.removeChild(this._sprite);
    }
}