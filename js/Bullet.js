class Bullet {
	constructor(startPosx, startPosy, destPosx = hero.x, destPosy = hero.y, type = 0, direction = 'forward') {
		this.xPos = startPosx;
		this.yPos = startPosy;

		this.startPosx = startPosx;
		this.startPosy = startPosy;

		this.type = type;

		this.destPosx = destPosx;
		this.destPosy = destPosy;

		this.bounceCount = 0;

		// TYPE 0 REPRESENTS HERO'S BULLET
		if (type === 0) {
			// SET HERO WEAPON POSITION FROM ARRAY OF AVAILABLE POSITIONS
			this.currentRotatePos = 0;
			this.totalRotatePos = heroBulletCoordinates.length;
		} else {
			// DIFFERENT DAMAGE FOR DIFFERENT MONSTERS
			this.damage = type === 1 ? 100 : type === 2 ? 300 : 200;
		}

		this.width = 20;
		this.height = 20;

		// DISTANCE TO BE TRAVELLED BY THE BULLET
		let distanceX = this.startPosx - this.destPosx;
		let distanceY = this.startPosy - this.destPosy;

		// BULLET SPEED VARIES FOR HERO AND MONSTER 10 FOR HERO 3 FOR MONSTERS
		let bulletMaxSpeed = type === 0 ? 10 : 3;

		// FIND LONGER DISTANCE AMONG X AND Y DISTANCE
		// SET SPEED TO THE LONGER DISTANCE
		// CALCULATE SPEED FOR OTHER DIRECTION
		if (Math.abs(distanceX) > Math.abs(distanceY)) {
			this.dx = this.destPosx > this.startPosx ? bulletMaxSpeed : -bulletMaxSpeed;
			if (direction === 'reverse') this.dx *= -1;
			this.dy = (distanceY / distanceX) * this.dx;
		} else {
			this.dy = this.destPosy > this.startPosy ? bulletMaxSpeed : -bulletMaxSpeed;
			if (direction === 'reverse') this.dy *= -1;
			this.dx = (distanceX / distanceY) * this.dy;
		}

		if (direction === 'left') {
			this.dx = -bulletMaxSpeed;
			this.dy = 0;
		}
		if (direction === 'right') {
			this.dx = bulletMaxSpeed;
			this.dy = 0;
		}
	}

	draw() {
		if (this.type === 0) {
			// DRAW HERO BULLET
			let currentBulletPos = heroBulletCoordinates[Math.floor(this.currentRotatePos)];
			ctx.drawImage(heroBullet, currentBulletPos.x, currentBulletPos.y, heroBulletWidth, heroBulletHeight, this.xPos - this.width / 2, this.yPos - this.height / 2, this.width, this.height);
		} else if (this.type === 1) {
			// DRAW MONSTERS BULLET
			ctx.drawImage(bullet1, 0, 0, MONSTERS_BULLET_WIDTH_HEIGHT, MONSTERS_BULLET_WIDTH_HEIGHT, this.xPos - MONSTERS_BULLET_WIDTH_HEIGHT / 2, this.yPos - MONSTERS_BULLET_WIDTH_HEIGHT / 2, MONSTERS_BULLET_WIDTH_HEIGHT / 2, MONSTERS_BULLET_WIDTH_HEIGHT / 2);
		} else if (this.type === 2) {
			ctx.drawImage(bullet2, 0, 0, MONSTERS_BULLET_WIDTH_HEIGHT, MONSTERS_BULLET_WIDTH_HEIGHT, this.xPos - MONSTERS_BULLET_WIDTH_HEIGHT / 2, this.yPos - MONSTERS_BULLET_WIDTH_HEIGHT / 2, MONSTERS_BULLET_WIDTH_HEIGHT, MONSTERS_BULLET_WIDTH_HEIGHT);
		} else if (this.type === 3) {
			ctx.drawImage(bullet3, 0, 0, MONSTERS_BULLET_WIDTH_HEIGHT, MONSTERS_BULLET_WIDTH_HEIGHT, this.xPos - MONSTERS_BULLET_WIDTH_HEIGHT / 2, this.yPos - MONSTERS_BULLET_WIDTH_HEIGHT / 2, MONSTERS_BULLET_WIDTH_HEIGHT / 2, MONSTERS_BULLET_WIDTH_HEIGHT / 2);
		}
	}

	update() {
		// CHANGE HERO WEAPON POSITION
		if (this.type === 0) {
			this.currentRotatePos += 0.7;
			this.currentRotatePos %= this.totalRotatePos;
		}

		// MAKE THE WEAPONS DISAPPEAR IF THEY HIT BOUNDARY
		if (this.xPos + this.dx > BATTLEGROUND_THRESHOLD_LEFT && this.xPos + this.dx < cvs.width - BATTLEGROUND_THRESHOLD_RIGHT) {
			this.xPos += this.dx;
		} else if (hero.abilities.bouncyWall && this.bounceCount < 2 && this.type === 0) {
			this.dx *= -1;
			this.bounceCount++;
		} else bullets = bullets.filter(bullet => bullet.xPos != this.xPos && bullet.yPos != this.yPos);

		if (this.yPos + this.dy > BATTLEGROUND_THRESHOLD_TOP + 20 && this.yPos + this.dy < cvs.height - BATTLEGROUND_THRESHOLD_DOWN + 30) {
			this.yPos += this.dy;
		} else if (hero.abilities.bouncyWall && this.bounceCount < 2 && this.type === 0) {
			this.dy *= -1;
			this.bounceCount++;
		} else bullets = bullets.filter(bullet => bullet.xPos != this.xPos && bullet.yPos != this.yPos);
	}

	// RETURNS THE POSITION OF CLOSEST MONSTER AS TARGET
	findClosestMonster() {
		let closestDistance = 9999999;
		let closestMonster;

		monsters.forEach(monster => {
			let distance = calculateDistance(this.startPosx, this.startPosy, monster.x, monster.y);
			if (distance < closestDistance) {
				closestMonster = monster;
				closestDistance = distance;
			}
		});

		return closestMonster;
	}
}
