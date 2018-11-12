class ArticleVisitor {
  constructor() {
    this.dataHeaders = [];
    this.dataRows = [];
    this.index = -1;
  }

  newRow() {
    this.index++;
    this.dataRows[this.index] = [];
  }

  addData(elem) {
    const tag = this.defineTag(elem);
    if (this.hasTextContent(elem)) {
      this.add(elem.textContent.trim(), tag);    
    }
  }

  defineTag(elem) {
    if (elem.tagName) {
      return elem.tagName.toLowerCase();
    } 
    return "text";
  }

  hasTextContent(elem) {
    return Boolean(elem.textContent.trim());
  }

  add(data, tag) {
    if (this.shouldIncludeHeader(tag)) {
      this.dataHeaders.push(tag);
    }
    this.dataRows[this.index].push(data);
  }

  shouldIncludeHeader(tag) {
    return Boolean(!this.dataHeaders.includes(tag) | (this.dataHeaders.length < this.dataRows.length));  
  }

  formattedRows() {
    return {
      headers: this.dataHeaders,
      rows: this.dataRows
    };
  }
}

/* insertDelimeters(){
 *  this.dataRows.keys.forEach(key=>{
 *     this.dataRows[key].push(this.delimeter);
 *  });
}
*/
