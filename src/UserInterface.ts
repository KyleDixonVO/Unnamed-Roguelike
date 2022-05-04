import { AssetManager } from "./AssetManager";
import { Player } from "./Player";
import { ScreenManager } from "./ScreenManager";

export class UserInterface {

    //private property vars
    private _score:number;


    //private vars
    private healthSprite:createjs.Sprite;
    private stage:createjs.StageGL;
    private player:Player;
    private txtScore:createjs.BitmapText;
    private startButton:createjs.Sprite;
    private settingsButton:createjs.Sprite;
    private settingsMenu:createjs.Sprite;
    private playerInventory:createjs.Sprite;
    private weaponSlot1:createjs.Sprite;
    private weaponSlot2:createjs.Sprite;
    private screenManager:ScreenManager;

    constructor(stage:createjs.StageGL, assetManager:AssetManager) {
        this.stage = stage;

        //need to create glyphs for score text
        this.txtScore = new createjs.BitmapText("0", assetManager.getSpriteSheet("glyphs"));
        this.txtScore.x = 200;
        this.txtScore.y = 20;
        this.txtScore.letterSpacing = 1;
        this.startButton = new createjs.Sprite(assetManager.getSpriteSheet("sprites"));
        this.startButton.gotoAndStop("sprites/button/up");


        //intstantialise properties
        this.reset();


    }

    // ----------------------------------------------------------------------------------------- getters/setters
    set score(value:number) {
        this._score = value;
        this.txtScore.text = String(this._score);
    }

    get score():number {
        return this._score;
    }


    // ---------------------------------------------------------------------------------------- public methods
    public passIn(player:Player, screenManager:ScreenManager):void{
        this.player = player;
        this.screenManager = screenManager;
    }

    public reset():void{
        this.score = 0;
    }

    public showStartMenu(){
        this.startButton.x = 300;
        this.startButton.y = 300;
        this.stage.addChild(this.startButton);
    }

    public onStartClick():void{
        this.startButton.on("mouseover", ()=> {
            this.startButton.gotoAndStop("sprites/button/over");
        });
        this.startButton.on("mouseout", ()=> {
            this.startButton.gotoAndStop("sprites/button/up");
        });
        this.startButton.on("click", ()=> {
            this.screenManager.startDispatch();
            this.stage.removeChild(this.startButton);
        });
    }
}