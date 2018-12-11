const tableManager = new DatasetExtractor(); 

browser.runtime.onMessage.addListener(function callPageSideActions(request, sender) {
  console.log(`Message: ${request.message} in DatasetExtractor.`);
  if (tableManager[request.message]) {
    return tableManager[request.message](request.args); 
  }
  
  throw new Error("Wrong message.");
});
