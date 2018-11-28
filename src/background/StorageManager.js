class StorageManager {
  constructor(key) {
    this.storage = new LocalStorage();
  }

  errorHandler(err) {
    if (err) {
      throw err;
    }
  }

  clear() {
    return this.storage
      .clear()
      .catch(this.errorHandler);
  }

  getDataset() {
    return this.storage
      .get("currentDataset");
  }

  setDataset(dataset) {
    return this.storage
      .set({
        currentDataset: dataset
      });
  }

  removeDataset() {
    return this.storage
      .remove("currentDataset");
  }

  getDatasetViewSettings() {
    return this.storage
      .get("currentDatasetViewSettings");
  }

  setDatasetViewSettings(settings) {
    return this.storage
      .set({
        currentDatasetViewSettings: settings,
      });
  }
}
