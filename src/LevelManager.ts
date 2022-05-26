import { AssetManager } from "./AssetManager";
import { LEVEL_FIVE_THRESHOLD, LEVEL_FOUR_THRESHOLD, LEVEL_ONE_THRESHOLD, LEVEL_SEVEN_THRESHOLD, LEVEL_SIX_THRESHOLD, LEVEL_THREE_THRESHOLD, LEVEL_TWO_THRESHOLD } from "./Constants";


export class LevelManager{

    private stage:createjs.StageGL;
    
    private _activeLevel:number;
    private _defeatedEnemies:number;
    private _enemiesSpawned:number;
    private _readyToSpawn:boolean;
    private _threshold:number;

    private eventCompleteLevel:createjs.Event;
    private eventSpawnWave:createjs.Event;

    constructor(stage:createjs.StageGL){
        this.stage = stage;
        this._activeLevel = 1;
        this._enemiesSpawned = 0;
        this._readyToSpawn = true;
        this._threshold = 0;
        this._defeatedEnemies = 0;

        this.eventCompleteLevel = new createjs.Event("completeLevel", true, false);
        this.eventSpawnWave = new createjs.Event("spawnWave", true, false);
    }

    get activeLevel():number{
        return this._activeLevel;
    }

    set activeLevel(value:number){
        this._activeLevel = value;
    }

    get defeatedEnemies():number{
        return this._defeatedEnemies
    }

    set defeatedEnemies(value:number){
        this._defeatedEnemies = value;
    }

    get enemiesSpawned():number{
        return this._enemiesSpawned;
    }

    set enemiesSpawned(value:number){
        this._enemiesSpawned = value;
    }

    get readyToSpawn():boolean{
        return this._readyToSpawn;
    }

    set readyToSpawn(value:boolean){
        this._readyToSpawn = value;
    }

    get threshold():number{
        return this._threshold;
    }

    public checkWinCondition():void{
        switch (this._activeLevel){
            case 1:
                this._threshold = LEVEL_ONE_THRESHOLD;
                if (this._defeatedEnemies >= LEVEL_ONE_THRESHOLD){
                    this.stage.dispatchEvent(this.eventCompleteLevel);
                    this._activeLevel++;
                }
                break;
            
            case 2:
                this._threshold = LEVEL_TWO_THRESHOLD;
                if (this._defeatedEnemies >= LEVEL_TWO_THRESHOLD){
                    this.stage.dispatchEvent(this.eventCompleteLevel);
                    this._activeLevel++;
                }
                break;
            
            case 3:
                this._threshold = LEVEL_THREE_THRESHOLD;
                if (this._defeatedEnemies >= LEVEL_THREE_THRESHOLD){
                    this.stage.dispatchEvent(this.eventCompleteLevel);
                    this._activeLevel++;
                }
                break;
            
            case 4:
                this._threshold = LEVEL_FOUR_THRESHOLD;
                if (this._defeatedEnemies >= LEVEL_FOUR_THRESHOLD){
                    this.stage.dispatchEvent(this.eventCompleteLevel);
                    this._activeLevel++;
                }
                break;
            
            case 5:
                this._threshold = LEVEL_FIVE_THRESHOLD;
                if (this._defeatedEnemies >= LEVEL_FIVE_THRESHOLD){
                    this.stage.dispatchEvent(this.eventCompleteLevel);
                    this._activeLevel++;
                }
                break;
            
            case 6:
                this._threshold = LEVEL_SIX_THRESHOLD;
                if (this._defeatedEnemies >= LEVEL_SIX_THRESHOLD){
                    this.stage.dispatchEvent(this.eventCompleteLevel);
                    this._activeLevel++;
                }
                break;
            
            case 7:
                this._threshold = LEVEL_SEVEN_THRESHOLD;
                if (this._defeatedEnemies >= LEVEL_SEVEN_THRESHOLD){
                    this.stage.dispatchEvent(this.eventCompleteLevel);
                    this._activeLevel++;
                }
                break;
        }
    }

    public resetForNextLevel(){
        this._defeatedEnemies = 0;
        this._enemiesSpawned = 0;
    }

    public reset(){
        this._activeLevel = 1;
        this._defeatedEnemies = 0;
        this._enemiesSpawned = 0;
        this._readyToSpawn = true;
    }

    public checkWaveStatus(){
        if (this._readyToSpawn == false) {
            //console.log("not ready to spawn"); 
            return;
        }
        else{
            //console.log("ready to spawn");
        }

        if (this._defeatedEnemies % this._activeLevel == 0 || this._enemiesSpawned == 0){
            this.stage.dispatchEvent(this.eventSpawnWave);
            console.log("event dispatched: spawnWave");
            this._readyToSpawn = false;
        }
    }



}