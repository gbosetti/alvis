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
      .get("currentDataset")
      .catch(this.errorHandler);
  }

  setDataset(dataset) {
    return this.storage
      .set({
        currentDataset: dataset
      })
      .catch(this.errorHandler);
  }

  removeDataset() {
    return this.storage
      .remove("currentDataset")
      .catch(this.errorHandler);
  }
}
