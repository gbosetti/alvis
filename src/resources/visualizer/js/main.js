const infovis = new Infovis();

browser.runtime.sendMessage({call: "notifyDocumentLoaded"})
  .then(dataset => {
    if (dataset) {
      return infovis.presentData(dataset);
    }
    
    throw new Error("No dataset");
  })
  .catch(err => {
    console.log(err);
  });
