// TODO: This class expects a message from Background, then it should highlight certain table elements for now.



class TableManager{
	constructor(){}
	

	highlightElementsFromDom(){

		console.log("Received message, i must highlight");

	}



}


var tableManager = new TableManager(); 

browser.runtime.onMessage.addListener(function callPageSideActions(request, sender) {

	if(tableManager[request.message]){
		console.log(request.message + " from RelatedTableManage ");
		return tableManager[request.message](request.args); 
	}
});