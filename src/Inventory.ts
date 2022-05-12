import { AssetManager } from "./AssetManager";
import { LASER, LASER_DAMAGE, PISTOL, PISTOL_DAMAGE, RAILGUN, ROCKET, ROCKET_IMPACT_DAMAGE, ROCKET_SPLASH_DAMAGE, TESLA, TESLA_CHAIN_DAMAGE, TESLA_IMPACT_DAMAGE, RAILGUN_DAMAGE, DEF_PROJECTILE_DAMAGE, DEF_PROJECTILE_SPEED} from "./Constants";
import { GameCharacter } from "./GameCharacter";

export class Inventory {
    
    private gameCharacter:GameCharacter;
    private _currentWeapon:string;
    private _weaponSlot1:string;
    private _weaponSlot2:string;
    private _pistolAmmo:number;
    private _laserAmmo:number;
    private _railgunAmmo:number;
    private _teslagunAmmo:number;
    private _rocketAmmo:number;
    private _currentWeaponDamage:number;
    private _currentFireDelay:number;
    private _splashDamage:number;
    private _currentProjectileSpeed:number;

    constructor(gameCharacter:GameCharacter){
        this.gameCharacter = gameCharacter;
        this._weaponSlot1 = PISTOL;
        this._weaponSlot2 = null;
        this._currentWeapon = this._weaponSlot1;
    }

    set currentWeapon(value:string){
        this._currentWeapon = value;
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

    get fireDelay():number{
        return this._currentFireDelay;
    }

    get weaponDamage():number{
        return this._currentWeaponDamage;
    }

    get weaponSlot1():string{
        return this._weaponSlot1;
    }

    get weaponSlot2():string{
        return this._weaponSlot2;
    }

    get splashDamage():number{
        return this._splashDamage;
    }

    get currentProjectileSpeed():number{
        return this._currentProjectileSpeed;
    }

    public update():void{
        this.checkEquippedWeapon();
    }

    private checkEquippedWeapon():void{
        switch (this._currentWeapon){
            case PISTOL:
                //this._currentFireDelay = 
                this._currentWeaponDamage = PISTOL_DAMAGE;
                this._splashDamage = 0;
                break;

            case TESLA:
                //this._currentFireDelay = 
                this._currentWeaponDamage = TESLA_IMPACT_DAMAGE;
                this._splashDamage = TESLA_CHAIN_DAMAGE;
                break;

            case LASER:
                //this._currentFireDelay = 
                this._currentWeaponDamage = LASER_DAMAGE;
                this._splashDamage = 0;
                break;
            
            case ROCKET:
                //this._currentFireDelay = 
                this._currentWeaponDamage = ROCKET_IMPACT_DAMAGE;
                this._splashDamage = ROCKET_SPLASH_DAMAGE;
                break;

            case RAILGUN:
                //this._currentFireDelay = 
                this._currentWeaponDamage = RAILGUN_DAMAGE;
                this._splashDamage = 0;
                break;

            default:
                //this._currentFireDelay =
                this._currentWeaponDamage = DEF_PROJECTILE_DAMAGE;
                this._splashDamage = 0;
                this._currentProjectileSpeed = DEF_PROJECTILE_SPEED;

        
        }
    }
}