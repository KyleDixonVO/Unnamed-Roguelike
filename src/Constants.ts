// game constants
export const STAGE_WIDTH:number = 600;
export const STAGE_HEIGHT:number = 600;
export const FRAME_RATE:number = 30;
export const DEFAULT_SPEED:number = 5;
export const DEF_PROJECTILE_SPEED:number = 20
export const DEF_PROJECTILE_DAMAGE:number = 2;
export const DEFAULT_HEALTH:number = 10;
export const ENEMY_MAX:number = 25;
export const PROJECTILE_MAX:number = 100;
export const PISTOL_AMMO_MAX:number = 200;
export const LASER_AMMO_MAX:number = 100;
export const RAILGUN_AMMO_MAX:number = 80;
export const TESLA_AMMO_MAX:number = 50;
export const ROCKET_AMMO_MAX:number = 16;


export const ASSET_MANIFEST:Object[] = [
    {
        type:"json",
        src:"./lib/spritesheets/sprites.json",
        id:"sprites",
        data:0
    },
    {
        type:"image",
        src:"./lib/spritesheets/sprites.png",
        id:"sprites",
        data:0
    },
    {
        type:"sound",
        src:"./lib/sounds/beep.ogg",
        id:"beep",
        data:4
    }     
];