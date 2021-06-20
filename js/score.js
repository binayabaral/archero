const score = {
	numberOfCoinsCollected: parseInt(localStorage.getItem('archeroCoins')) || 0,

	scoreboardWidth: 100,
	scoreboardHeight: 30,
	defaultFill: '000000',
	coinsCollectedInThisSession: 0,

	draw() {
		// DISPLAY ONLY COIN STATS FOR GET READY STATE OTHERWISE DISPLAY BOTH COIN STATS AND COLLECTION BAR
		if (gameState.current !== gameState.getReady) this.drawHeroLevelIndicator();
		this.drawCoinsStats();
	},

	// DRAW COINS STATS AT TOP RIGHT
	drawCoinsStats() {
		ctx.beginPath();
		ctx.fillStyle = '#000';
		ctx.strokeStyle = '#000';
		ctx.globalAlpha = 0.5;
		ctx.rect(cvs.width - this.scoreboardWidth - 10, 10, this.scoreboardWidth, this.scoreboardHeight);
		ctx.fill();
		ctx.globalAlpha = 1;
		ctx.stroke();

		ctx.drawImage(coinImg, 0, 0, COIN_IMAGE_WIDTH, COIN_IMAGE_HEIGHT, cvs.width - this.scoreboardWidth + 20 - COIN_IMAGE_WIDTH / 2, 40 - COIN_IMAGE_HEIGHT / 2, 20, 20);

		// GET TOTAL COINS NUMBER IN 6 DIGIT FORMAT
		let formattedScore = (this.defaultFill + this.numberOfCoinsCollected).substr(String(this.numberOfCoinsCollected).length);
		ctx.font = '15px Arial';
		ctx.fillStyle = '#fff';
		ctx.fillText(formattedScore, cvs.width - this.scoreboardWidth + 26, 30);
	},

	drawHeroLevelIndicator() {
		ctx.font = '20px Arial';
		ctx.fillStyle = '#000';
		ctx.strokeStyle = '#000';
		ctx.fillText(hero.heroLevel < 7 ? 'Lvl ' + hero.heroLevel : 'Lvl Max', cvs.width / 2 - 18, 40);
		ctx.strokeText(hero.heroLevel < 7 ? 'Lvl ' + hero.heroLevel : 'Lvl Max', cvs.width / 2 - 18, 40);

		// BACKGROUND WITH OPACITY
		ctx.beginPath();
		ctx.fillStyle = '#000';
		ctx.strokeStyle = '#000';
		ctx.globalAlpha = 0.5;
		ctx.rect(50, 43, cvs.width - 100, 25);
		ctx.fill();
		ctx.globalAlpha = 1;
		ctx.stroke();

		// RECTANGLE TO DISPLAY PROGRESS
		ctx.beginPath();
		ctx.fillStyle = '#ffd700';
		if (hero.heroLevel <= 6) ctx.rect(51, 44, ((cvs.width - 102) / (hero.heroLevel * 10)) * this.coinsCollectedInThisSession, 23);
		else ctx.rect(51, 44, cvs.width - 102, 23);
		ctx.fill();
	},
};
