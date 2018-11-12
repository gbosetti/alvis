class Storage {
  /**
   * Removes all items from the storage area.
   *
   * @returns {Promise}, A Promise that will be fulfilled with no arguments
   * if the operation succeeded. If the operation failed, the promise will
   * be rejected with an error message.
   */
  clear() {}

  /**
   * Retrieves one or more items from the storage area.
   *
   * @param {string | Object} keys - A key (string) or keys (an array of strings or an
   * object specifying default values)  to identify the item to be
   * retrieved from the storage.
   *
   * @returns {Promise}, a Promise that will be fulfilled with a results object
   * containing every object in keys that was found in the storage area.
   */
  get(keys) {}

  /**
   * Stores one or more items in the storage area, or update existing items.
   *
   * @param {Object} keys - An object containing one or more key/value pairs
   * to be stored in storage. If an item already exists, its value
   * will be updated.
   *
   * @returns {Promise} A Promise that will be fulfilled with no arguments
   * if the operation succeeded. If the operation failed, the promise
   * will be rejected with an error message.
   */
  set(keys) {}

  /**
   * Removes one or more items from the storage area.
   *
   * @param {string | Array} keys - A string, or array of strings,
   * representing the key(s) of the item(s) to be removed.
   *
   * @returns A Promise that will be fulfilled with no arguments if
   * the operation succeeded. If the operation failed, the promise will
   * be rejected with an error message.
   */
  remove(keys) {}
}
