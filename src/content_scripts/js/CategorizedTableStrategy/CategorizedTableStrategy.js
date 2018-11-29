class CategorizedTableStrategy extends AbstractStrategy {
  constructor() {
    super();
    this.rowHeader = false;
    this.headerPosition = null;
  }

  convertDataFrom(domElem) {
    return {
      headers: this.extractHeaders(domElem),
      rows: this.normalizeRows(this.extractData(domElem))
    };
  }

  extractHeaders(domElem) {
    let headers = Array.from(domElem.querySelectorAll("th"));
    if (!headers.length) {
      this.rowHeader = true;
      headers = this.getDataRows(domElem).shift();
      this.setHeaderPosition(headers,
        domElem.querySelectorAll("tr"));
      headers = Array.from(headers.querySelectorAll("td"));
    }
    return headers.map(header => header.textContent.trim());
  }

  setHeaderPosition(header,childs){
    this.headerPosition = Array.from(childs)
      .findIndex(child => header.isSameNode(child));
  }

  extractCategories(domElem) {
    return this.getCategoryRows(domElem)
      .map(this.extractCells);
  }

  extractData(domElem) {
    const rows = this.filterRows(Array.from(domElem.querySelectorAll("tr")));
    const res = {
      categories:[],
      data:[]
    };
    rows.forEach(row => {
      if (row.querySelectorAll("td").length === 1) {
        res.data.push(null);
        res.categories.push(row.querySelector("td").textContent.trim());
      }else {
        res.data.push(this.extractCells(row));
      }
    });
    return res;
  }

  filterRows(rowArray) {
    if (this.rowHeader) {
      console.log(this.headerPosition);
      rowArray.splice(0,this.headerPosition+1);
    }
    return rowArray;
  }

  extractCells(rowElem) {
    return Array.from(rowElem.querySelectorAll("td"))
      .map(cell => cell.textContent.trim());
  }

  getDataRows(domElem) {
    return Array.from(domElem.querySelectorAll("tr"))
      .filter(row => row.querySelectorAll("td").length > 1);
  }

  getCategoryRows(domElem) {
    return Array.from(domElem.querySelectorAll("tr"))
      .filter(row => row.querySelectorAll("td").length === 1);
  }

  normalizeRows(rows) {
    console.log(rows.data);
    console.log(rows.categories);
    const tempArr = [];
    rows.categories.forEach(cat =>
      tempArr.push({category: cat,
        data: this.getCategorizedData(rows.data)
      })
    );
    return tempArr;
  }

  getCategorizedData(rows) {
    const tempArr = [];
    rows.shift();
    while (rows[0]) {
      tempArr.push(rows.shift());
    }
    return tempArr;
  }

  couldExtract(domElem) {
    return Boolean(this.getCategoryRows(domElem).length && 
      this.getDataRows(domElem).length &&
      this.checkStructure(domElem)
      );
  }

  checkStructure(domElem){
    const rows = this.getCategoryRows(domElem);
    return rows.every(row => this.siblingsAreExtractable(row));
  }

  siblingsAreExtractable(row){
    let tempArr = [];
    let tempRow = row.nextSibling;
    while(tempRow & tempRow.querySelectorAll("td").length > 1){
      tempArr.push(tempRow);
      tempRow = tempRow.nextSibling;
    }
    return Boolean(tempArr.length);
  }
}
