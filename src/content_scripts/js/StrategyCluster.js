class StrategyCluster{
	constructor(){
		var strat = new SingleHeadedTableStrategy;
		this.strategies = [strat];
	}

	strategies(){
		return this.strategies;
	}

	rightStrategy(domElement){
		this.strategies.forEach(strat =>{
			if (strat.canExtract(domElement)){
				return strat.convertDataFrom(domElement);
			}
		})
		console.log("No strategy defined for this element.");
	}
}