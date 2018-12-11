class StrategyCluster {
  constructor() {
    this.strategies = [new SingleHeadedTableStrategy()];
  }
  
  strategies() {
    return this.strategies;
  }

  isSupportedElement(domElement) {
    const isSupported = this.strategies.find(extractor => extractor.canExtract(domElement));
    return isSupported || false;
  }

  rightStrategy(domElement) {
    const strategy = this.strategies.filter(strat => strat.canExtract(domElement));
    if (!strategy.length) {
      return "No strategy defined for this element.";
    }
    return strategy[0];
  }
}
