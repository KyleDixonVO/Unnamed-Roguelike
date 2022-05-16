import { AssetManager } from "./AssetManager";
import { LASER, LASER_DAMAGE, PISTOL, PISTOL_DAMAGE, RAILGUN, ROCKET, ROCKET_IMPACT_DAMAGE, ROCKET_SPLASH_DAMAGE, TESLA, TESLA_CHAIN_DAMAGE, TESLA_IMPACT_DAMAGE, RAILGUN_DAMAGE, DEF_PROJECTILE_DAMAGE, DEF_PROJECTILE_SPEED, PISTOL_FIRE_DELAY, TESLA_FIRE_DELAY, LASER_FIRE_DELAY, ROCKET_FIRE_DELAY, RAILGUN_FIRE_DELAY, DEF_FIRE_DELAY, PISTOL_ROUND, TESLA_ROUND, LASER_ROUND, ROCKET_ROUND, PISTOL_SPEED, TESLA_SPEED, LASER_SPEED, ROCKET_SPEED, RAILGUN_SPEED, RAILGUN_ROUND, ALIEN_BEAM, ALIEN_BEAM_DELAY, ALIEN_BEAM_DAMAGE, ALIEN_ROUND, ALIEN_BEAM_SPEED, PISTOL_MAG_SIZE, PISTOL_RELOAD_DELAY, TESLA_RELOAD_DELAY, LASER_RELOAD_DELAY, ROCKET_RELOAD_DELAY, PISTOL_AMMO_MAX, LASER_AMMO_MAX, TESLA_AMMO_MAX, ROCKET_AMMO_MAX, RAILGUN_AMMO_MAX} from "./Constants";
import { GameCharacter } from "./GameCharacter";

export class Inventory {
    
    private gameCharacter:GameCharacter;
    private _currentWeapon:string;
    private _pistolAmmo:number;
    private _laserAmmo:number;
    private _railgunAmmo:number;
    private _teslagunAmmo:number;
    private _rocketAmmo:number;
    private _currentWeaponDamage:number;
    private _currentFireDelay:number;
    private _splashDamage:number;
    private _currentProjectileSpeed:number;
    private _currentProjectileSprite:string;
    private _currentWeaponSprite:string;
    private _currentWeaponAmmo:number;
    private _currentReloadDelay:number;

    constructor(gameCharacter:GameCharacter){
        this.gameCharacter = gameCharacter;
        this._currentWeapon = PISTOL;
        
        this._currentReloadDelay = PISTOL_RELOAD_DELAY;
        this._pistolAmmo = PISTOL_AMMO_MAX;
        this._railgunAmmo = RAILGUN_AMMO_MAX;
        this._rocketAmmo = ROCKET_AMMO_MAX;
        this._teslagunAmmo = TESLA_AMMO_MAX;
        this._laserAmmo = LASER_AMMO_MAX;
        this._currentWeaponAmmo = this._pistolAmmo;
    }

    // ------------------------------------------------------------------------------------------------- gets/sets
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

    get splashDamage():number{
        return this._splashDamage;
    }

    get currentProjectileSpeed():number{
        return this._currentProjectileSpeed;
    }

    get currentProjectileSprite():string{
        return this._currentProjectileSprite;
    }

    get currentWeaponSprite():string{
        return this._currentWeaponSprite;
    }

    get currentWeaponAmmo():number{
        return this._currentWeaponAmmo;
    }

    set currentWeaponAmmo(value:number){
        this._currentWeaponAmmo = value;
    }

    //-------------------------------------------------------------------------------------------------------------- private methods

    private checkEquippedWeapon():void{
        switch (this._currentWeapon){
            case PISTOL:
                this._currentFireDelay = PISTOL_FIRE_DELAY;
                this._currentWeaponDamage = PISTOL_DAMAGE;
                this._splashDamage = 0;
                this._currentWeaponSprite = "";
                this._currentProjectileSprite = PISTOL_ROUND;
                this._currentProjectileSpeed = PISTOL_SPEED;
                this._currentWeaponAmmo = this._pistolAmmo;
                break;

            case TESLA:
                this._currentFireDelay = TESLA_FIRE_DELAY;
                this._currentWeaponDamage = TESLA_IMPACT_DAMAGE;
                this._splashDamage = TESLA_CHAIN_DAMAGE;
                this._currentProjectileSprite = TESLA_ROUND;
                this._currentProjectileSpeed = TESLA_SPEED;
                this._currentWeaponAmmo = this._teslagunAmmo;
                break;

            case LASER:
                this._currentFireDelay = LASER_FIRE_DELAY;
                this._currentWeaponDamage = LASER_DAMAGE;
                this._splashDamage = 0;
                this._currentProjectileSprite = LASER_ROUND;
                this._currentProjectileSpeed = LASER_SPEED;
                this._currentWeaponAmmo = this._laserAmmo;
                break;
            
            case ROCKET:
                this._currentFireDelay = ROCKET_FIRE_DELAY;
                this._currentWeaponDamage = ROCKET_IMPACT_DAMAGE;
                this._splashDamage = ROCKET_SPLASH_DAMAGE;
                this._currentProjectileSprite = ROCKET_ROUND;
                this._currentProjectileSpeed = ROCKET_SPEED;
                this._currentWeaponAmmo = this._rocketAmmo;
                break;

            case RAILGUN:
                this._currentFireDelay = RAILGUN_FIRE_DELAY;
                this._currentWeaponDamage = RAILGUN_DAMAGE;
                this._splashDamage = 0;
                this._currentProjectileSprite = RAILGUN_ROUND;
                this._currentProjectileSpeed = RAILGUN_SPEED;
                this._currentWeaponAmmo = this._railgunAmmo;
                break;

            case ALIEN_BEAM:
                this._currentFireDelay = ALIEN_BEAM_DELAY;
                this._currentWeaponDamage = ALIEN_BEAM_DAMAGE;
                this._splashDamage = 0;
                this._currentProjectileSprite = ALIEN_ROUND;
                this._currentProjectileSpeed = ALIEN_BEAM_SPEED;

            default:
                this._currentFireDelay = DEF_FIRE_DELAY;
                this._currentWeaponDamage = DEF_PROJECTILE_DAMAGE;
                this._splashDamage = 0;
                this._currentProjectileSpeed = DEF_PROJECTILE_SPEED;
                this._currentProjectileSprite = PISTOL_ROUND;

                break;

        }
    }

    // ----------------------------------------------------------------------------------------------- public methods

    public update():void{
        //console.log(this._currentWeaponAmmo);
        this.checkEquippedWeapon();
    }

    public refillAmmo():void{
        this._pistolAmmo = PISTOL_AMMO_MAX;
        this._laserAmmo = LASER_AMMO_MAX;
        this._teslagunAmmo = TESLA_AMMO_MAX;
        this._rocketAmmo = ROCKET_AMMO_MAX;
        this._railgunAmmo = RAILGUN_AMMO_MAX;
    }

    public decrementAmmo():void{
        switch (this._currentWeapon){
            case PISTOL:
                this._pistolAmmo--;
                break;
            
            case LASER:
                this._laserAmmo--;
                break;
            
            case RAILGUN:
                this._railgunAmmo--;
                break;
            
            case ROCKET:
                this._rocketAmmo--;
                break;
            
            case TESLA:
                this._teslagunAmmo--;
                break;
        }
    }

    // public swapWeapons():void{
    //     if (this._currentWeapon == this._weaponSlot1){
    //         this._currentWeapon = this._weaponSlot2;
    //         this._currentWeaponMagazine = this._weaponMagazine2;
    //     }
    //     else{
    //         this._currentWeapon = this._weaponSlot1;
    //         this._currentWeaponMagazine = this._weaponMagazine1;
    //     }
    // }
}