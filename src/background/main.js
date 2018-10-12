const manager = new RelatedTableManager();

browser.browserAction.onClicked.addListener(tab => {
  manager.highlightTableElements(tab);
});

// Messages coming from content script will be executed here
browser.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  console.log("message: ", message, " (at main.js)");
  /*if (manager[message.call]) {
    return manager[message.call](message.args); //in case you need to return a promise
  }*/
});