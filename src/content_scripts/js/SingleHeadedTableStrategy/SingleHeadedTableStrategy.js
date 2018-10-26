class SingleHeadedTableStrategy { 
  convertDataFrom(domElem) {   
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
    return this.checkHeadAndBody(domElem) || this.checkOnlyBody(domElem); // check wether it has or not thead
  }

  checkHeadAndBody(domElem) {
    return (this.checkHeadAndBodyExistance(domElem) && this.uniqueHeader(Array.from(domElem.querySelector("tbody").children)));
  }

  checkHeadAndBodyExistance(domElem) {
    return ((domElem.querySelector("thead")) && (domElem.querySelector("tbody")));
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
    let res = true;
    for (let i = 0; i < childs.cells.length; i++) {
      if ((childs.cells[i].tagName.toLowerCase() !== "th") && (childs.cells[i].tagName.toLowerCase() !== "td")) {
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
