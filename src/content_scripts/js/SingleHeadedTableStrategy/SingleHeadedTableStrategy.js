// TODO: extender para que el metodo canExtract para chequear tablas que contengan <theads>
// considerar extender a otra subclase que redefina ese metodo (onlyBodySingleHeadedTableStrategy?).

class SingleHeadedTableStrategy /* extends TableExtractor */ {
  convertDataFrom(domElem) {
    // Expects a table with headers
    return {
      headers: this.extractHeaders(domElem),
      rows: this.extractRows(domElem)
    };
  }

  extractHeaders(domElem) {
    const domHeaders = domElem.querySelectorAll("th");
    const jsonHeader = [];
    
    domHeaders.forEach(header => jsonHeader.push(header.textContent.trim())); // to json
    return jsonHeader;
  }

  extractRows(domElem) {
    const domRows = domElem.querySelectorAll("tr");
    let jsonRows = [];
    domRows.forEach(row => jsonRows.push(this.extractCells(row))); // to json
    jsonRows = jsonRows.slice(1); // remove header
    return jsonRows;
  }

  extractCells(rowElem) {
    const domCells = rowElem.querySelectorAll("td");
    const jsonCells = [];
    domCells.forEach(cell => jsonCells.push(cell.textContent.trim())); // to json
    return jsonCells;
  }

  canExtract(domElem) {
    const childs = Array.from(domElem.querySelector("tbody").children);
    return (this.firstLineHeader(childs[0]) && this.uniqueHeader(childs.slice(1)));
  }

  firstLineHeader(childs) {
    let res = true;
    for (let i = 0; i < childs.cells.length; i++) {
      if (childs.cells[i].tagName.toLowerCase() !== "th") {
        res = false;
        break;
      }
    }
    return res;
  }

  uniqueHeader(childs) {
    let res = true;
    for (let i = 0; i < childs.length; i++) {
      if (!this.checkAllHeaders(childs[i])) {
        res = false;
        break;
      }
    }
    return res;
  }

  checkAllHeaders(col) {
    let res = true;

    Array.from(col).forEach(elem => (res = res && (elem.tagName.toLowerCase() !== "th")));
    return res;
  }
}
