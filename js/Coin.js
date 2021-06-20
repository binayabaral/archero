class Coin {
	constructor(xPos, yPos) {
		this.x = xPos;
		this.y = yPos;
	}

	draw() {
		ctx.drawImage(coinImg, 0, 0, COIN_IMAGE_WIDTH, COIN_IMAGE_HEIGHT, this.x - COIN_IMAGE_WIDTH / 2, this.y - COIN_IMAGE_HEIGHT / 2, 20, 20);
	}

	update() {
		// MOVE THE COIN TOWARDS HERO BY 10 ON EACH ITERATION
		Math.abs(this.x - hero.x) < 10 ? (this.x = hero.x) : this.x < hero.x ? (this.x += 10) : (this.x -= 10);
		Math.abs(this.y - hero.y) < 10 ? (this.y = hero.y) : this.y < hero.y ? (this.y += 10) : (this.y -= 10);

		// CHANGE GAME STATE IF LEVEL INDICATOR BAR IS FULL
		if (hero.heroLevel < 7 && score.coinsCollectedInThisSession >= hero.heroLevel * 10) {
			abilitySelect.getAbilitiesToSelect();
			gameState.current = gameState.abilitySelect;
		}

		if (this.x === hero.x && this.y === hero.y) {
			this.removeCoin(this);
		}
	}

	// COLLECT COIN
	// INCREASE SCORE
	removeCoin(coinToRemove) {
		coins = coins.filter(coin => !(coin.x === coinToRemove.x && coin.y === coinToRemove.y));
		score.numberOfCoinsCollected++;
		score.coinsCollectedInThisSession++;
		localStorage.setItem('archeroCoins', score.numberOfCoinsCollected);
	}
}
