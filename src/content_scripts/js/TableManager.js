class TableManager {
  constructor() {
    this.hiddenClass = "infovis-blurred";
    this.highlightedClass = "infovis-highlight";
    this.hiddenContainerClass = "infovis-container-hidden";
    this.containerClass = "infovis-container";
    this.buttonClass = "infovis-button";
    this.cluster = null;
    this.container = null;
  }

  initializeManager() {
    this.createContainer();
    this.createCluster();
  }

  createCluster() {
    this.cluster = new StrategyCluster();
  }

  createContainer() {
    const cont = document.createElement("div");
    const close = document.createElement("span");

    this.setClass(cont, this.hiddenContainerClass);
    this.setClass(close, "close");
    
    close.innerHTML = "&times;";
    close.addEventListener("click", () => this.hideContainer());

    cont.appendChild(close);

    document.querySelector("body").appendChild(cont);

    this.container = cont;
  }

  showDisplay() {
    this.container.classList.replace(this.hiddenContainerClass, this.containerClass);
  }

  hideContainer() {
    this.container.classList.replace(this.containerClass, this.hiddenContainerClass);
  }

  addStyleClasses(domElement) {
    if (domElement.tagName.toLowerCase() === "table") {
      this.markTable(domElement);
      return;
    }
    
    if (domElement.children.length) {
      Array.from(domElement.children).forEach(child => {
        this.addStyleClasses(child);
      });
    }

    this.setClass(domElement, this.hiddenClass);
  }

  removeStyleClasses(domElement) {
    if (domElement.tagName.toLowerCase() === "table") {
      this.unmarkTable(domElement);
      return;
    }

    if (domElement.children.length) {
      Array.from(domElement.children).forEach(child => {
        this.removeStyleClasses(child);
      });
    }

    this.deleteClass(domElement, this.hiddenClass);
  }

  setClass(domElement, newClass) {
    if (domElement.classList.add) {
      domElement.classList.add(newClass);
      return;
    }

    domElement.className += ` ${newClass}`;
  }

  deleteClass(domElement, oldClass) {
    // if (domElement.classList.remove){
    domElement.classList.remove(oldClass);

    /* }else{
      this.removeClassManually(domElement,oldClass);
    }*/
  }

  /* removeClassManually(domElement,oldClass){
    //code here...
  } */

  createButton(text, func) {
    const but = document.createElement("button");

    but.appendChild(document.createTextNode(text));
    but.addEventListener("click", func);
    but.className = this.buttonClass;

    return but;
  }

  markTable(domElement) {
    const button = this.createButton("Export", () => this.export(domElement));
    this.setClass(domElement, this.highlightedClass);
    domElement.append(button);
  }

  unmarkTable(domElement) {
    this.deleteClass(domElement, this.highlightedClass);
    const buttons = Array.from(domElement.getElementsByTagName("button"));
    buttons.forEach(b => b.remove());
  }

  highlightTableElements() {
    const body = document.querySelector("body");

    this.setClass(body, this.hiddenClass);
    this.addStyleClasses(body);
    this.deleteClass(this.container, this.hiddenClass);
  }

  unhighlightTableElements() {
    const body = document.querySelector("body");

    this.deleteClass(body, this.hiddenClass);
    this.removeStyleClasses(body);
  }

  defineStrategy(domElement) {
    if (!this.cluster) {
      return null;
    }

    return this.cluster.rightStrategy(domElement);
  }

  export(domElement) {
    const strategy = this.defineStrategy(domElement);

    if (!strategy) {
      return;
    }

    const data = strategy.convertDataFrom(domElement);
    strategy.exportData(this, data);
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
