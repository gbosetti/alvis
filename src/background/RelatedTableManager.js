class RelatedTableManager {
  constructor() {
    this.storageManager = new StorageManager();
    this.highlighted = false;
    this.first = true;
  }

  highlightTableElements(tab) {
    this.highlighted = !this.highlighted;

    if (!this.highlighted) {
      browser.tabs.sendMessage(tab.id, {
        message: "unhighlightTableElements"
      });
      return;
    }

    if (this.first) {
      this.initializeTableManager(tab);
      this.first = !this.first;
    }

    browser.tabs.sendMessage(tab.id, {
      message: "highlightTableElements"
    });
  }

  initializeTableManager(tab) {
    console.log("Sending message to ContentScript, initializing");

    browser.tabs.sendMessage(tab.id, {
      message: "initializeManager"
    });
  }

  storeCurrentDataset({dataset}) {
    this.storageManager
      .setDataset(dataset)
      .catch(console.error);
  }

  notifyDocumentLoaded(data) {
    return this.storageManager.getDataset();
  }
}
