class NoHeaderListStrategy {
  convertDataFrom(domElem) {
    return {
      rows: this.extractRows(domElem)
    };
  }

  extractRows(domElem) {
    const domRows = Array.from(domElem.querySelectorAll("li"));
    const rows = [];
    domRows.forEach(row => rows.push(this.extractCell(row.children)));
    return rows;
  }

  extractCell(tds) {
    const cells = [];
    Array.from(tds).forEach(td => cells.push(td.textContent.trim()));
    return cells;
  }

  canExtract(domElem) {
    return this.hasAList(Array.from(domElem.children));
  }

  hasAList(elementChilds) {
    return !!(elementChilds.filter(el => el.tagName.toLowerCase() === "li").length);
  }

  exportData(div, data) {

  }
}
