// TODO: This class expects a message from Background, then it should highlight certain table elements for now.



class TableManager{
	constructor(){}
	

	highlightTableElements(){

		console.log("Order received, i must highlight");

	}



}


var tableManager = new TableManager(); 

browser.runtime.onMessage.addListener(function callPageSideActions(request, sender) {

	if(tableManager[request.message]){
		
		return tableManager[request.message](request.args); 
	}
});