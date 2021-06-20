window.addEventListener('load', () => {
	loop();
	document.addEventListener('keydown', e => {
		pressedKeys[e.key] = true;
	});
	document.addEventListener('keyup', e => {
		pressedKeys[e.key] = false;
	});
	cvs.addEventListener('click', handleCanvasClick);
});

// DRAW
const draw = () => {
	background.draw();
	if (gameState.current === gameState.getReady) getReady.draw();
	score.draw();
	if (gameState.current !== gameState.getReady) {
		hero.draw();
		coins.forEach(coin => coin.draw());
		monsters.forEach(monster => monster.draw());
		bullets.forEach(bullet => bullet.draw());
		healingItems.forEach(item => item.draw());
	}
	if (gameState.current === gameState.changingLvl) {
		changingLvl.draw();
	}
	if (gameState.current === gameState.over) gameOver.draw();

	if (gameState.current === gameState.abilitySelect) abilitySelect.draw();
};

// UPDATE
const update = () => {
	if (gameState.current !== gameState.getReady) {
		hero.update();
		if (gameState.current !== gameState.abilitySelect) {
			bullets.forEach(bullet => bullet.update());
			healingItems.forEach(item => item.update());
		}
	}

	if (gameState.current === gameState.game) {
		monsters.forEach(monster => monster.update());
	}

	if (gameState.current === gameState.nextLvl) coins.forEach(coin => coin.update());
	frames++;

	if (monsters.length === 0 && gameState.current === gameState.game) gameState.current = gameState.nextLvl;

	if (gameState.current === gameState.changingLvl) {
		changingLvl.update();
	}
};

// LOOP
const loop = () => {
	update();
	draw();
	requestAnimationFrame(loop);
};
