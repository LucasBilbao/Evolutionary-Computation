exports.greedySetCover = function (universe, sets) {
  let u = new Set(universe);

  let setCover = [];

  while (u.size > 0) {
    let bestSet = null;
    let elementsCovered = new Set();

    for (let set of sets) {
      let intersection = new Set([...set].filter((x) => u.has(x)));

      if (intersection.size > elementsCovered.size) {
        bestSet = set;
        elementsCovered = intersection;
      }
    }

    setCover.push(bestSet);

    for (let elem of elementsCovered) {
      u.delete(elem);
    }
  }

  const arr = new Set(setCover.flat(Infinity));
  return setCover;
};
