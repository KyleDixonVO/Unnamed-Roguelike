import { AssetManager } from "./AssetManager";
import { Inventory } from "./Inventory";
import { Player } from "./Player";
import { ScreenManager } from "./ScreenManager";

export class UserInterface {

    //private property vars
    private _score:number;
    private _paused:boolean;
    private _ammo:number;


    //private vars
    private healthSprite:createjs.Sprite;
    private stage:createjs.StageGL;
    private player:Player;
    private txtScore:createjs.BitmapText;
    private startButton:createjs.Sprite;
    private settingsButton:createjs.Sprite;
    private settingsMenu:createjs.Sprite;
    private pauseOverlay:createjs.Sprite;
    private settingsHeader:createjs.Sprite;
    private playerInventory:Inventory;
    private screenManager:ScreenManager;
    private healthBar:createjs.Sprite;
    private healthOutline:createjs.Sprite;
    private txtAmmo:createjs.BitmapText;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, player:Player, screenManager:ScreenManager, inventory:Inventory) {
        this.stage = stage;

        //need to create glyphs for score text
        this.txtScore = new createjs.BitmapText("0", assetManager.getSpriteSheet("glyphs"));
        this.txtScore.x = 250;
        this.txtScore.y = 20;
        this.txtScore.letterSpacing = 1;
        this.txtAmmo = new createjs.BitmapText("0", assetManager.getSpriteSheet("glyphs"));
        this.txtAmmo.x = 525;
        this.txtAmmo.y = 20;
        this.txtAmmo.letterSpacing = 1;
        this.startButton = new createjs.Sprite(assetManager.getSpriteSheet("sprites"));
        this.startButton.gotoAndStop("sprites/button/up");
        this.settingsButton = new createjs.Sprite(assetManager.getSpriteSheet("sprites"));
        this.settingsButton.gotoAndStop("sprites/button/settingsUp");
        this.pauseOverlay = new createjs.Sprite(assetManager.getSpriteSheet("sprites"));
        this.pauseOverlay.gotoAndStop("sprites/other/pauseOverlay");
        this.settingsHeader = new createjs.Sprite(assetManager.getSpriteSheet("sprites"));
        this.settingsHeader.gotoAndStop("sprites/other/settingsText");
        this.healthBar = new createjs.Sprite(assetManager.getSpriteSheet("sprites"));
        this.healthBar.gotoAndStop("sprites/other/healthBar");
        this.healthOutline = new createjs.Sprite(assetManager.getSpriteSheet("sprites"));
        this.healthOutline.gotoAndStop("sprites/other/healthOutline");
        this._paused = false;
        this.player = player;
        this.screenManager = screenManager;
        this.playerInventory = inventory;
        this._ammo = this.playerInventory.currentWeaponAmmo;


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

    set paused(value:boolean){
        this._paused = value;
    }

    get paused(){
        return this._paused;
    }

    set ammo(value:number) {
        this._ammo = value;
        this.txtAmmo.text = String(this._ammo);
    }
    
    get ammo():number{
        return this._ammo;
    }


    // ---------------------------------------------------------------------------------------- public methods
    public reset():void{
        this.score = 0;
        this.ammo = 0;
    }

    public showStartMenu(){
        this.startButton.x = 200;
        this.startButton.y = 450;
        this.stage.addChild(this.startButton);
        this.settingsButton.x = 350;
        this.settingsButton.y = 450;
        this.settingsButton.scaleY = 0.9;
        this.stage.addChild(this.settingsButton);
    }

    public onStartClick():void{
        this.startButton.on("mouseover", ()=> {
            this.startButton.gotoAndStop("sprites/button/over");
        });
        this.startButton.on("mouseout", ()=> {
            this.startButton.gotoAndStop("sprites/button/up");
        });
        this.startButton.on("click", ()=> {
            if (this._paused == true) return;
            this.screenManager.startDispatch();
        });
    }

    public onSettingsClick():void{
        this.settingsButton.on("mouseover", ()=> {
            this.settingsButton.gotoAndStop("sprites/button/settingsOver");
        });
        this.settingsButton.on("mouseout", ()=> {
            this.settingsButton.gotoAndStop("sprites/button/settingsUp");
        });
        this.settingsButton.on("click", ()=> {
            if (this._paused == true) return;
            this.screenManager.openSettings();
        });
    }

    public removeAll():void{
        this.stage.removeChild(this.startButton);
        this.stage.removeChild(this.settingsButton);
        this.stage.removeChild(this.pauseOverlay);
        this.stage.removeChild(this.healthBar);
        this.stage.removeChild(this.healthOutline);
        this.stage.removeChild(this.txtScore);
        this.stage.removeChild(this.txtScore);
    }

    public showSettingsMenu(){
        this._paused = true;
        this.pauseOverlay.x = 300;
        this.pauseOverlay.y = 300;
        this.stage.addChild(this.pauseOverlay);
        this.settingsHeader.x = 300;
        this.settingsHeader.y = 100;
        this.stage.addChild(this.settingsHeader);
    }

    public hideSettingsMenu(){
        this._paused = false;
        this.stage.removeChild(this.pauseOverlay);
        this.stage.removeChild(this.settingsHeader);
    }

    public showPlayerHUD(){
        this.healthBar.x = 15;
        this.healthBar.y = 30;
        this.healthBar.scaleY = 0.8;
        this.healthBar.alpha = 0.65;
        this.healthOutline.x = 10;
        this.healthOutline.y = 30;
        this.healthOutline.alpha = 0.65;
        this.healthOutline.scaleX = 1.05;
        this.stage.addChild(this.healthOutline);
        this.stage.addChild(this.healthBar);
        this.stage.addChild(this.txtScore);
        this.stage.addChild(this.txtAmmo);
    }

    public updateHUD(){
        this._ammo = this.playerInventory.currentWeaponAmmo;
        let scaleFactor:number;
        scaleFactor = this.player.health/this.player.healthMax;
        this.healthBar.scaleX = scaleFactor;
        this.txtScore.text = this._score.toString();
        this.txtAmmo.text = this._ammo.toString();
    }

    public incrementScore(){
        this._score++;
    }
}