class ArticleStrategy extends AbstractStrategy {
  convertDataFrom(domElement) {
    return this.extractRows(domElement.querySelectorAll("article"));
  }

  extractRows(rows) {
    const visitor = new ArticleVisitor();
    Array.from(rows).forEach(row => {
      visitor.newRow();
      this.lastNodes(row, visitor);
    });
    return visitor.formattedRows();
  }

  lastNodes(elem, visitor) {
    if ((elem.hasChildNodes()) && !(this.hasOnlyTextChildren(elem.childNodes))) {
      Array.from(elem.childNodes).forEach(child => this.lastNodes(child, visitor));
    } else {
      visitor.addData(elem);
    }
  }

  hasOnlyTextChildren(col) {
    return Array.from(col).every(child => child.nodeType === 3);
  }

  couldExtract(elem) {
    return Array.from(elem.children).filter(elem => elem.tagName.toLowerCase() === "article").length > 1;
  }
}
