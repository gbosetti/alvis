// TODO: This class expects a message from Background, then it should highlight certain table elements for now.

class TableManager{

	constructor(){
		this.hiddenClass=" infovis-blurred";
		this.highlightedClass= " infovis-highlight";
		this.cluster = new StrategyCluster()
		this.tablaDataSet = null;
	}

	createButton(me,table){
		var button = document.createElement("button");
		var txt = document.createTextNode("Export");
		button.addEventListener("click",function(){me.defineStrategy(table)});
		button.append(txt);
		table.append(button);
	}

	setClasses(me, domElement){	
		if(domElement.tagName.toLowerCase()=="table"){
			domElement.className+=me.highlightedClass;
			me.createButton(me,domElement);
		}else{
			Array.from(domElement.children).forEach(child =>{
				me.setClasses(me,child);
			});
			domElement.className+=me.hiddenClass;
		}
	}


	highlightTableElements(){
		console.log("Order received, I must highlight");
		var body = document.querySelector('body');
		var me = this;
		body.className+=me.hiddenClass;
		me.setClasses(me, body);
	}

	defineStrategy(domElement){
		this.tableDataSet = this.cluster.rightStrategy(domElement);
		console.log(this.tableDataSet);
	}

	/*unHighlightElements(){
		
	}*/


}


var tableManager = new TableManager(); 

browser.runtime.onMessage.addListener(function callPageSideActions(request, sender) {
	console.log("Message: " + request.message + " in TableManager,");
	if(tableManager[request.message]){
		return tableManager[request.message](request.args); 
	} else {
		console.log("Wrong message.");
	}
});
