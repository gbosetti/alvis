class StrategyCluster{
	constructor(){
		this.strategies = new Array();
		var singleHeadedTable = new SingleHeadedTableStrategy();
		this.strategies.push(singleHeadedTable);
	}

	strategies(){
		return this.strategies;
	}

	rightStrategy(domElement){
		var strategy = this.strategies.filter(strat =>strat.canExtract(domElement));
		if (!strategy.length){
			return "No strategy defined for this element.";
		}
		return strategy[0].convertDataFrom(domElement);
	}
}