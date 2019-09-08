'use strict';

/*
** https://github.com/sindresorhus/random-int/blob/master/index.js
*/

module.exports = (minimum, maximum) => {
	if (maximum === undefined) {
		maximum = minimum;
		minimum = 0;
	}

	if (typeof minimum !== 'number' || typeof maximum !== 'number') {
		throw new TypeError('Expected all arguments to be numbers');
	}

	return Math.floor(
		(Math.random() * (maximum - minimum)) + minimum
	);
};