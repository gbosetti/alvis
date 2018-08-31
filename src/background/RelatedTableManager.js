// TODO: MUST SEND A MESSAGE TO CONTENT SCRIPT, SO IT CAN HIGHLIGHT CERTAIN "TABLE" ELEMENTS FROM DOM". NOT WORKING YET.

class RelatedTableManager{
	constructor(){}

	highlightTableElements(){
		browser.tabs.sendMessage(tab.id, {"message": "highlightTableElements"});
	}
}


var manager = new RelatedTableManager();

browser.browserAction.onClicked.addListener(function(tab) {
	manager.highlightTableElements(tab);
});

