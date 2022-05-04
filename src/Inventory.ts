import { AssetManager } from "./AssetManager";
import { GameCharacter } from "./GameCharacter";

export class Inventory {
    
    private gameCharacter:GameCharacter;
    private _currentWeapon:string;
    private weaponSlot1:string;
    private weaponSlot2:string;
    private _pistolAmmo:number;
    private _laserAmmo:number;
    private _railgunAmmo:number;
    private _teslagunAmmo:number;
    private _rocketAmmo:number;

    constructor(gameCharacter:GameCharacter){
        this.gameCharacter = gameCharacter;
        this._currentWeapon = " "; 
    }

    get currentWeapon(){
        return this._currentWeapon;
    }

    get pistolAmmo(){
        return this._pistolAmmo;
    }

    get laserAmmo(){
        return this._laserAmmo;
    }

    get railgunAmmo(){
        return this._railgunAmmo;
    }

    get teslagunAmmo(){
        return this._teslagunAmmo;
    }

    get rocketAmmo(){
        return this._rocketAmmo;
    }
}