class DivStrategy extends AbstractStrategy {
  convertDataFrom(domElem) {
    return {
      rows: this.extractRows(domElem)
    };
  }

  extractRows(domElem) {
    const visitor = new DivVisitor();
    Array.from(domElem.children).map(child => {
      visitor.newRow();
      this.getDataFrom(child, visitor);
    });
    return visitor.getRows();
  }

  getDataFrom(rowElem, visitor) {
    if (rowElem.children.length) {
      Array.from(rowElem.children).map(child => this.getDataFrom(child, visitor));
    } else {
      visitor.add(rowElem.textContent.trim());
    }
  }
}
