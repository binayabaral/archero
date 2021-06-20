const hero = {
	heroImages: {
		current: heroImgCoord.back,
		back: heroImgCoord.back,
		downLeft: heroImgCoord.downLeft,
		downRight: heroImgCoord.downRight,
		front: heroImgCoord.front,
		topLeft: heroImgCoord.topLeft,
		topRight: heroImgCoord.topRight,
		left: heroImgCoord.left,
		right: heroImgCoord.right,
	},

	abilities: {
		arrowFront: false,
		arrowBack: false,
		arrowSide: false,
		arrowDiagonal: false,
		multishot: false,
		poison: false,
		bouncyWall: false,
		arrowPassThrough: false,
	},

	heroLevel: 1,

	x: 250,
	y: 590,
	dx: 2,
	dy: 2,

	// GET VALUE FROM LOCAL STORAGE. IF NO VALUE IS AVAILABLE, SET TO 1000
	totalHealth: parseInt(localStorage.getItem('archeroHeroTotalHealth')) || 1000,
	currentHealth: parseInt(localStorage.getItem('archeroHeroTotalHealth')) || 1000,

	// GET VALUE FROM LOCAL STORAGE. IF NO VALUE IS AVAILABLE, SET TO 300
	damagePerBullet: parseInt(localStorage.getItem('archeroHeroTotalDamagePerBullet')) || 300,

	draw: function () {
		// GET CURRENT HERO POSITION
		let currentImage = this.heroImages.current;
		// MINIMIZE HERO SIZE
		let width = currentImage.width / 4;
		let height = currentImage.height / 4;
		ctx.drawImage(heroSprite, currentImage.x, currentImage.y, currentImage.width, currentImage.height, this.x - width / 2, this.y - height / 2, width, height);

		// DRAW HERO HEALTH DETAILS
		ctx.beginPath();
		ctx.strokeStyle = 'black';
		ctx.rect(this.x - width / 2, this.y - height / 2, 30, 5);
		ctx.stroke();
		ctx.fillStyle = '#00f000';
		ctx.fillRect(this.x - width / 2, this.y - height / 2, (30 * this.currentHealth) / this.totalHealth, 4);
		ctx.font = '12px Arial';
		ctx.fillText(this.currentHealth, this.x - width / 2 + 3, this.y - height / 2);
		ctx.strokeText(this.currentHealth, this.x - width / 2 + 3, this.y - height / 2);
	},

	update: function () {
		// MOVE HERO ACCORDING TO KEY EVENTS
		if (pressedKeys.ArrowUp && pressedKeys.ArrowLeft) {
			this.heroImages.current = this.heroImages.topLeft;
			if (this.y > BATTLEGROUND_THRESHOLD_TOP) this.y -= this.dy;
			if (this.x > BATTLEGROUND_THRESHOLD_LEFT) this.x -= this.dx;
		} else if (pressedKeys.ArrowUp && pressedKeys.ArrowRight) {
			this.heroImages.current = this.heroImages.topRight;
			if (this.y > BATTLEGROUND_THRESHOLD_TOP) this.y -= this.dy;
			if (this.x < cvs.width - BATTLEGROUND_THRESHOLD_RIGHT) this.x += this.dx;
		} else if (pressedKeys.ArrowDown && pressedKeys.ArrowLeft) {
			this.heroImages.current = this.heroImages.downLeft;
			if (this.y < cvs.height - BATTLEGROUND_THRESHOLD_DOWN) this.y += this.dy;
			if (this.x > BATTLEGROUND_THRESHOLD_LEFT) this.x -= this.dx;
		} else if (pressedKeys.ArrowDown && pressedKeys.ArrowRight) {
			this.heroImages.current = this.heroImages.downRight;
			if (this.y < cvs.height - BATTLEGROUND_THRESHOLD_DOWN) this.y += this.dy;
			if (this.x < cvs.width - BATTLEGROUND_THRESHOLD_RIGHT) this.x += this.dx;
		} else if (pressedKeys.ArrowDown && pressedKeys.ArrowUp) {
			this.heroImages.current = this.heroImages.back;
		} else if (pressedKeys.ArrowLeft && pressedKeys.ArrowRight) {
			this.heroImages.current = this.heroImages.back;
		} else if (pressedKeys.ArrowUp) {
			this.heroImages.current = this.heroImages.back;
			if (this.y > BATTLEGROUND_THRESHOLD_TOP) this.y -= this.dy;
		} else if (pressedKeys.ArrowDown) {
			this.heroImages.current = this.heroImages.front;
			if (this.y < cvs.height - BATTLEGROUND_THRESHOLD_DOWN) this.y += this.dy;
		} else if (pressedKeys.ArrowLeft) {
			this.heroImages.current = this.heroImages.left;
			if (this.x > BATTLEGROUND_THRESHOLD_LEFT) this.x -= this.dx;
		} else if (pressedKeys.ArrowRight) {
			this.heroImages.current = this.heroImages.right;
			if (this.x < cvs.width - BATTLEGROUND_THRESHOLD_RIGHT) this.x += this.dx;
		} else {
			this.heroImages.current = this.heroImages.back;
			// GENERATE BULLET IF THERE IS NO HERO MOVEMENT, MONSTERS ARE NOT DEAD AND GAME STATE IS SET TO GAME
			if (frames % 15 === 0 && monsters.length && gameState.current === gameState.game) {
				let closestMonster = this.findClosestMonster();

				if (this.abilities.arrowFront) {
					bullets.push(new Bullet(this.x - 10, this.y, closestMonster.x - 10, closestMonster.y, 0));
					bullets.push(new Bullet(this.x + 10, this.y, closestMonster.x + 10, closestMonster.y, 0));
					if (this.abilities.multishot) {
						bullets.push(new Bullet(this.x - 10 - 15, this.y - 15, closestMonster.x - 10, closestMonster.y, 0));
						bullets.push(new Bullet(this.x + 10 - 15, this.y - 15, closestMonster.x + 10, closestMonster.y, 0));
					}
				} else {
					bullets.push(new Bullet(this.x, this.y, closestMonster.x, closestMonster.y, 0));
					if (this.abilities.multishot) bullets.push(new Bullet(this.x - 15, this.y - 15, closestMonster.x, closestMonster.y, 0));
				}

				if (this.abilities.arrowBack) {
					bullets.push(new Bullet(this.x, this.y, closestMonster.x, closestMonster.y, 0, 'reverse'));
					if (this.abilities.multishot) {
						bullets.push(new Bullet(this.x - 15, this.y - 15, closestMonster.x, closestMonster.y, 0, 'reverse'));
					}
				}

				if (this.abilities.arrowDiagonal) {
					bullets.push(new Bullet(this.x, this.y, closestMonster.x + cvs.width / 2, closestMonster.y + cvs.width / 2));
					bullets.push(new Bullet(this.x, this.y, closestMonster.x - cvs.width / 2, closestMonster.y - cvs.width / 2));
					if (this.abilities.multishot) {
						bullets.push(new Bullet(this.x + 15, this.y + 15, closestMonster.x + cvs.width / 2, closestMonster.y + cvs.width / 2));
						bullets.push(new Bullet(this.x + 15, this.y + 15, closestMonster.x - cvs.width / 2, closestMonster.y - cvs.width / 2));
					}
				}

				if (this.abilities.arrowSide) {
					bullets.push(new Bullet(this.x, this.y, closestMonster.x, closestMonster.y, 0, 'left'));
					bullets.push(new Bullet(this.x, this.y, closestMonster.x, closestMonster.y, 0, 'right'));
					if (this.abilities.multishot) {
						bullets.push(new Bullet(this.x + 15, this.y + 15, closestMonster.x, closestMonster.y, 0, 'left'));
						bullets.push(new Bullet(this.x + 15, this.y + 15, closestMonster.x, closestMonster.y, 0, 'right'));
					}
				}
			}
		}

		// CHECK COLLISION WITH MONSTER BULLETS
		bullets.forEach(
			function (bullet) {
				let distanceBetweenCentres = calculateDistance(this.x, this.y, bullet.xPos, bullet.yPos);
				let sumOfRadii = MONSTERS_BULLET_WIDTH_HEIGHT / 2 + bullet.width / 2;

				if (distanceBetweenCentres < sumOfRadii && bullet.type !== 0) {
					this.currentHealth -= bullet.damage;
					this.removeBullet(bullet);
				}
			}.bind(this)
		);

		// END THE GAME IF HEALTH OF HERO IS LESS THAN OR EQUAL TO0
		if (this.currentHealth <= 0) {
			this.currentHealth = 0;
			gameState.current = gameState.over;
		}

		// CHANGE STATE TO CHANGING LEVEL IF HERO IS AT THE TOP
		if (hero.x < cvs.width / 2 + 50 && hero.x > cvs.width / 2 - 50 && hero.y <= BATTLEGROUND_THRESHOLD_TOP + 10 && gameState.current === gameState.nextLvl) {
			hero.x = 250;
			hero.y = 590;
			changingLvl.recentChangingLvlFrame = frames;
			gameState.current = gameState.changingLvl;
		}
	},

	// REMOVE THE BULLET
	removeBullet(bulletToRemove) {
		bullets = bullets.filter(bullet => !(bullet.xPos === bulletToRemove.xPos && bullet.yPos === bulletToRemove.yPos));
	},

	// RETURNS THE POSITION OF CLOSEST MONSTER AS TARGET
	findClosestMonster() {
		let closestDistance = 9999999;
		let closestMonster;

		monsters.forEach(monster => {
			let distance = calculateDistance(this.x, this.y, monster.x, monster.y);
			if (distance < closestDistance) {
				closestMonster = monster;
				closestDistance = distance;
			}
		});

		return closestMonster;
	},
};
