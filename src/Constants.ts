// game constants
export const STAGE_WIDTH:number = 600;
export const STAGE_HEIGHT:number = 600;
export const WIDTH_IN_TILES:number = STAGE_WIDTH/40;
export const HEIGHT_IN_TILES:number = STAGE_HEIGHT/40;
export const FRAME_RATE:number = 30;
export const DEFAULT_VOLUME:number = 1;

export const DEFAULT_SPEED:number = 5;
export const DEFAULT_HEALTH:number = 10;
export const I_FRAMES_DEFAULT:number = 1000;

export const ENEMY_MAX:number = 25;
export const PICKUP_MAX:number = 4;

export const LEVEL_ONE_THRESHOLD:number = 6;
export const LEVEL_TWO_THRESHOLD:number = 12;
export const LEVEL_THREE_THRESHOLD:number = 18;
export const LEVEL_FOUR_THRESHOLD:number = 24;
export const LEVEL_FIVE_THRESHOLD:number = 30;
export const LEVEL_SIX_THRESHOLD:number = 36;
export const LEVEL_SEVEN_THRESHOLD:number = 42;

//general weapon constants
export const PROJECTILE_MAX:number = 20;
export const PLAYER_PROJECTILE_MAX:number = 20;
export const DEF_PROJECTILE_SPEED:number = 10;
export const DEF_PROJECTILE_DAMAGE:number = 2;
export const DEF_FIRE_DELAY:number = 500;

//weapon specific constants
export const PISTOL:string = "pistol";
export const PISTOL_ROUND:string = "sprites/firstplayable/bullet";
export const PISTOL_DAMAGE:number = 2;
export const PISTOL_AMMO_MAX:number = 200;
export const PISTOL_MAG_SIZE:number = 6;
export const PISTOL_RELOAD_DELAY:number = 2000;
export const PISTOL_FIRE_DELAY:number = 500;
export const PISTOL_SPEED:number = 10;

export const LASER:string = "laser";
export const LASER_ROUND:string = "sprites/firstplayable/laser";
export const LASER_DAMAGE:number = 3;
export const LASER_AMMO_MAX:number = 100;
export const LASER_MAG_SIZE:number = 10;
export const LASER_RELOAD_DELAY:number = 2500;
export const LASER_FIRE_DELAY:number = 250;
export const LASER_SPEED:number = 8;

export const RAILGUN:string = "railgun";
export const RAILGUN_ROUND:string = "sprites/firstplayable/railgun bullet";
export const RAILGUN_DAMAGE:number = 8;
export const RAILGUN_AMMO_MAX:number = 80;
export const RAILGUN_MAG_SIZE:number = 4;
export const RAILGUN_RELOAD_DELAY:number = 3000;
export const RAILGUN_FIRE_DELAY:number = 1666;
export const RAILGUN_SPEED:number = 15;

export const TESLA:string = "tesla";
export const TESLA_ROUND:string = "sprites/firstplayable/electric bullet";
export const TESLA_IMPACT_DAMAGE:number = 2;
export const TESLA_CHAIN_DAMAGE:number = 2;
export const TESLA_AMMO_MAX:number = 50;
export const TESLA_MAG_SIZE:number = 4;
export const TESLA_RELOAD_DELAY:number = 3000;
export const TESLA_FIRE_DELAY:number = 1333;
export const TESLA_SPEED:number = 5;

export const ROCKET:string = "rocket";
export const ROCKET_ROUND:string = "sprites/firstplayable/rocket";
export const ROCKET_AMMO_MAX:number = 16;
export const ROCKET_MAG_SIZE:number = 1;
export const ROCKET_IMPACT_DAMAGE:number = 12;
export const ROCKET_SPLASH_DAMAGE:number = 8;
export const ROCKET_RELOAD_DELAY:number = 4000;
export const ROCKET_FIRE_DELAY:number = 2333;
export const ROCKET_SPEED:number = 10;

export const ALIEN_BEAM:string = "alien_beam";
export const ALIEN_ROUND:string = "sprites/firstplayable/bullet";
export const ALIEN_BEAM_DAMAGE:number = 2;
export const ALIEN_BEAM_DELAY:number = 2000;
export const ALIEN_BEAM_SPEED:number = 7;
export const ALIEN_CONTACT_DAMAGE:number = 1;

export const NUMBER_OF_LEVELS:number = 5;

export const RIGHT_WALL:string = "sprites/firstplayable/wall right 1";
export const LEFT_WALL:string = "sprites/firstplayable/wall left 1";
export const BACK_WALL:string = "sprites/firstplayable/wall back1";
export const FRONT_WALL:string = "sprites/firstplayable/wall forward 1";
export const RIGHT_CORNER:string = "sprites/firstplayable/wall small right 1";
export const LEFT_CORNER:string = "sprites/firstplayable/wall small left 1";
export const FLOOR:string = "sprites/firstplayable/floor1";

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
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/wall back1", "sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1", "sprites/firstplayable/wall left 1"], 
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/wall back1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
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
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/wall back1", "sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1", "sprites/firstplayable/wall left 1"], 
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/wall back1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/wall back1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall small right 1", "sprites/firstplayable/wall forward 1", "sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1", "sprites/firstplayable/wall small left 1"],
],
[ 
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/wall back1", "sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1", "sprites/firstplayable/wall left 1"], 
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/wall back1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/wall back1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall small right 1", "sprites/firstplayable/wall forward 1", "sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1", "sprites/firstplayable/wall small left 1"],
],
[ 
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/wall back1", "sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1", "sprites/firstplayable/wall left 1"], 
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/wall back1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/wall back1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/wall back1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall small right 1", "sprites/firstplayable/wall forward 1", "sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1", "sprites/firstplayable/wall small left 1"],
],
[ 
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/wall back1", "sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1", "sprites/firstplayable/wall left 1"], 
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/wall back1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/wall back1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/wall back1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/wall back1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall small right 1", "sprites/firstplayable/wall forward 1", "sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1", "sprites/firstplayable/wall small left 1"],
],
[ 
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/wall back1", "sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1","sprites/firstplayable/wall back1", "sprites/firstplayable/wall left 1"], 
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/wall back1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/wall back1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/wall back1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/wall back1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/wall back1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1","sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
[ "sprites/firstplayable/wall small right 1", "sprites/firstplayable/wall forward 1", "sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1","sprites/firstplayable/wall forward 1", "sprites/firstplayable/wall small left 1"],
],
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
        src:"./lib/sounds/Ammo.wav",
        id:"Ammo",
        data:2
    },
    {
        type:"sound",
        src:"./lib/sounds/Combat.wav",
        id:"Combat",
        data:1
    },
    {
        type:"sound",
        src:"./lib/sounds/EnemyDeath.wav",
        id:"EnemyDeath",
        data:6
    },
    {
        type:"sound",
        src:"./lib/sounds/EnemyHurt.wav",
        id:"EnemyHurt",
        data:6
    },
    {
        type:"sound",
        src:"./lib/sounds/Heal.wav",
        id:"Heal",
        data:2
    },
    {
        type:"sound",
        src:"./lib/sounds/Laser.wav",
        id:"Laser",
        data:4
    },
    {
        type:"sound",
        src:"./lib/sounds/MainMenu.wav",
        id:"MainMenu",
        data:1
    },
    {
        type:"sound",
        src:"./lib/sounds/MainMenuAlt.wav",
        id:"MainMenuAlt",
        data:1
    },
    {
        type:"sound",
        src:"./lib/sounds/Pause.wav",
        id:"Pause",
        data:1
    },
    {
        type:"sound",
        src:"./lib/sounds/Pistol.wav",
        id:"Pistol",
        data:4
    },
    {
        type:"sound",
        src:"./lib/sounds/PlayerDamage.wav",
        id:"PlayerDamage",
        data:1
    },
    {
        type:"sound",
        src:"./lib/sounds/PlayerDeath.wav",
        id:"PlayerDeath",
        data:1
    },
    {
        type:"sound",
        src:"./lib/sounds/Railgun.wav",
        id:"Railgun",
        data:1
    },
    {
        type:"sound",
        src:"./lib/sounds/Select.wav",
        id:"Select",
        data:2
    },
    {
        type:"sound",
        src:"./lib/sounds/Unpause.wav",
        id:"Unpause",
        data:1
    }
];