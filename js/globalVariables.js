// SELECT CANVAS
const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');

// GAME VARIABLES
let frames = 0;
let pressedKeys = {};
let monsters = [];
let bullets = [];
let coins = [];
let healingItems = [];

// LOAD HERO IMAGE
const heroSprite = new Image();
heroSprite.src = 'images/hero-sprite.png';

// HERO IMAGES CO-ORDIMATES
const heroImgCoord = {
	back: { x: 0, y: 0, width: 107, height: 242 },
	downLeft: { x: 157, y: 0, width: 98, height: 233 },
	downRight: { x: 305, y: 0, width: 149, height: 230 },
	front: { x: 504, y: 0, width: 113, height: 270 },
	topLeft: { x: 667, y: 0, width: 115, height: 257 },
	topRight: { x: 832, y: 0, width: 101, height: 235 },
	left: { x: 983, y: 0, width: 135, height: 250 },
	right: { x: 1168, y: 0, width: 115, height: 245 },
};

// LOAD MONSTERS IMAGES
const monsterImg1 = new Image();
monsterImg1.src = 'images/monster1.png';

const monsterImg2 = new Image();
monsterImg2.src = 'images/monster2.png';

const monsterImg3 = new Image();
monsterImg3.src = 'images/monster3.png';

// MONSTERS IMAGE CO-ORDINATES
const monstersImgCoord = {
	back: { x: 33, y: 0, width: 31, height: 34 },
	topLeft: { x: 0, y: 110, width: 32, height: 32 },
	topRight: { x: 33, y: 110, width: 33, height: 32 },
	front: { x: 0, y: 0, width: 31, height: 32 },
	downLeft: { x: 0, y: 70, width: 32, height: 32 },
	downRight: { x: 33, y: 70, width: 32, height: 32 },
	left: { x: 0, y: 38, width: 32, height: 26 },
	right: { x: 33, y: 38, width: 32, height: 26 },
};

// Monster Types with Images
const monsterImageArray = [monsterImg1, monsterImg2, monsterImg3];

// LOAD HERO BULLET
const heroBullet = new Image();
heroBullet.src = 'images/hero-bullet-sprite.png';

// HERO BULLET CO-ORDINATES
const heroBulletCoordinates = [
	{ x: 0, y: 0 },
	{ x: 144, y: 0 },
	{ x: 277, y: 0 },
	{ x: 403, y: 0 },
	{ x: 552, y: 0 },
	{ x: 689, y: 0 },
	{ x: 830, y: 0 },
];
const heroBulletWidth = 110;
const heroBulletHeight = 110;

// LOAD MONSTER BULLETS
const bullet1 = new Image();
bullet1.src = 'images/bullet1.png';

const bullet2 = new Image();
bullet2.src = 'images/bullet2.png';

const bullet3 = new Image();
bullet3.src = 'images/bullet3.png';

const MONSTERS_BULLET_WIDTH_HEIGHT = 20;

// LOAD GANE-ON BACKGROUND IMAGE
const bgImg = new Image();
bgImg.src = 'images/bg-lvl-on.jpg';

// LOAD GAME NEXT-LVL BACKGORUND IMAGE
const nextLvlBg = new Image();
nextLvlBg.src = 'images/bg-lvl-done.jpg';

// LOAD COIN IMAGE
const coinImg = new Image();
coinImg.src = 'images/coin.png';

// COIN DIMENSIONS
const COIN_IMAGE_HEIGHT = 50;
const COIN_IMAGE_WIDTH = 50;

// BATTLEGROUND THRESHOLDS
const BATTLEGROUND_THRESHOLD_TOP = 200;
const BATTLEGROUND_THRESHOLD_DOWN = 110;
const BATTLEGROUND_THRESHOLD_LEFT = 25;
const BATTLEGROUND_THRESHOLD_RIGHT = 25;

// LOAD ABILITY SELECT IMAGES
const abilityArrowBack = new Image();
abilityArrowBack.src = 'images/ability-arrow-back.png';

const abilityArrowDiagonal = new Image();
abilityArrowDiagonal.src = 'images/ability-arrow-diagonal.png';

const abilityArrowFront = new Image();
abilityArrowFront.src = 'images/ability-arrow-front.png';

const abilityArrowPassThrough = new Image();
abilityArrowPassThrough.src = 'images/ability-arrow-pass-through.png';

const abilityArrowSide = new Image();
abilityArrowSide.src = 'images/ability-arrow-side.png';

const abilityBouncyWall = new Image();
abilityBouncyWall.src = 'images/ability-bouncy-wall.png';

const abilityMultishot = new Image();
abilityMultishot.src = 'images/ability-multishot.png';

const abilityPoison = new Image();
abilityPoison.src = 'images/ability-poison.png';

// HEALING ITEM IMAGE
const healingItem = new Image();
healingItem.src = 'images/healingItem.png';
