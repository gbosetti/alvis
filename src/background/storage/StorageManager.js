class StorageManager {
  constructor(key) {
    this.storage = new LocalStorage();
    this.key = key || "currentDataset";
  }

  errorHandler(err) {
    if (err) {
      throw err;
    }
  }

  clear() {
    return this.storage.clear()
      .catch(this.errorHandler);
  }

  get() {
    return this.storage.get(this.key)
      .catch(this.errorHandler);
  }

  set(data) {
    return this.storage.set({
      [this.key]: data
    }).catch(this.errorHandler);
  }

  remove() {
    return this.storage.remove(this.key)
      .catch(this.errorHandler);
  }
}
