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
  }).then(tabs => {
    if (tabs[0]) {
      browser.tabs.reload(tabs[0].id);
    }

    browser.runtime.reload();
  });
};

const watchChanges = (dir, lastTimestamp) => {
  timestampForFilesInDirectory(dir).then(timestamp => {
    if (!lastTimestamp || (lastTimestamp === timestamp)) {
      setTimeout(() => watchChanges(dir, timestamp), 1000); // retry after 1s
    } else {
      reload();
    }
  });
};

browser.management.getSelf().then(self => {
  if (self.installType === "development") {
    browser.runtime.getPackageDirectoryEntry(dir => watchChanges(dir));
  }
});
