const background = {
	sourceX: 0,
	sourceY: 0,
	width: 360,
	height: 800,
	x: 0,
	y: -50,

	draw: function () {
		// CHOOSE THE CORRECT BACKGROUND IMAGE ACCORDING TO STATE OF THE GAME AND DRAW
		const currentBg = gameState.current === gameState.nextLvl ? nextLvlBg : bgImg;
		ctx.drawImage(currentBg, this.sourceX, this.sourceY, this.width, this.height, this.x, this.y, this.width, this.height);

		if (gameState.current === gameState.getReady) return;

		// LEVEL INDICATOR: NOT DRAWN ON GET READY STATE
		ctx.fillStyle = '#000';
		ctx.strokeStyle = '#fff';
		ctx.lineWidth = 0.7;
		ctx.font = '23px Teko';
		ctx.fillText(gameState.currentLevel, cvs.width / 2 - 8, 102);
		ctx.strokeText(gameState.currentLevel, cvs.width / 2 - 8, 102);
	},
};
