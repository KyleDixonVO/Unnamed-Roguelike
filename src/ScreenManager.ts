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
    private eventOpenSettings:createjs.Event;
    private eventPaused:createjs.Event;
    private eventCloseSettings:createjs.Event;
    private eventUnpaused:createjs.Event;

    constructor(stage:createjs.StageGL, assetManager:AssetManager) {
        this.stage = stage;

        //container construction
        this.titleScreen = new createjs.Container();

        this.titleScreen.addChild(assetManager.getSprite("sprites", "sprites/other/titleScreen", 300,300));

        this.gameOverScreen = new createjs.Container();

        this.gameOverScreen.addChild(assetManager.getSprite("sprites", "sprites/other/gameOverScreen", 300,300));

        let gameOverSprite:createjs.Sprite = assetManager.getSprite("sprites", "sprites/other/gameOverScreen", 300,300);
        this.gameOverScreen.addChild(gameOverSprite);

        this.gameScreen = assetManager.getSprite("sprites", "sprites/other/background", 0,0);

        //custom event instantiation

        this.eventStartGame = new createjs.Event("gameStarted", true, false);
        this.eventResetGame = new createjs.Event("gameReset", true, false);
        this.eventTitleActive = new createjs.Event("titleActive", true, false);
        this.eventGameOverActive = new createjs.Event("gameOverActive", true, false);
        this.eventOpenSettings = new createjs.Event("openSettings", true, false);
        this.eventCloseSettings = new createjs.Event("closeSettings", true, false);
        this.eventPaused = new createjs.Event("gamePaused", true, false);
        this.eventUnpaused = new createjs.Event("gameUnpaused", true, false);

        
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

    public openSettings():void {
        this.stage.dispatchEvent(this.eventOpenSettings);
        console.log("event dispatched: openSettings");
    }

    public closeSettings():void {
        this.stage.dispatchEvent(this.eventCloseSettings);
        console.log("event dispatched: closeSettings");
    }



    public pauseGame():void{
        this.stage.dispatchEvent(this.eventPaused);
        console.log("event dispatched: gamePaused");
    }

    public unpauseGame():void{
        this.stage.dispatchEvent(this.eventUnpaused);
        console.log("event dispatched: gameUnpaused");
    }

    public showGame():void{
        this.hideAll();
        this.gameScreen.x = 300;
        this.gameScreen.y = 300;
        this.stage.addChild(this.gameScreen);
    }

    public showGameOverScreen():void{
        this.hideAll();
        this.gameOverScreen.x = 0;
        this.gameOverScreen.y = 0;
        this.stage.addChild(this.gameOverScreen);
        this.gameOverScreen.on("click", ()=> {
            this.stage.dispatchEvent(this.eventResetGame);
        })
    }

}