class ArticleStrategy {
  convertDataFrom(domElement) {
    return {
      rows: this.extractRows(domElement.querySelectorAll("article"))
    };
  }

  extractRows(rows) {
    const data = {};
    console.log(data);
    Array.from(rows).forEach(row => {
      this.lastNodes(row, data);
      this.fillMissingData(data);
    });
    return this.formatRows(data);
  }

   fillMissingData(data){
      
   }

  lastNodes(elem, data) {
    if (elem.children.length) {
      Array.from(elem.children).forEach(child => this.lastNodes(child,data));
    } else {
      this.addToRow(elem, data);
    }
  }

  addToRow(elem, data) {
    var tag = elem.tagName.toLowerCase()
    if (elem.textContent){
       if (!data[tag]) {
         data[tag] = [];
       }
       data[tag].push(elem.textContent.trim());
    }
  }

  formatRows(data) {
    return data;
  }
}
