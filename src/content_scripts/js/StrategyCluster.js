class StrategyCluster{
	constructor(){
		this.strategies = [new SingleHeadedTableStrategy];
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