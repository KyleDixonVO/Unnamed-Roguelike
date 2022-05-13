"use strict";
self["webpackHotUpdategame_programming_createjs_webpack"]("main",{

/***/ "./src/Constants.ts":
/*!**************************!*\
  !*** ./src/Constants.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ASSET_MANIFEST = exports.LEVEL_DATA = exports.NUMBER_OF_LEVELS = exports.ALIEN_CONTACT_DAMAGE = exports.ALIEN_BEAM_SPEED = exports.ALIEN_BEAM_DELAY = exports.ALIEN_BEAM_DAMAGE = exports.ALIEN_BEAM = exports.ROCKET_SPEED = exports.ROCKET_FIRE_DELAY = exports.ROCKET_SPLASH_DAMAGE = exports.ROCKET_IMPACT_DAMAGE = exports.ROCKET_AMMO_MAX = exports.ROCKET = exports.TESLA_SPEED = exports.TESLA_FIRE_DELAY = exports.TESLA_AMMO_MAX = exports.TESLA_CHAIN_DAMAGE = exports.TESLA_IMPACT_DAMAGE = exports.TESLA = exports.RAILGUN_SPEED = exports.RAILGUN_FIRE_DELAY = exports.RAILGUN_AMMO_MAX = exports.RAILGUN_DAMAGE = exports.RAILGUN = exports.LASER_SPEED = exports.LASER_FIRE_DELAY = exports.LASER_AMMO_MAX = exports.LASER_DAMAGE = exports.LASER = exports.PISTOL_SPEED = exports.PISTOL_FIRE_DELAY = exports.PISTOL_AMMO_MAX = exports.PISTOL_DAMAGE = exports.PISTOL = exports.DEF_FIRE_DELAY = exports.DEF_PROJECTILE_DAMAGE = exports.DEF_PROJECTILE_SPEED = exports.PLAYER_PROJECTILE_MAX = exports.PROJECTILE_MAX = exports.ENEMY_MAX = exports.I_FRAMES_DEFAULT = exports.DEFAULT_HEALTH = exports.DEFAULT_SPEED = exports.FRAME_RATE = exports.HEIGHT_IN_TILES = exports.WIDTH_IN_TILES = exports.STAGE_HEIGHT = exports.STAGE_WIDTH = void 0;
exports.STAGE_WIDTH = 600;
exports.STAGE_HEIGHT = 600;
exports.WIDTH_IN_TILES = exports.STAGE_WIDTH / 40;
exports.HEIGHT_IN_TILES = exports.STAGE_HEIGHT / 40;
exports.FRAME_RATE = 30;
exports.DEFAULT_SPEED = 5;
exports.DEFAULT_HEALTH = 10;
exports.I_FRAMES_DEFAULT = 1000;
exports.ENEMY_MAX = 25;
exports.PROJECTILE_MAX = 20;
exports.PLAYER_PROJECTILE_MAX = 10;
exports.DEF_PROJECTILE_SPEED = 10;
exports.DEF_PROJECTILE_DAMAGE = 2;
exports.DEF_FIRE_DELAY = 500;
exports.PISTOL = "pistol";
exports.PISTOL_DAMAGE = 2;
exports.PISTOL_AMMO_MAX = 200;
exports.PISTOL_FIRE_DELAY = 500;
exports.PISTOL_SPEED = 10;
exports.LASER = "laser";
exports.LASER_DAMAGE = 3;
exports.LASER_AMMO_MAX = 100;
exports.LASER_FIRE_DELAY = 250;
exports.LASER_SPEED = 8;
exports.RAILGUN = "railgun";
exports.RAILGUN_DAMAGE = 6;
exports.RAILGUN_AMMO_MAX = 80;
exports.RAILGUN_FIRE_DELAY = 1666;
exports.RAILGUN_SPEED = 15;
exports.TESLA = "tesla";
exports.TESLA_IMPACT_DAMAGE = 2;
exports.TESLA_CHAIN_DAMAGE = 2;
exports.TESLA_AMMO_MAX = 50;
exports.TESLA_FIRE_DELAY = 1333;
exports.TESLA_SPEED = 5;
exports.ROCKET = "rocket";
exports.ROCKET_AMMO_MAX = 16;
exports.ROCKET_IMPACT_DAMAGE = 12;
exports.ROCKET_SPLASH_DAMAGE = 8;
exports.ROCKET_FIRE_DELAY = 2333;
exports.ROCKET_SPEED = 10;
exports.ALIEN_BEAM = 'alien_beam';
exports.ALIEN_BEAM_DAMAGE = 2;
exports.ALIEN_BEAM_DELAY = 2000;
exports.ALIEN_BEAM_SPEED = 7;
exports.ALIEN_CONTACT_DAMAGE = 1;
exports.NUMBER_OF_LEVELS = 5;
exports.LEVEL_DATA = [
    [
        ["sprites/firstplayable/wall right 1", "sprites/firstplayable/wall back1", "sprites/firstplayable/wall back1", "sprites/firstplayable/wall back1", "sprites/firstplayable/wall back1", "sprites/firstplayable/wall back1", "sprites/firstplayable/wall back1", "sprites/firstplayable/wall back1", "sprites/firstplayable/wall back1", "sprites/firstplayable/wall back1", "sprites/firstplayable/wall back1", "sprites/firstplayable/wall back1", "sprites/firstplayable/wall back1", "sprites/firstplayable/wall back1", "sprites/firstplayable/wall left 1"],
        ["sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
        ["sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
        ["sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
        ["sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
        ["sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
        ["sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
        ["sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
        ["sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
        ["sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
        ["sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
        ["sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
        ["sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
        ["sprites/firstplayable/wall right 1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/floor1", "sprites/firstplayable/wall left 1"],
        ["sprites/firstplayable/wall small right 1", "sprites/firstplayable/wall forward 1", "sprites/firstplayable/wall forward 1", "sprites/firstplayable/wall forward 1", "sprites/firstplayable/wall forward 1", "sprites/firstplayable/wall forward 1", "sprites/firstplayable/wall forward 1", "sprites/firstplayable/wall forward 1", "sprites/firstplayable/wall forward 1", "sprites/firstplayable/wall forward 1", "sprites/firstplayable/wall forward 1", "sprites/firstplayable/wall forward 1", "sprites/firstplayable/wall forward 1", "sprites/firstplayable/wall forward 1", "sprites/firstplayable/wall small left 1"],
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
exports.ASSET_MANIFEST = [
    {
        type: "json",
        src: "./lib/spritesheets/sprites.json",
        id: "sprites",
        data: 0
    },
    {
        type: "image",
        src: "./lib/spritesheets/sprites.png",
        id: "sprites",
        data: 0
    },
    {
        type: "json",
        src: "./lib/spritesheets/glyphs.json",
        id: "glyphs",
        data: 0
    },
    {
        type: "image",
        src: "./lib/spritesheets/glyphs.png",
        id: "glyphs",
        data: 0
    },
    {
        type: "sound",
        src: "./lib/sounds/beep.ogg",
        id: "beep",
        data: 4
    }
];


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("c638d5f6439e57fb9144")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=main.e15475a8438f2c594460.hot-update.js.map