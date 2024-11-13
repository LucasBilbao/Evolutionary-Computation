exports.geneticSetCover = function (
  universe,
  sets,
  populationSize = 50,
  generations = 5,
  mutationRate = 0.02
) {
  const universeSet = new Set(universe);

  function generateChromosome() {
    return Array(sets.length)
      .fill()
      .map(() => (Math.random() < 0.5 ? 0 : 1));
  }

  function calculateFitness(chromosome) {
    let covered = new Set();
    let subsetCount = 0;

    chromosome.forEach((gene, index) => {
      if (gene === 1) {
        subsetCount++;
        sets[index].forEach((element) => covered.add(element));
      }
    });

    const coverageFitness = covered.size / universeSet.size;
    return subsetCount > 0 ? coverageFitness / subsetCount : 0;
  }

  function selectParent(population) {
    const tournamentSize = 3;
    let best = null;
    for (let i = 0; i < tournamentSize; i++) {
      const contestant = population[Math.floor(Math.random() * population.length)];
      if (best === null || contestant.fitness > best.fitness) {
        best = contestant;
      }
    }
    return best.chromosome;
  }

  function crossover(parent1, parent2) {
    const crossoverPoint = Math.floor(Math.random() * parent1.length);
    return [...parent1.slice(0, crossoverPoint), ...parent2.slice(crossoverPoint)];
  }

  function mutate(chromosome) {
    return chromosome.map((gene) => (Math.random() < mutationRate ? 1 - gene : gene));
  }

  function getSelectedSets(chromosome) {
    return chromosome.reduce((selected, gene, index) => {
      if (gene === 1) {
        selected.push(sets[index]);
      }
      return selected;
    }, []);
  }

  let population = Array(populationSize)
    .fill()
    .map(() => {
      const chromosome = generateChromosome();
      return { chromosome, fitness: calculateFitness(chromosome) };
    });

  for (let generation = 0; generation < generations; generation++) {
    population.sort((a, b) => b.fitness - a.fitness);

    if (population[0].fitness === 1) {
      return getSelectedSets(population[0].chromosome);
    }

    const newPopulation = [];
    while (newPopulation.length < populationSize) {
      const parent1 = selectParent(population);
      const parent2 = selectParent(population);
      let offspring = crossover(parent1, parent2);
      offspring = mutate(offspring);
      newPopulation.push({
        chromosome: offspring,
        fitness: calculateFitness(offspring),
      });
    }

    population = newPopulation;
  }

  population.sort((a, b) => b.fitness - a.fitness);
  return [getSelectedSets(population[0].chromosome), population[0].fitness];
};
