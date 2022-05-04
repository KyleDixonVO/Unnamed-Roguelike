import { AssetManager } from "./AssetManager";

export class ScreenManager {

    private stage:createjs.StageGL;

    private titleScreen:createjs.Container;
    private gameScreen:createjs.Sprite;
    private gameOverScreen:createjs.Container;

    //custom events
    private eventTitleActive:createjs.Event;
    private eventGameOverActive:createjs.Event;
    private eventStartGame:createjs.Event;
    private eventResetGame:createjs.Event;

    constructor(stage:createjs.StageGL, assetManager:AssetManager) {
        this.stage = stage;

        //container construction
        this.titleScreen = new createjs.Container();

        //needs an animation frame to be passed in
        this.titleScreen.addChild(assetManager.getSprite("sprites", "sprites/other/background", 300,300));

        this.gameOverScreen = new createjs.Container();

        //needs an animation frame to be passed in
        this.gameOverScreen.addChild(assetManager.getSprite("sprites", "", 0,0));

        let gameOverSprite:createjs.Sprite = assetManager.getSprite("sprites", "", 0,0);
        this.gameOverScreen.addChild(gameOverSprite);

        //needs an animation frame to be passed in
        this.gameScreen = assetManager.getSprite("sprites", "", 0,0);

        this.eventStartGame = new createjs.Event("gameStarted", true, false);
        this.eventResetGame = new createjs.Event("gameReset", true, false);
        this.eventTitleActive = new createjs.Event("titleActive", true, false);
        this.eventGameOverActive = new createjs.Event("gameOverActive", true, false);

        
    }

    //private methods

    private hideAll():void {
        this.stage.removeChild(this.titleScreen);
        this.stage.removeChild(this.gameOverScreen);
        this.stage.removeChild(this.gameScreen);
    }

    //public methods

    public showTitleScreen():void {
        this.hideAll();
        this.stage.addChildAt(this.titleScreen, 0);
        this.stage.dispatchEvent(this.eventTitleActive);
        console.log("event dispatched: titleActive ");

    }

    public startDispatch():void {
        this.stage.dispatchEvent(this.eventStartGame);
        console.log("event dispatched: startGame ");

    }

}