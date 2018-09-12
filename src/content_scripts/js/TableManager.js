// TODO: This class expects a message from Background, then it should highlight certain table elements for now.



class TableManager{
	constructor(){
		this.hiddenClass=" infovis-blurred";
		this.highlightedClass= " infovis-highlight";
		this.cluster= new StrategyCluster();
		this.tableDataSet;
	}
	
	addStyleClasses(me, domElement){
		if (domElement.tagName.toLowerCase()=="table"){
			me.markTable(me,domElement);
		}else{
			if(domElement.children){
				Array.from(domElement.children).forEach(child =>{
					me.addStyleClasses(me,child);
				});
			}
			me.setClass(domElement,me.hiddenClass);
		}
	}

	setClass(domElement,newClass){
		if(domElement.classList.add){
			domElement.classList.add(newClass);
		}else{
			domElement.className+=newClass;
		}
	}

	markTable(me, domElement){
		var button = document.createElement("button");
		button.appendChild(document.createTextNode("Export"));
		me.setClass(domElement,me.highlightedClass);
		button.addEventListener("click",function(){me.defineStrategy(domElement)});
		domElement.append(button);
	}

	highlightTableElements(){
		console.log("Order received, I must highlight");
		var me = this;
		var body = document.querySelector('body');
		body.className+=this.hiddenClass;
		this.addStyleClasses(me,body);
	}

	/*removeClasses(me,domElement){
		if(domElement.childNodes){
			Array.from(domElement.childNodes).forEach(child =>{
				me.addStyleClasses(me,child);
			});
		}
		me.checkRemovingTable(me,domElement);
	}

	checkRemovingTable(me, domElement){
		if(domElement.tagName=="table"){
			domElement.className+=me.highlightedClass;
			domElement.append(button);
		}else{
			domElement.className+=me.hiddenClass;
		}
	}*/

	defineStrategy(domElement){
		this.tableDataSet = this.cluster.rightStrategy(domElement);
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