class StrategyCluster{
	constructor(){
		this.strategies = [];
		var strat = new SingleHeadedTableStrategy;
		this.strategies.push(strat);
	}

	strategies(){
		return this.strategies;
	}

	rightStrategy(domElement){
		var result=false;
		this.strategies.forEach(strat =>{
			if (strat.canExtract(domElement)){
				result = strat.convertDataFrom(domElement);
			}
		})
		if (result){
			return result;
		}else{
			console.log("No strategy defined for this element.");
		}
	}
}