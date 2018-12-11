class DatasetExtractor {
  constructor() {
    this.hiddenClass = "infovis-blurred";
    this.highlightedClass = "infovis-highlight";
    this.extractor = null;
    this.strategies = [new SingleHeadedTableStrategy()];
  }

  isSupportedElement(domElement) {
    const isSupported = this.strategies.find(extractor => extractor.canExtract(domElement));
    return isSupported || false;
  }

  rightStrategy(domElement) {
    const strategy = this.strategies.filter(strat => strat.canExtract(domElement));
    if (!strategy.length) {
      return "No strategy defined for this element.";
    }
    return strategy[0];
  }

  addStyleClasses(domElement) {
    if (this.isSupportedElement(domElement)) {
      this.enableTableExtraction(domElement);
      return;
    }

    if (domElement.children.length) {
      Array.from(domElement.children).forEach(child => {
        this.addStyleClasses(child);
      });
    }

    this.setClass(domElement, this.hiddenClass);
  }

  setClass(domElement, newClass) {
    if (domElement.classList.add) {
      domElement.classList.add(newClass);
      return;
    }
    
    domElement.className += ` ${newClass}`;
  }

  enableTableExtraction(domElement) {
    const button = document.createElement("button");
    this.setClass(domElement, this.highlightedClass);

    button.appendChild(document.createTextNode(browser.i18n.getMessage("export")));
    button.addEventListener("click", () => this.showVisualization(domElement));

    domElement.parentNode.insertBefore(button, domElement.nextSibling);
  }

  showVisualization(domElement) {
    this.defineStrategy(domElement);
    const dataset = this.extractor.createDataSetFrom(domElement);
    console.log(dataset);

    const visFrame = this.createVisualizationContainer(Date.now(), /* `${domElement.offsetWidth}px` */ "100%", "550px");
    domElement.parentNode.insertBefore(visFrame, domElement.nextSibling);

    browser.runtime.sendMessage({
      "call": "storeCurrentDataset",
      "args": {dataset}
    });   
  }

  createVisualizationContainer(id, width, height) {
    const container = document.createElement("iframe");

    container.id = `infovis-container-${id}`;
    container.src = browser.extension.getURL("resources/visualizer/index.html");
    container.style.margin = "0px";
    container.style.border = "0px";
    container.style.height = height;
    container.style.width = width;
    container.style.padding = "0px";

    container.addEventListener("click", evt => {
      container.remove();
    });

    return container;
  }

  highlightTableElements() {
    const body = document.querySelector("body");
    this.setClass(body, this.hiddenClass);
    this.addStyleClasses(body);
  }

  defineStrategy(domElement) {
    this.extractor = this.rightStrategy(domElement);
  }

  initializeManager() {
    this.createContainer();
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
    const button = this.createButton(browser.i18n.getMessage("export"), () => this.export(domElement));

    this.setClass(domElement, this.highlightedClass);
    domElement.append(button);
  }

  unmarkTable(domElement) {
    this.deleteClass(domElement, this.highlightedClass);
    const buttons = Array.from(domElement.getElementsByTagName("button"));
    buttons.forEach(b => b.remove());
  }

  unhighlightTableElements() {
    const body = document.querySelector("body");

    this.deleteClass(body, this.hiddenClass);
    this.removeStyleClasses(body);
  }

  export(domElement) {
    const strategy = this.defineStrategy(domElement);

    if (!strategy) {
      return;
    }

    const data = strategy.createDataSetFrom(domElement);
    strategy.exportData(this, data);
  }
}
