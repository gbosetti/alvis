const manager = new RelatedTableManager();

browser.browserAction.onClicked.addListener(tab => {
  manager.createCluster(tab);
  manager.highlightTableElements(tab);
});
