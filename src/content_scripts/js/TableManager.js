// TODO: This class expects a message from Background, then it should highlight certain table elements for now.



class TableManager{
	constructor(){
		this.hiddenClass=" infovis-blurred";
		this.highlightedClass= " infovis-highlight";
	}
	
	setClasses(me, domElement){	
		if(domElement.childNodes){
			Array.from(domElement.childNodes).forEach(child =>{
				me.setClasses(me,child);
			});
		}
		me.checkTable(me,domElement);
	}

	checkTable(me, domElement){
		if(domElement.tagName=="table"){
			domElement.className+=me.highlightedClass;
		}else{
			domElement.className+=me.hiddenClass;
		}
	}

	highlightTableElements(){
		console.log("Order received, I must highlight");
		var body = document.getElementsByTagName('body');
		var me = this;
		me.setClasses(me, body);
	}

	removeClasses(){

	}

	/*unHighlightElements(){
		var everybody = Array.from(document.querySelector("body"));
		var tables = everybody.filter(someone => someone.tag=="table");
		everybody.forEach(someone =>{

		})
	}*/



}


var tableManager = new TableManager(); 

browser.runtime.onMessage.addListener(function callPageSideActions(request, sender) {
	console.log("Message:" + request.message + "in TableManager,");
	if(tableManager[request.message]){
		return tableManager[request.message](request.args); 
	} else {
		console.log("Wrong message.");
	}
});