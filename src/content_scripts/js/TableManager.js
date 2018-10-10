// TODO: This class expects a message from Background, then it should highlight certain table elements for now.

class TableManager {
  constructor() {
    this.hiddenClass = "infovis-blurred";
    this.highlightedClass = "infovis-highlight";
    this.cluster = null;
    this.tableDataSet = null;
  }

  createCluster() {
    this.cluster = new StrategyCluster();
  }

  addStyleClasses(me, domElement) {
    if (domElement.tagName.toLowerCase() === "table") {
      me.markTable(me, domElement);
    } else {
      if (domElement.children.length) {
        Array.from(domElement.children).forEach(child => {
          me.addStyleClasses(me, child);
        });
      }
      me.setClass(domElement, me.hiddenClass);
    }
  }

  setClass(domElement, newClass) {
    if (domElement.classList.add) {
      domElement.classList.add(newClass);
    } else {
      domElement.className += ` ${newClass}`;
    }
  }

  markTable(me, domElement) {
    me.setClass(domElement, me.highlightedClass);
    const button = document.createElement("button");
    button.appendChild(document.createTextNode("Export"));
    button.addEventListener("click", () => {me.defineStrategy(domElement);});
    domElement.append(button);
  }

  highlightTableElements() {
    console.log("Order received, I must highlight");
    const body = document.querySelector("body");
    this.setClass(body, this.hiddenClass);
    this.addStyleClasses(this, body);
  }

  defineStrategy(domElement) {
    this.tableDataSet = this.cluster.rightStrategy(domElement);

    /* var extractor = new SingleHeadedTableStrategy();
    this.tableDataSet = extractor.convertDataFrom(domElement);*/
    console.log(this.tableDataSet);
  }
}

const tableManager = new TableManager(); 

browser.runtime.onMessage.addListener(function callPageSideActions(request, sender) {
  console.log(`Message: ${request.message} in TableManager.`);

  if (tableManager[request.message]) {
    return tableManager[request.message](request.args); 
  }

  console.log("Wrong message.");
  return null;
});
