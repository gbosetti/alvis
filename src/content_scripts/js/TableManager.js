// TODO: This class expects a message from Background, then it should highlight certain table elements for now.

class TableManager{
	constructor(){
		this.hiddenClass="infovis-blurred";
		this.highlightedClass= "infovis-highlight";
		this.cluster;
		this.tableDataSet;
	}

	createCluster(){
		this.cluster= new StrategyCluster();
	}
	
	addStyleClasses(domElement){
		if (domElement.tagName.toLowerCase()=="table"){
			this.enableTableExtraction(domElement);
		}else{
			if(domElement.children.length){
				Array.from(domElement.children).forEach(child =>{
					this.addStyleClasses(child);
				});
			}
			this.setClass(domElement,this.hiddenClass);
		}
	}

	setClass(domElement,newClass){
		if (domElement.classList.add){
			domElement.classList.add(newClass);
		}else{
			domElement.className+=" "+newClass;
		}
	}

	enableTableExtraction(domElement){
		this.setClass(domElement,this.highlightedClass)
		var button = document.createElement("button");
		button.appendChild(document.createTextNode(browser.i18n.getMessage("export")));
		button.addEventListener("click",()=>{this.defineStrategy(domElement)});
		domElement.append(button);
	}

	highlightTableElements(){
		console.log("Order received, I must highlight");
		var body = document.querySelector('body');
		this.setClass(body,this.hiddenClass);
		this.addStyleClasses(body);
	}

	defineStrategy(domElement){
		this.tableDataSet = this.cluster.rightStrategy(domElement);
		/*var extractor = new SingleHeadedTableStrategy();
		this.tableDataSet = extractor.convertDataFrom(domElement);*/
		console.log(this.tableDataSet);
	}

}




var tableManager = new TableManager(); 

browser.runtime.onMessage.addListener(function callPageSideActions(request, sender) {
	console.log("Message: " + request.message + " in TableManager.");
	if(tableManager[request.message]){
		return tableManager[request.message](request.args); 
	} else {
		console.log("Wrong message.");
	}
});