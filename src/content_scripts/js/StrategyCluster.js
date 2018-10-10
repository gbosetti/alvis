class StrategyCluster {
  constructor() {
    this.strategies = [];
    this.strategies.push(new SingleHeadedTableStrategy());
  }

  strategies() {
    return this.strategies;
  }

  rightStrategy(domElement) {
    const strategy = this.strategies.filter(strat => strat.canExtract(domElement));
    if (!strategy.length) {
      return "No strategy defined for this element.";
    }
    return strategy[0].convertDataFrom(domElement);
  }
}
