class RelatedTableManager {
  constructor() {
    this.highlighted = false;
    this.first = true;
  }

  highlightTableElements(tab) {
    if (this.highlighted) {
      console.log("Sending message to ContentScript, waiting for unhighlighting");
      browser.tabs.sendMessage(tab.id, {"message": "unhighlightTableElements"});
    } else {
      if (this.first) {
        this.initializeTableManager(tab);
        this.first = !this.first;
      }
      console.log("Sending message to ContentScript, waiting for highlighting");
      browser.tabs.sendMessage(tab.id, {"message": "highlightTableElements"});
    }
    this.highlighted = !this.highlighted;
  }

  initializeTableManager(tab) {
    console.log("Sending message to ContentScript, initializing");
    browser.tabs.sendMessage(tab.id, {"message": "initializeManager"});
  }
}
