import { AssetManager } from "./AssetManager";

export class ScreenManager {

    private stage:createjs.StageGL;

    private titleScreen:createjs.Container;
    private gameScreen:createjs.Sprite;
    private gameOverScreen:createjs.Container;
    private winScreen:createjs.Container;
    private levelCompleteScreen:createjs.Container;

    //custom events
    private eventTitleActive:createjs.Event;
    private eventWin:createjs.Event;
    private eventStartGame:createjs.Event;
    private eventResetGame:createjs.Event;
    private eventOpenSettings:createjs.Event;
    private eventPaused:createjs.Event;
    private eventCloseSettings:createjs.Event;
    private eventUnpaused:createjs.Event;
    private eventLoadNextLevel:createjs.Event;

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

        this.winScreen = new createjs.Container();

        let winSprite:createjs.Sprite = assetManager.getSprite("sprites", "sprites/other/winScreen", 300, 300);
        this.winScreen.addChild(winSprite);

        this.levelCompleteScreen = new createjs.Container();

        let levelCompleteSprite:createjs.Sprite = assetManager.getSprite("sprites", "sprites/other/levelComplete", 300, 300);
        this.levelCompleteScreen.addChild(levelCompleteSprite);

        //custom event instantiation

        this.eventStartGame = new createjs.Event("gameStarted", true, false);
        this.eventResetGame = new createjs.Event("gameReset", true, false);
        this.eventTitleActive = new createjs.Event("titleActive", true, false);
        this.eventWin = new createjs.Event("gameWin", true, false);
        this.eventOpenSettings = new createjs.Event("openSettings", true, false);
        this.eventCloseSettings = new createjs.Event("closeSettings", true, false);
        this.eventPaused = new createjs.Event("gamePaused", true, false);
        this.eventUnpaused = new createjs.Event("gameUnpaused", true, false);
        this.eventLoadNextLevel = new createjs.Event("loadNextLevel", true, false);

        
    }

    //private methods

    private hideAll():void {
        this.stage.removeChild(this.titleScreen);
        this.stage.removeChild(this.gameOverScreen);
        this.stage.removeChild(this.gameScreen);
        this.stage.removeChild(this.winScreen);
        this.stage.removeChild(this.levelCompleteScreen);
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

    public dispatchWinScreen():void{
        this.stage.dispatchEvent(this.eventWin);
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

    public showWinScreen():void{
        this.hideAll();
        this.winScreen.x = 0;
        this.winScreen.y = 0;
        this.stage.addChild(this.winScreen);
        this.winScreen.on("click", ()=> {
            this.stage.dispatchEvent(this.eventResetGame);
        })
    }

    public showLevelComplete():void{
        this.hideAll();
        this.levelCompleteScreen.x = 0;
        this.levelCompleteScreen.y = 0;
        this.stage.addChild(this.levelCompleteScreen);
        this.levelCompleteScreen.on("click", ()=> {
            this.stage.dispatchEvent(this.eventLoadNextLevel);
        })
    }

}