const filesInDirectory = dir => new Promise(resolve =>
  dir.createReader().readEntries(entries =>
    Promise.all(entries.filter(e => e.name[0] !== ".")
      .map(e => {
        if (e.isDirectory) {
          return filesInDirectory(e);
        }

        return new Promise(resolve => e.file(resolve));
      }))
      .then(files => [].concat(...files))
      .then(resolve)
  )
);

const timestampForFilesInDirectory = dir =>
  filesInDirectory(dir).then(files =>
    files.map(f => f.name + f.lastModifiedDate).join());

const reload = () => {
  browser.tabs.query({
    active: true,
    currentWindow: true
  })
    .then(tabs => {
      if (tabs[0]) {
        return browser.tabs.reload(tabs[0].id);
      }

      return browser.runtime.reload();
    })
    .catch(err => {
      throw err;
    });
};

const watchChanges = (dir, lastTimestamp) => {
  timestampForFilesInDirectory(dir)
    .then(timestamp => {
      if (!lastTimestamp || (lastTimestamp === timestamp)) {
        // retry after 1s
        return setTimeout(() => watchChanges(dir, timestamp), 1000);
      }
      
      return reload();
    })
    .catch(err => {
      throw err;
    });
};

browser.management.getSelf()
  .then(self => {
    if (self.installType === "development") {
      return browser.runtime.getPackageDirectoryEntry(dir => watchChanges(dir));
    }

    return new Promise();
  })
  .catch(err => {
    throw err;
  });
