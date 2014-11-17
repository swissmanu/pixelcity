function randomInt(min, max) {
	return Math.floor(randomFloat(min, max));
}


function randomFloat(min, max) {
	return Math.random() * (max - min) + min;
}

function coinFlip() {
	return (randomInt(0, 1) >= 0.5);
}

function randomSign() {
	return coinFlip() ? 1: -1;
}

module.exports = {
	randomInt: randomInt
	, randomFloat: randomFloat
	, coinFlip: coinFlip
	, randomSign: randomSign
};