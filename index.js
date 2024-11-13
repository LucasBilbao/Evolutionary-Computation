const { greedySetCover } = require('./non-genetic');
const { geneticSetCover } = require('./genetic');
const { calculateCoverage } = require('./calculateCoverage');
const { generateSetCoverProblem } = require('./dataSetGenerator');

let startGreedy, endGreedy;
let startGenetic, endGenetic;
let startGeneticHigherPopulation, endGeneticHigherPopulation;
let startGeneticHigherGen, endGeneticHigherGen;
let startGeneticHigherMutationRate, endGeneticHigherMutationRate;

console.log(
  `Coverage Greedy\tTime Elapsed Greedy (ms)\tCoverage Genetic\tTime Elapsed Genetic (ms)\tCoverage Genetic higher population\tTime Elapsed Genetic higher population (ms)\tCoverage Genetic higher max generation\tTime Elapsed Genetic higher max generation (ms)\tCoverage Genetic higher mutation rate\tTime Elapsed Genetic higher mutation rate (ms)`
);
for (let i = 0; i < 100; ++i) {
  const [universe, subsets] = generateSetCoverProblem();
  startGreedy = Date.now();
  let coverGreedy = greedySetCover(universe, subsets);
  endGreedy = Date.now();

  startGenetic = Date.now();
  let [coverGenetic] = geneticSetCover(universe, subsets);
  endGenetic = Date.now();

  startGeneticHigherPopulation = Date.now();
  let [coverHigherPopulation] = geneticSetCover(universe, subsets, 1, 1, 0.00002);
  endGeneticHigherPopulation = Date.now();

  startGeneticHigherGen = Date.now();
  let [coverHigherGen] = geneticSetCover(universe, subsets, 1, 1, 0.00002);
  endGeneticHigherGen = Date.now();

  startGeneticHigherMutationRate = Date.now();
  let [coverHigherMutationRate] = geneticSetCover(universe, subsets, 100, 500, 0.5);
  endGeneticHigherMutationRate = Date.now();

  console.log(
    `${calculateCoverage(universe, coverGreedy)}%\t${
      endGreedy - startGreedy
    }\t${calculateCoverage(universe, coverGenetic)}%\t${
      endGenetic - startGenetic
    }\t${calculateCoverage(universe, coverHigherPopulation)}%\t${
      endGeneticHigherPopulation - startGeneticHigherPopulation
    }\t${calculateCoverage(universe, coverHigherGen)}%\t${
      endGeneticHigherGen - startGeneticHigherGen
    }\t${calculateCoverage(universe, coverHigherMutationRate)}%\t${
      endGeneticHigherMutationRate - startGeneticHigherMutationRate
    }`
  );
}
