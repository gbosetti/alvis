class SingleHeadedTableStrategy { 
  convertDataFrom(domElem) {   
    return {
      headers: this.extractHeaders(domElem),
      rows: this.extractRows(domElem)
    };
  }

  /**
   * Extract headers from DOM Element. Map headers to JSON
   */
  extractHeaders(domElem) {
    return Array.from(domElem.querySelectorAll("th"))
      .map(header => header.textContent.trim());
  }

  /**
   * Extract rows from DOM Element. Map rows to JSON
   */
  extractRows(domElem) {
    return Array.from(domElem.querySelectorAll("tr"))
      .map(this.extractCells) // to JSON
      .slice(1); // remove header
  }

  extractCells(rowElem) {
    return Array.from(rowElem.querySelectorAll("td"))
      .map(cell => cell.textContent.trim()); // to JSON
  }

  canExtract(domElem) {
    // check wether it has or not thead
    return this.checkHeadAndBody(domElem) || this.checkOnlyBody(domElem); 
  }

  checkHeadAndBody(domElem) {
    return (this.checkHeadAndBodyExistance(domElem) && this.uniqueHeader(Array.from(domElem.querySelector("tbody").children)));
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
    console.log(str);
    return str;
  }

  exportData(manager, data) {
    console.dir(data);
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
