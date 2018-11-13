class LocalStorage extends Storage {
  errorHandler(err) {
    if (err) {
      throw err;
    }
  }

  clear() {
    return browser.storage.local
      .clear()
      .catch(this.errorHandler);
  }

  get(keys) {
    return browser.storage.local
      .get(keys)
      .catch(this.errorHandler);
  }

  set(keys) {
    return browser.storage.local
      .set(keys)
      .catch(this.errorHandler);
  }

  remove(keys) {
    return browser.storage.local
      .remove(keys)
      .catch(this.errorHandler);
  }
}
