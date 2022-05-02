/*
* AssetManager Class
* GAME2050 Game Programming I
* Sean Morrow
*/
export class AssetManager {

    private stage:createjs.StageGL;
    private spriteSheets:any;
    private spriteSheetsJSON:any;
    private preloader:createjs.LoadQueue;
    private eventAllLoaded:createjs.Event;

    constructor(stage:createjs.StageGL) {
        this.stage = stage;
        // array of spritesheet objects
        this.spriteSheets = [];
        // array of JSON for each spritesheet
        this.spriteSheetsJSON = [];
        // LoadQueue object
        this.preloader = new createjs.LoadQueue();
        // construct custom event object and initialize it
        this.eventAllLoaded = new createjs.Event("allAssetsLoaded", true, false);
    }

	// ------------------------------------------------------ event handlers
    private onLoaded(e:createjs.Event):void {
        console.log("asset loaded: " + e.item.src + " | asset type: " + e.item.type);

        // what type of asset was loaded?
        switch(e.item.type) {
            case "json":
                // get spritesheet this JSON object belongs to and store for spritesheet construction later
                let spriteSheetID:string = e.item.id;
                this.spriteSheetsJSON[spriteSheetID] = e.result;
                break;
            case "image":
                // spritesheet loaded
                // get id and source from manifest of currently loaded spritesheet
                let id:string = e.item.id;
                // store a reference to the actual image that was preloaded
                let image:any = e.result;
                // get data object from JSON array (previously loaded)
                let data:any = this.spriteSheetsJSON[id];
                // add images property to data object and tack on loaded spritesheet image from LoadQueue
                // this is so that the SpriteSheet constructor doesn't preload the image again
                // it will do this if you feed it the string path of the spritesheet
                data.images = [image];
                // construct Spritesheet object from source
                let spriteSheet:createjs.SpriteSheet = new createjs.SpriteSheet(data);
                // store spritesheet object for later retrieval
                this.spriteSheets[id] = spriteSheet;
                break;
        }
    }

    // called if there is an error loading the spriteSheet (usually due to a 404)
    private onError(e:createjs.Event):void {
        console.log("ASSETMANAGER ERROR > Error Loading asset");
    }

    private onComplete(e:createjs.Event):void {
        console.log(">> All assets loaded");
        this.spriteSheetsJSON = null;
        // kill event listeners
        this.preloader.removeAllEventListeners();
        // dispatch event that all assets are loaded
        this.stage.dispatchEvent(this.eventAllLoaded);
    }

	// ------------------------------------------------------ public methods
    public getSprite(...args:any[]):createjs.Sprite {
        let [spriteSheetID, animationID, x, y] = args;

        // construct sprite object to animate the frames (I call this a clip)
        let sprite:createjs.Sprite = new createjs.Sprite(this.spriteSheets[spriteSheetID]);
        sprite.name = spriteSheetID;
        sprite.gotoAndStop(animationID);
        if (x == undefined) {
            x = 0;
            y = 0;
        }
        sprite.x = x;
        sprite.y = y;
        return sprite;
    }

	public getSpriteSheet(spriteSheetID:string):createjs.SpriteSheet {
		return this.spriteSheets[spriteSheetID];
	}

    public loadAssets(manifest:Array<Object>):void {
        // register different plugins for sound playback in browsers when available
        createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin, createjs.FlashAudioPlugin]);
        // if browser doesn't suppot the ogg it will attempt to look for an mp3
        createjs.Sound.alternateExtensions = ["mp3","wav"];
        // registers the PreloadJS object with SoundJS - will automatically have access to all sound assets
        this.preloader.installPlugin(createjs.Sound);

        // best solution is to use createjs on method which is an abstraction on addEventListener
        // third argument let's you pass in the scope of this
        this.preloader.on("fileload", this.onLoaded, this);
        this.preloader.on("error", this.onError, this);
        this.preloader.on("complete", this.onComplete, this);

        this.preloader.setMaxConnections(1);
        // load first spritesheet to start preloading process
        this.preloader.loadManifest(manifest);
    }
}