const infovis = new Infovis();

browser.runtime.sendMessage({call: 'notifyDocumentLoaded'})
  .then(dataset => {
    if (dataset && dataset.currentDataset) {
      console.table(dataset.currentDataset);
      return infovis.presentData(dataset.currentDataset);
    }
    
    throw new Error('No dataset');
  })
  .catch(err => {
    console.log(err);
  });
