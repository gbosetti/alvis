class NoHeaderListStrategy {
  convertDataFrom(domElem) {
    return {
      rows: this.extractRows(domElem)
    };
  }

  extractRows(domElem) {
    const arr = Array.from(domElem.children);
    const domRows = Array.from(domElem.querySelectorAll("li")).filter(elem => arr.includes(elem));
    const visitor = new ListVisitor();
    domRows.forEach(row => this.extractRow(row, visitor));
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
