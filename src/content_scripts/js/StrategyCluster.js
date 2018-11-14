class StrategyCluster {
  constructor() {
    this.strategies = this.initializeStrategies();
  }
  
  strategies() {
    return this.strategies;
  }

  initializeStrategies(){
    const arr = []
    arr.push(new SingleHeadedTableStrategy());
    arr.push(new NoHeaderListStrategy());
    arr.push(new ArticleStrategy());
    return arr;
  }

  isSupportedElement(domElement){
    const tag = domElement.tagName.toLowerCase();
    return ( this.tableCheck(tag) ||
    this.listCheck(tag) ||
    this.articleCheck(domElement.children) );
  }

  tableCheck(tag){
    return  (tag === "table");
  }

  listCheck(tag){
    return  (tag === "ul");
  }

  articleCheck(coll){
    return (Array.from(coll).filter(child => child.tagName.toLowerCase()==="article").length > 4);
  }

  rightStrategy(domElement) {
    const strategy = this.strategies.filter(strat => strat.canExtract(domElement));
    if (!strategy.length) {
      return "No strategy defined for this element.";
    }
    return strategy[0];
  }
}
