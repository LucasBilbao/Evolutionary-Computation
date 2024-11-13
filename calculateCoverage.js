exports.calculateCoverage = function (universe, cover) {
  const coverSet = new Set(cover.flat(2));
  const universeSet = new Set(universe);

  for (let node of coverSet) {
    if (universeSet.has(node)) {
      universeSet.delete(node);
    }
  }

  return ((universe.length - universeSet.size) / universe.length) * 100;
};
