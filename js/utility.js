// GET POSITION IN THE PLAYGROUND USED FOR RANDOM MONSTER GENERATION
const getRandomPositionWithinPlayground = () => {
	let minX = BATTLEGROUND_THRESHOLD_LEFT + 20;
	let maxX = cvs.width - BATTLEGROUND_THRESHOLD_RIGHT - 20;

	let minY = BATTLEGROUND_THRESHOLD_TOP + 20;
	let maxY = cvs.height - BATTLEGROUND_THRESHOLD_DOWN - 20;

	let x = getRandomNumberWithinRange(minX, maxX);
	let y = getRandomNumberWithinRange(minY, maxY);

	return { x, y };
};

// GET RANDOM NUMBER WITHIN SPECIFIED RANGE
const getRandomNumberWithinRange = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

// CALCULATE EUCLIDEAN DISTANCE BETWEEN TWO POINTS
const calculateDistance = (x1, y1, x2, y2) => {
	let xDiffSq = Math.pow(x2 - x1, 2);
	let yDiffSq = Math.pow(y2 - y1, 2);
	return Math.sqrt(xDiffSq + yDiffSq);
};
