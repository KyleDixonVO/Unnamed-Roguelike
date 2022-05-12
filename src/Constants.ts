// game constants
export const STAGE_WIDTH:number = 600;
export const STAGE_HEIGHT:number = 600;
export const WIDTH_IN_TILES:number = STAGE_WIDTH/40;
export const HEIGHT_IN_TILES:number = STAGE_HEIGHT/40;
export const FRAME_RATE:number = 30;
export const DEFAULT_SPEED:number = 5;

export const DEFAULT_HEALTH:number = 10;
export const ENEMY_MAX:number = 25;

export const PROJECTILE_MAX:number = 20;
export const PLAYER_PROJECTILE_MAX:number = 10;
export const DEF_PROJECTILE_SPEED:number = 10;
export const DEF_PROJECTILE_DAMAGE:number = 2;

//weapon specific constants
export const PISTOL:string = "pistol";
export const PISTOL_DAMAGE:number = 2;
export const PISTOL_AMMO_MAX:number = 200;
export const LASER:string = "laser";
export const LASER_DAMAGE:number = 3;
export const LASER_AMMO_MAX:number = 100;
export const RAILGUN:string = "railgun";
export const RAILGUN_DAMAGE:number = 6;
export const RAILGUN_AMMO_MAX:number = 80;
export const TESLA:string = "tesla";
export const TESLA_IMPACT_DAMAGE:number = 2;
export const TESLA_CHAIN_DAMAGE:number = 2;
export const TESLA_AMMO_MAX:number = 50;
export const ROCKET:string = "rocket";
export const ROCKET_AMMO_MAX:number = 16;
export const ROCKET_IMPACT_DAMAGE:number = 12;
export const ROCKET_SPLASH_DAMAGE:number = 8;
export const ALIEN_BEAM:string = 'alien_beam'
export const ALIEN_BEAM_DAMAGE:number = 2;
export const ALIEN_CONTACT_DAMAGE:number = 1;
export const I_FRAMES_DEFAULT:number = 1000;
export const NUMBER_OF_LEVELS:number = 5;

export const LEVEL_DATA:Array<any> = [
[ 
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/wall back1", "sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1", "sprites/firstplayable/wall left 1"], 
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall small right 1", "sprites/firstplayable/wall forward 1", "sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1", "sprites/firstplayable/wall small left 1"],
],
[ 
[], 
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
],
[ 
[], 
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
],
[ 
[], 
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
],
[ 
[], 
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
],
[ 
[], 
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
],
[ 
[], 
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
]
];


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
        type:"json",
        src:"./lib/spritesheets/glyphs.json",
        id:"glyphs",
        data:0
    },
    {
        type:"image",
        src:"./lib/spritesheets/glyphs.png",
        id:"glyphs",
        data:0
    },
    {
        type:"sound",
        src:"./lib/sounds/beep.ogg",
        id:"beep",
        data:4
    }     
];