import { AssetManager } from "./AssetManager";
import { LEVEL_FIVE_THRESHOLD, LEVEL_FOUR_THRESHOLD, LEVEL_ONE_THRESHOLD, LEVEL_SEVEN_THRESHOLD, LEVEL_SIX_THRESHOLD, LEVEL_THREE_THRESHOLD, LEVEL_TWO_THRESHOLD } from "./Constants";


export class LevelManager{

    private stage:createjs.StageGL;
    private _activeLevel:number;
    private _defeatedEnemies:number;
    private _enemiesSpawned:number;
    private eventCompleteLevel:createjs.Event;
    private eventSpawnWave:createjs.Event;
    private _readyToSpawn:boolean;

    constructor(stage:createjs.StageGL){
        this.stage = stage;
        this._activeLevel = 1;
        this._enemiesSpawned = 0;
        this._readyToSpawn = true;

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

    public checkWinCondition():void{
        switch (this._activeLevel){
            case 1:
                if (this._defeatedEnemies == LEVEL_ONE_THRESHOLD){
                    this.stage.dispatchEvent(this.eventCompleteLevel);
                    this._activeLevel++;
                }
                break;
            
            case 2:
                if (this._defeatedEnemies == LEVEL_TWO_THRESHOLD){
                    this.stage.dispatchEvent(this.eventCompleteLevel);
                    this._activeLevel++;
                }
                break;
            
            case 3:
                if (this._defeatedEnemies == LEVEL_THREE_THRESHOLD){
                    this.stage.dispatchEvent(this.eventCompleteLevel);
                    this._activeLevel++;
                }
                break;
            
            case 4:
                if (this._defeatedEnemies == LEVEL_FOUR_THRESHOLD){
                    this.stage.dispatchEvent(this.eventCompleteLevel);
                    this._activeLevel++;
                }
            
            case 5:
                if (this._defeatedEnemies == LEVEL_FIVE_THRESHOLD){
                    this.stage.dispatchEvent(this.eventCompleteLevel);
                    this._activeLevel++;
                }
            
            case 6:
                if (this._defeatedEnemies == LEVEL_SIX_THRESHOLD){
                    this.stage.dispatchEvent(this.eventCompleteLevel);
                    this._activeLevel++;
                }
            
            case 7:
                if (this._defeatedEnemies == LEVEL_SEVEN_THRESHOLD){
                    this.stage.dispatchEvent(this.eventCompleteLevel);
                    this._activeLevel++;
                }
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
    }

    public checkWaveStatus(){
        if (this._readyToSpawn == false) return;
        if (this._defeatedEnemies % this._activeLevel == 1){
            this._readyToSpawn = false;
            this.stage.dispatchEvent(this.eventSpawnWave);
        }
    }


}