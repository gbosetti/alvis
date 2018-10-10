class NoHeaderListStrategy {
  convertDataFrom(table) {
    return {rows: this.extractRows(table)};
  }

  extractRows(table) {
    const trs = Array.from(table.querySelectorAll("li"));
    const rows = [];
    trs.forEach(tr => rows.push(this.extractCell(tr.children)));
    return rows;
  }

  extractCell(tds) {
    const cells = [];
    Array.from(tds).forEach(td => cells.push(td.textContent.trim()));
    return cells;
  }
}
