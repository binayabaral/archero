class HealingItem {
	constructor(xPos, yPos) {
		this.x = xPos;
		this.y = yPos;
	}

	draw() {
		ctx.drawImage(healingItem, 0, 0, 50, 103, this.x - 10 / 2, this.y - 20 / 2, 10, 20);
	}

	update() {
		// MOVE THE ITEM TOWARDS HERO BY 10 ON EACH ITERATION
		Math.abs(this.x - hero.x) < 10 ? (this.x = hero.x) : this.x < hero.x ? (this.x += 10) : (this.x -= 10);
		Math.abs(this.y - hero.y) < 10 ? (this.y = hero.y) : this.y < hero.y ? (this.y += 10) : (this.y -= 10);

		if (this.x === hero.x && this.y === hero.y) {
			this.removeHealingItem(this);
		}
	}

	// COLLECT HEALING ITEM
	// INCREASE SCORE
	removeHealingItem(itemToRemove) {
		healingItems = healingItems.filter(item => !(item.x === itemToRemove.x && item.y === itemToRemove.y));
		hero.currentHealth = Math.min(hero.totalHealth, hero.currentHealth + 500);
	}
}
