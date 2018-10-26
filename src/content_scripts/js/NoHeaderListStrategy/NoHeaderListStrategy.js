class NoHeaderListStrategy {
  convertDataFrom(domElem) {
    return {
      rows: this.extractRows(domElem)
    };
  }

  extractRows(domElem) {
    const domRows = Array.from(domElem.querySelectorAll("li"));
    const visitor = new Visitor();
    domRows.forEach(row => this.extractRow(row, visitor));
    visitor.filter();
    return visitor.getRows();
  }

  extractRow(row, visitor) {
    this.extractCells(row, visitor);
    visitor.newRow();
  }

  canExtract(domElem) {
    return this.hasAList(Array.from(domElem.children));
  }

  hasAList(elementChilds) {
    return Boolean(elementChilds.filter(el => el.tagName.toLowerCase() === "li").length);
  }

  extractCells(nodeElement, visitor) {
    if (nodeElement.children.length) {
      Array.from(nodeElement.children).forEach(child => {
        this.extractCells(child, visitor);
      });
    } else {
      visitor.add(nodeElement.textContent.trim());
    }
  }
}
