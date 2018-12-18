const manager = new BackgroundManager();

browser.browserAction.onClicked.addListener(tab => {
  manager.highlightTableElements(tab);
});

// Messages coming from content script will be executed here
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("message: ", message, " (at main.js)");

  if (!manager[message.call]) {
    return null;
  }

  console.log(message);

  return manager[message.call](message.args); // in case you need to return a promise
});
