class DivStrategy extends AbstractStrategy {
  constructor(){
    super();
    this.rowHeader = false;
  }

  convertDataFrom(domElem) {
    return {
      ...(this.checkHeaderExistance(domElem) ? {header:this.extractHeaders(domElem)} : {}),
      rows: this.extractRows(domElem)
    };
  }

  checkHeaderExistance(domElem){
    return (this.checkClassHeaders(domElem));
  }

  checkClassHeaders(childs){
    return Boolean(childs.getElementsByClassName("th").length);
  }

  extractRows(domElem) {
    const visitor = new DivVisitor();
    Array.from(domElem.children).map(child => {
      visitor.newRow();
      this.getDataFrom(child, visitor);
    });
    if (this.rowHeader) visitor.removeHeader();
    return visitor.getRows();
  }

  extractHeaders(domElem){

  }

  getDataFrom(rowElem, visitor) {
    if (rowElem.children.length) {
      Array.from(rowElem.children).map(child => this.getDataFrom(child, visitor));
    } else {
      visitor.add(rowElem.textContent.trim());
    }
  }
}

