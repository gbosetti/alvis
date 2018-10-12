class StrategyCluster {
  constructor() {
    this.strategies = [];
    this.strategies.push(new SingleHeadedTableStrategy());
    this.strategies.push(new NoHeaderListStrategy());
  }

  strategies() {
    return this.strategies;
  }

  rightStrategy(domElement) {
    const strategy = this.strategies.filter(strat => strat.canExtract(domElement));
    
    if (!strategy.length) {
      return "No strategy defined for this element.";
    }

    return strategy[0];
  }
}
