class ArticleVisitor extends Visitor{
  constructor() {
    super();
    this.dataHeaders = [];
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
    return !this.dataHeaders.includes(tag) || (this.dataHeaders.length < this.dataRows.length);  
  }

  rows() {
    return {
      headers: this.dataHeaders,
      rows: this.dataRows
    };
  }
}
