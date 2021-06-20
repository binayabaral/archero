class Monster {
	constructor(type = 0) {
		this.totalHealth = (1000 * gameState.currentLevel) / 2;
		this.currentHealth = (1000 * gameState.currentLevel) / 2;
		this.type = type;

		this.image = monsterImageArray[type];
		this.imageVariants = {
			current: monstersImgCoord.back,
			back: monstersImgCoord.back,
			downLeft: monstersImgCoord.downLeft,
			downRight: monstersImgCoord.downRight,
			front: monstersImgCoord.front,
			topLeft: monstersImgCoord.topLeft,
			topRight: monstersImgCoord.topRight,
			left: monstersImgCoord.left,
			right: monstersImgCoord.right,
		};

		let position = getRandomPositionWithinPlayground();
		this.x = position.x;
		this.y = position.y;

		this.dx = 0;
		this.dy = 0;

		this.moveHorizontal = 0;
		this.moveVertical = 0;
	}

	draw() {
		// GET CURRENT POSITION OF MONSTER
		let currentImage = this.imageVariants.current;
		ctx.drawImage(this.image, currentImage.x, currentImage.y, currentImage.width, currentImage.height, this.x - currentImage.width / 2, this.y - currentImage.height / 2, currentImage.width * 1.2, currentImage.height * 1.2);

		// DRAW MONSTER'S HEALTH BAR
		ctx.beginPath();
		ctx.strokeStyle = 'black';
		ctx.rect(this.x - currentImage.width / 2, this.y - currentImage.height / 2, 30, 5);
		ctx.stroke();
		ctx.fillStyle = '#00f000';
		ctx.fillRect(this.x - currentImage.width / 2, this.y - currentImage.height / 2, (30 * this.currentHealth) / this.totalHealth, 4);
	}

	update() {
		// REMOVE MONSTER WITH HEALTH LESS THAN OR EQUAL TO ZERO
		if (this.currentHealth <= 0) {
			this.removeCurrentMonster(this);
		}

		// CHANGE MOVEMENT OF MONSTER EVERY 200 FRAMES + DEDUCT HEALTH OF MONSTER IF HERO HAS POISON ABILITY
		if (frames % 200 === 0) {
			this.dx = getRandomNumberWithinRange(-1, 1);
			this.dy = getRandomNumberWithinRange(-1, 1);

			if (hero.abilities.poison) this.currentHealth -= 20;
		} else if (frames % 100 === 0) {
			// OVERWRITE IF MONSTER SHOULD MOVE OR NOT
			if (getRandomNumberWithinRange(0, 1)) {
				this.dx = this.dy = 0;
			}
		}

		// RANDOMLY FIRE BULLETS FROM MONSTERS
		if (getRandomNumberWithinRange(0, 300) === 5) {
			bullets.push(new Bullet(this.x, this.y, hero.x, hero.y, this.type + 1));
			if (this.type === 0) {
				bullets.push(new Bullet(this.x, this.y, hero.x + 40, hero.y, this.type + 1));
				bullets.push(new Bullet(this.x, this.y, hero.x - 40, hero.y, this.type + 1));
			}
		}

		// MOVE MONSTERS INSIDE BOUNDARY
		if (this.x + this.dx + 5 < cvs.width - BATTLEGROUND_THRESHOLD_RIGHT && this.x + this.dx > BATTLEGROUND_THRESHOLD_LEFT) {
			this.x += this.dx;
			this.dx > 0 ? (this.moveHorizontal = 1) : this.dx < 0 ? (this.moveHorizontal = -1) : (this.moveHorizontal = 0);
		}

		if (this.y + this.dy - 15 < cvs.height - BATTLEGROUND_THRESHOLD_DOWN && this.y + this.dy - 35 > BATTLEGROUND_THRESHOLD_TOP) {
			this.y += this.dy;
			this.dy > 0 ? (this.moveVertical = 1) : this.dy < 0 ? (this.moveVertical = -1) : (this.moveVertical = 0);
		}

		// CHANGE IMAGE VARIANT OF MONSTERS ACCORDING TO THEIR MOVEMENT
		if (this.moveVertical === 0 && this.moveHorizontal === 0) this.imageVariants.current = this.imageVariants.front;
		else if (this.moveVertical === 0 && this.moveHorizontal === 1) this.imageVariants.current = this.imageVariants.right;
		else if (this.moveVertical === 0 && this.moveHorizontal === -1) this.imageVariants.current = this.imageVariants.left;
		else if (this.moveVertical === 1 && this.moveHorizontal === 0) this.imageVariants.current = this.imageVariants.back;
		else if (this.moveVertical === 1 && this.moveHorizontal === 1) this.imageVariants.current = this.imageVariants.topRight;
		else if (this.moveVertical === 1 && this.moveHorizontal === -1) this.imageVariants.current = this.imageVariants.topLeft;
		else if (this.moveVertical === -1 && this.moveHorizontal === 0) this.imageVariants.current = this.imageVariants.back;
		else if (this.moveVertical === -1 && this.moveHorizontal === 1) this.imageVariants.current = this.imageVariants.downRight;
		else if (this.moveVertical === -1 && this.moveHorizontal === -1) this.imageVariants.current = this.imageVariants.downLeft;

		// CHECK BULLET COLLISION
		let currentImage = this.imageVariants.current;
		bullets.forEach(
			function (bullet) {
				let distanceBetweenCentres = calculateDistance(this.x, this.y, bullet.xPos, bullet.yPos);
				let sumOfRadii = currentImage.width / 2 + bullet.width / 2;

				if (distanceBetweenCentres < sumOfRadii && bullet.type === 0) {
					this.currentHealth -= hero.damagePerBullet;
					if (!hero.abilities.arrowPassThrough) this.removeBullet(bullet);
				}
			}.bind(this)
		);
	}

	// REMOVE BULLET
	removeBullet(bulletToRemove) {
		bullets = bullets.filter(bullet => !(bullet.xPos === bulletToRemove.xPos && bullet.yPos === bulletToRemove.yPos));
	}

	// REMOVE MONSTER
	removeCurrentMonster(monsterToRemove) {
		monsters = monsters.filter(monster => !(monster.x === monsterToRemove.x && monster.y === monsterToRemove.y));
		coins.push(new Coin(monsterToRemove.x, monsterToRemove.y));
		if (getRandomNumberWithinRange(0, 10) <= 2) {
			healingItems.push(new HealingItem(monsterToRemove.x, monsterToRemove.y));
		}
	}
}
