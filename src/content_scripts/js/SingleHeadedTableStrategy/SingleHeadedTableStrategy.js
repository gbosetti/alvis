class SingleHeadedTableStrategy extends AbstractStrategy { 
  constructor() {
    super();
    this.indexes = 0;
  }

  convertDataFrom(domElem) {  
    // TODO: first process the whole dataset, splitting columns and completing values. Then, extract headers and rows.
    const extractedRows = this.extractRows(domElem); // Be careful: indexes are updated here
    return {
      headers: this.extractHeaders(domElem, extractedRows[0].length, this.indexes), 
      rows: extractedRows
    };
  }

  /**
   * Extract headers from DOM Element. Map headers to JSON
   */
  extractHeaders(domElem, expectedHeadersSize, indexes) {
    // Get all the headers
    const headers = Array.from(domElem.querySelectorAll("th"))
      .map(header => header.textContent.trim());

    // Remove the splittable
    indexes.forEach(index => { 
      const removedHeader = headers.splice(index.index, 1); 

      for (let i = 0; i < index.instances; i++) {
        headers.push(`${removedHeader} [ ${i} ]`);
      }
    });

    // Complete 
    if (headers.length < expectedHeadersSize) {
      const diff = expectedHeadersSize - headers.length;
      for (let i = 0; i < diff; i++) {
        headers.push("...");
      }
    }

    return headers;
  }

  /**
   * Extract rows from DOM Element. Map rows to JSON
   */
  extractRows(domElem) {
    const rawTableRows = Array.from(domElem.querySelectorAll("tr")).slice(this.numberOfHeaderRows());
    let processedRows = [];

    rawTableRows.forEach(row => {  
      const cells = Array.from(row.cells);
      processedRows.push(cells);
    });

    this.indexes = this.getSplittableCellsIndex(processedRows);
    processedRows = this.spliCellsAtIndexes(processedRows, this.indexes);
    
    processedRows = this.rowsWithCellsWithTextualValues(processedRows);

    return processedRows; // remove header
  }

  removeDuplicatedIndexes(indexes) {
    return indexes.filter((elem, index, self) =>
      index === self.findIndex(t => (t.index === elem.index && t.instances === elem.instances))
    );
  }

  spliCellsAtIndexes(rows, indexes) {
    const rowsWithExpandedCells = [];

    rows.forEach(cells => {  
      indexes.forEach(index => { 
        const containerNode = cells[index.index];
        for (let i = 0; i < index.instances; i++) {
          const td = document.createElement("td");

          if (containerNode.childNodes[i]) {
            td.appendChild(containerNode.childNodes[i]);
          }

          cells.push(td);
        }

        cells.splice(index.index, 1);
      });

      rowsWithExpandedCells.push(cells);
    });

    return rowsWithExpandedCells;
  }

  getSplittableCellsIndex(rows) {
    const indexes = [];

    rows.forEach(cells => {  
      cells.forEach((cell, index) => { 
        if (cell.childNodes && cell.childNodes.length > 1) {
          const idx = {};
          idx.index = index;
          idx.instances = cell.childNodes.length;
          indexes.push(idx);
        }
      });
    });

    return this.removeDuplicatedIndexes(indexes);
  }

  rowsWithCellsWithTextualValues(rows) {
    const processedRows = [];

    rows.forEach(cells => {  
      const processedCells = [];
      cells.forEach(cell => { 
        if (cell) {
          if (cell.childNodes[0] && cell.childNodes[0].tagName && cell.childNodes[0].tagName.toUpperCase() === "IMG") {
            const cellValue = cell.childNodes[0].title || cell.childNodes[0].alt || cell.childNodes[0].name || cell.childNodes[0].tagName;

            processedCells.push(cellValue);
          }
          else { 
            processedCells.push(cell.textContent.trim()); 
          }
        }
        else { 
          processedCells.push(undefined); 
        }
      });

      processedRows.push(processedCells);
    });

    return processedRows;
  }

  numberOfHeaderRows() {
    return 1; // TODO: complete
  }

  extractCells(rowElem) {
    return Array.from(rowElem.querySelectorAll("td"))
      .map(cell => cell.textContent.trim()); // to JSON
  }

  couldExtract(domElem) {
    return this.checkHeadAndBody(domElem) || this.checkOnlyBody(domElem);
  }

  checkHeadAndBody(domElem) {
    return (this.checkHeadAndBodyExistance(domElem) &&
     this.uniqueHeader(Array.from(domElem.querySelector("tbody").children)));
  }

  checkHeadAndBodyExistance(domElem) {
    return domElem.querySelector("thead") && domElem.querySelector("tbody");
  }

  checkOnlyBody(domElem) {
    let childs = domElem.querySelector("tbody");

    if (childs) {
      childs = Array.from(childs.children);
      return this.firstLineHeader(childs[0]) && this.uniqueHeader(childs.slice(1));        
    } 

    return false;
  }

  firstLineHeader(childs) {
    return !Array.from(childs.cells).find(cell =>
      cell.tagName.toLowerCase() !== "th" && cell.tagName.toLowerCase() !== "td"
    );
  }

  uniqueHeader(childs) {
    return !childs.find(child => !this.checkAllHeaders(child));
  }

  checkAllHeaders(col) {
    let res = true;
    Array.from(col).forEach(elem => (res = res && (elem.tagName.toLowerCase() !== "th")));
    return res;
  }

  setString(ar) {
    let str;
    ar.forEach(s => (str += `${s} | `));
    return str;
  }

  exportData(manager, data) {
    const heads = document.createElement("span");
    let str = this.setString(data.headers);
    heads.appendChild(document.createTextNode((`Headers: ${str}`)));
    const rows = document.createElement("span");
    rows.appendChild(document.createTextNode("Rows: "));
    rows.appendChild(document.createElement("br"));
    data.rows.forEach(row => {
      str = String(this.setString(row));
      rows.appendChild(document.createTextNode(str));
      rows.appendChild(document.createElement("br"));
    });
    manager.container.appendChild(heads);
    manager.container.appendChild(document.createElement("br"));
    manager.container.appendChild(rows);
    manager.showDisplay();
  }
}
