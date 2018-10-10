const manager = new RelatedTableManager();

browser.browserAction.onClicked.addListener(tab => {
  manager.highlightTableElements(tab);
});
