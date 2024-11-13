// Helper function to get random integer in range [min, max]
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper function to get random sample from array
function getRandomSample(array, size) {
  let shuffled = array.slice(0),
    i = array.length,
    temp,
    index;
  while (i--) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(0, size);
}

/**
 * Generate Set Cover problem
 *
 * @function generateSetCoverProblem
 * @param {number} n - range of possible numbers in 0-n interval
 * @param {number} m - size of the Universe
 * @param {number} l - number of subsets to be generated
 */
exports.generateSetCoverProblem = function (
  n = 10000,
  m = getRandomInt(1000, 5000),
  l = getRandomInt(500, 900)
) {
  const possibleNumbers = Array.from({ length: n }, (_, i) => i);

  const U = new Set(getRandomSample(possibleNumbers, m));

  let subsets = [];
  let control = new Set();
  for (let i = 0; i < l - 1; i++) {
    let subSize = getRandomInt(1, U.size / 100);
    if (subSize === U.size) console.log(subSize);
    let sub = new Set(getRandomSample([...U], subSize));
    subsets.push(sub);
    sub.forEach((item) => control.add(item));
  }

  let rest = new Set([...U].filter((x) => !control.has(x)));
  if (rest.size > 0) {
    subsets.push(rest);
  }

  subsets = subsets.map((set) => [...set]);

  //   console.log('Universe U:', [...U]);
  //   console.log('Subsets:', subsets);

  return [[...U], subsets];
};
