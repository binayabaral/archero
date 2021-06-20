const handleCanvasClick = e => {
	// GET THE POSITION OF THE CANVAS
	let rect = cvs.getBoundingClientRect();
	// GET RELATIVE POSITION OF CLICKED POINT
	let clickX = e.clientX - rect.left;
	let clickY = e.clientY - rect.top;

	switch (gameState.current) {
		case gameState.getReady:
			// CHANGE THE STATE OF GAME TO GAME MODE WHEN PLAY BUTTON IS CLICKED
			if (clickX >= btnPositions.playResetBtn.x && clickX <= btnPositions.playResetBtn.x + btnPositions.playResetBtn.width && clickY >= btnPositions.playResetBtn.y && clickY <= btnPositions.playResetBtn.y + btnPositions.playResetBtn.height) {
				gameState.current = gameState.game;
				generateMonsters();
			}

			// UPGRADE HEALTH AND STORE INTO LOCAL STORAGE
			if (clickX >= btnPositions.healthUpgradeBtn.x && clickX <= btnPositions.healthUpgradeBtn.x + btnPositions.healthUpgradeBtn.width && clickY >= btnPositions.healthUpgradeBtn.y && clickY <= btnPositions.healthUpgradeBtn.y + btnPositions.healthUpgradeBtn.height) {
				if (score.numberOfCoinsCollected >= hero.totalHealth / 10) {
					score.numberOfCoinsCollected -= hero.totalHealth / 10;
					hero.totalHealth += 500;
					hero.currentHealth += 500;
					localStorage.setItem('archeroHeroTotalHealth', hero.totalHealth);
					localStorage.setItem('archeroCoins', score.numberOfCoinsCollected);
				}
			}

			// UPGRADE DAMAGE PER BULLET AND STORE INTO LOCAL STORAGE
			if (clickX >= btnPositions.damageUpgradeBtn.x && clickX <= btnPositions.damageUpgradeBtn.x + btnPositions.damageUpgradeBtn.width && clickY >= btnPositions.damageUpgradeBtn.y && clickY <= btnPositions.damageUpgradeBtn.y + btnPositions.damageUpgradeBtn.height) {
				if (score.numberOfCoinsCollected >= hero.damagePerBullet / 10) {
					score.numberOfCoinsCollected -= hero.damagePerBullet / 10;
					hero.damagePerBullet += 20;
					localStorage.setItem('archeroHeroTotalDamagePerBullet', hero.damagePerBullet);
					localStorage.setItem('archeroCoins', score.numberOfCoinsCollected);
				}
			}

			break;

		case gameState.over:
			// CHANGE THE STATE OF GAME TO GAME MODE WHEN PLAY BUTTON IS CLICKED
			if (clickX >= btnPositions.playResetBtn.x && clickX <= btnPositions.playResetBtn.x + btnPositions.playResetBtn.width && clickY >= btnPositions.playResetBtn.y && clickY <= btnPositions.playResetBtn.y + btnPositions.playResetBtn.height) {
				gameState.current = gameState.getReady;
				hero.currentHealth = hero.totalHealth;
				gameState.currentLevel = 1;
				coins = [];
				monsters = [];
				score.coinsCollectedInThisSession = 0;
				hero.heroLevel = 1;

				for (let key of Object.keys(hero.abilities)) {
					hero.abilities[key] = false;
				}
			}
			break;

		case gameState.abilitySelect:
			if (clickX >= btnPositions.abilitySelectBtn1.x && clickX <= btnPositions.abilitySelectBtn1.x + btnPositions.abilitySelectBtn1.width && clickY >= btnPositions.abilitySelectBtn1.y && clickY <= btnPositions.abilitySelectBtn1.y + btnPositions.abilitySelectBtn1.height) {
				hero.abilities[abilitySelect.abilitiesToChoose[0]] = true;
				hero.heroLevel++;
				score.coinsCollectedInThisSession = 0;
				gameState.current = gameState.nextLvl;
			}
			if (clickX >= btnPositions.abilitySelectBtn2.x && clickX <= btnPositions.abilitySelectBtn2.x + btnPositions.abilitySelectBtn2.width && clickY >= btnPositions.abilitySelectBtn2.y && clickY <= btnPositions.abilitySelectBtn2.y + btnPositions.abilitySelectBtn2.height) {
				hero.abilities[abilitySelect.abilitiesToChoose[1]] = true;
				hero.heroLevel++;
				score.coinsCollectedInThisSession = 0;
				gameState.current = gameState.nextLvl;
			}
			if (clickX >= btnPositions.abilitySelectBtn3.x && clickX <= btnPositions.abilitySelectBtn3.x + btnPositions.abilitySelectBtn3.width && clickY >= btnPositions.abilitySelectBtn3.y && clickY <= btnPositions.abilitySelectBtn3.y + btnPositions.abilitySelectBtn3.height) {
				hero.abilities[abilitySelect.abilitiesToChoose[2]] = true;
				hero.heroLevel++;
				score.coinsCollectedInThisSession = 0;
				gameState.current = gameState.nextLvl;
			}
	}
};

const generateMonsters = () => {
	let numberOfMonstersToGenerate = Math.min(gameState.currentLevel, 6) + 2;
	for (let i = 0; i < numberOfMonstersToGenerate; i++) {
		monsters.push(new Monster(getRandomNumberWithinRange(0, 2)));
	}
};
