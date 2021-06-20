// GAME STATES
const gameState = {
	current: 0,
	getReady: 0,
	game: 1,
	nextLvl: 2,
	over: 3,
	changingLvl: 4,
	abilitySelect: 5,
	currentLevel: 1,
};

// POSITIONS OF BUTTONS
const btnPositions = {
	playResetBtn: { x: cvs.width / 2 - 100, y: cvs.height - 100, width: 200, height: 50 },
	healthUpgradeBtn: { x: 30, y: 450, width: (cvs.width - 80) / 2, height: 65 },
	damageUpgradeBtn: { x: 50 + (cvs.width - 80) / 2, y: 450, width: (cvs.width - 80) / 2, height: 65 },
	abilitySelectBtn1: { x: 30, y: 320, width: 80, height: 80 },
	abilitySelectBtn2: { x: 140, y: 320, width: 80, height: 80 },
	abilitySelectBtn3: { x: 250, y: 320, width: 80, height: 80 },
};

// GET READY STATE
const getReady = {
	draw() {
		// DRAW OVERLAY WITH OPACITY
		ctx.beginPath();
		ctx.fillStyle = '#000';
		ctx.globalAlpha = 0.5;
		ctx.rect(0, 0, cvs.width, cvs.height);
		ctx.fill();
		ctx.globalAlpha = 1;
		ctx.stroke();

		// DRAW HERO FRONT IMAGE
		ctx.drawImage(heroSprite, heroImgCoord.front.x, heroImgCoord.front.y, heroImgCoord.front.width, heroImgCoord.front.height, cvs.width / 2 - heroImgCoord.front.width / 2, 170 - heroImgCoord.front.height / 2, heroImgCoord.front.width, heroImgCoord.front.height);

		// WRITE CURRENT HEALTH AND DAMAGE INFORMATION
		ctx.font = '22px Arial';
		ctx.fillStyle = '#fff';
		ctx.fillText('Health: ' + hero.totalHealth, 30, 360);
		ctx.fillText('Damage: ' + hero.damagePerBullet, 30, 400);

		// DRAW HEALTH UPGRADE BUTTONS
		ctx.beginPath();
		ctx.fillStyle = '#fff';
		if (score.numberOfCoinsCollected < hero.totalHealth / 10) ctx.globalAlpha = 0.5;
		if (score.numberOfCoinsCollected > hero.totalHealth / 10) ctx.fillStyle = '#00e000';
		ctx.rect(btnPositions.healthUpgradeBtn.x, btnPositions.healthUpgradeBtn.y, btnPositions.healthUpgradeBtn.width, btnPositions.healthUpgradeBtn.height);
		ctx.fill();
		ctx.globalAlpha = 1;
		ctx.stroke();
		ctx.font = '17px Arial';
		ctx.fillStyle = '#000';
		ctx.fillText('Upgrade Health', btnPositions.healthUpgradeBtn.x + 10, btnPositions.healthUpgradeBtn.y + 25);
		ctx.drawImage(coinImg, 0, 0, COIN_IMAGE_WIDTH, COIN_IMAGE_HEIGHT, btnPositions.healthUpgradeBtn.x + 37, btnPositions.healthUpgradeBtn.y + 35, 20, 20);
		ctx.fillText(hero.totalHealth / 10, btnPositions.healthUpgradeBtn.x + 60, btnPositions.healthUpgradeBtn.y + 50);

		// DRAW DAMAGE UPGRADE BUTTONS
		ctx.beginPath();
		ctx.fillStyle = '#fff';
		if (score.numberOfCoinsCollected < hero.damagePerBullet / 10) ctx.globalAlpha = 0.5;
		if (score.numberOfCoinsCollected > hero.damagePerBullet / 10) ctx.fillStyle = '#00e000';
		ctx.rect(btnPositions.damageUpgradeBtn.x, btnPositions.damageUpgradeBtn.y, btnPositions.damageUpgradeBtn.width, btnPositions.damageUpgradeBtn.height);
		ctx.fill();
		ctx.globalAlpha = 1;
		ctx.stroke();
		ctx.font = '17px Arial';
		ctx.fillStyle = '#000';
		ctx.fillText('Upgrade Damage', btnPositions.damageUpgradeBtn.x + 3, btnPositions.damageUpgradeBtn.y + 25);
		ctx.drawImage(coinImg, 0, 0, COIN_IMAGE_WIDTH, COIN_IMAGE_HEIGHT, btnPositions.damageUpgradeBtn.x + 37, btnPositions.damageUpgradeBtn.y + 35, 20, 20);
		ctx.fillText(hero.damagePerBullet / 10, btnPositions.damageUpgradeBtn.x + 60, btnPositions.damageUpgradeBtn.y + 50);

		// DRAW PLAY BUTTON
		ctx.beginPath();
		ctx.fillStyle = '#ffd700';
		ctx.rect(btnPositions.playResetBtn.x, btnPositions.playResetBtn.y, btnPositions.playResetBtn.width, btnPositions.playResetBtn.height);
		ctx.fill();
		ctx.stroke();
		ctx.fillStyle = '#000';
		ctx.fillText('Start Game', btnPositions.playResetBtn.x + 55, btnPositions.playResetBtn.y + 30);
	},
};

const changingLvl = {
	recentChangingLvlFrame: 0,
	showChangingLvlFrameFor: 200,

	draw() {
		ctx.beginPath();
		ctx.fillStyle = '#000';
		ctx.globalAlpha = 0.6;
		ctx.rect(0, 0, cvs.width, cvs.height);
		ctx.fill();
		ctx.globalAlpha = 1;
		ctx.stroke();

		ctx.font = '40px Arial';
		ctx.fillStyle = '#fff';
		ctx.fillText('Get Ready!', cvs.width / 2 - 100, cvs.height / 2 - 20);
	},

	update() {
		if (this.recentChangingLvlFrame + this.showChangingLvlFrameFor <= frames && gameState.current === gameState.changingLvl) {
			gameState.currentLevel++;
			generateMonsters();
			gameState.current = gameState.game;
		}
	},
};

const gameOver = {
	draw() {
		ctx.beginPath();
		ctx.fillStyle = '#000';
		ctx.globalAlpha = 0.6;
		ctx.rect(0, 0, cvs.width, cvs.height);
		ctx.fill();
		ctx.globalAlpha = 1;
		ctx.stroke();

		ctx.font = '40px Arial';
		ctx.fillStyle = '#fff';
		ctx.fillText('Game Over!', cvs.width / 2 - 100, cvs.height / 2 - 20);

		ctx.beginPath();
		ctx.font = '17px Arial';
		ctx.fillStyle = '#ffd700';
		ctx.rect(btnPositions.playResetBtn.x, btnPositions.playResetBtn.y, btnPositions.playResetBtn.width, btnPositions.playResetBtn.height);
		ctx.fill();
		ctx.stroke();
		ctx.fillStyle = '#000';
		ctx.fillText('Reset Game', btnPositions.playResetBtn.x + 55, btnPositions.playResetBtn.y + 30);
	},
};

const abilitySelect = {
	abilitiesToChoose: [],

	abilityImages: {
		arrowFront: abilityArrowFront,
		arrowBack: abilityArrowBack,
		arrowSide: abilityArrowSide,
		arrowDiagonal: abilityArrowDiagonal,
		multishot: abilityMultishot,
		poison: abilityPoison,
		bouncyWall: abilityBouncyWall,
		arrowPassThrough: abilityArrowPassThrough,
	},

	draw() {
		ctx.beginPath();
		ctx.fillStyle = '#000';
		ctx.globalAlpha = 0.6;
		ctx.rect(0, 0, cvs.width, cvs.height);
		ctx.fill();
		ctx.globalAlpha = 1;
		ctx.stroke();

		ctx.font = '40px Arial';
		ctx.fillStyle = '#fff';
		ctx.fillText('Select Ability!', cvs.width / 2 - 115, 200);

		ctx.beginPath();
		ctx.drawImage(this.abilityImages[this.abilitiesToChoose[0]], 0, 0, 86, 90, btnPositions.abilitySelectBtn1.x, btnPositions.abilitySelectBtn1.y, btnPositions.abilitySelectBtn1.width, btnPositions.abilitySelectBtn1.height);
		ctx.fill();
		ctx.stroke();
		ctx.drawImage(this.abilityImages[this.abilitiesToChoose[1]], 0, 0, 86, 90, btnPositions.abilitySelectBtn2.x, btnPositions.abilitySelectBtn2.y, btnPositions.abilitySelectBtn2.width, btnPositions.abilitySelectBtn2.height);
		ctx.fill();
		ctx.stroke();
		ctx.drawImage(this.abilityImages[this.abilitiesToChoose[2]], 0, 0, 86, 90, btnPositions.abilitySelectBtn3.x, btnPositions.abilitySelectBtn3.y, btnPositions.abilitySelectBtn3.width, btnPositions.abilitySelectBtn3.height);
		ctx.fill();
		ctx.stroke();
	},

	getAbilitiesToSelect() {
		let availableAbilities = [];

		for (let key of Object.keys(hero.abilities)) {
			if (hero.abilities[key] === false) {
				availableAbilities.push(key);
			}
		}

		// SHUFFLE ARRAY
		let shuffled = availableAbilities.sort(() => 0.5 - Math.random());

		// GET SUB ARRAY OF SHUFFLED ARRAY
		this.abilitiesToChoose = shuffled.slice(0, 3);
	},
};
