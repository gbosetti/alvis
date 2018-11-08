class ArticleStrategy {
   convertDataFrom(domElement) {
      return this.extractRows(domElement.querySelectorAll("article"));
   }

   extractRows(rows) {
      const visitor = new ArticleVisitor();
      Array.from(rows).forEach(row => {
         visitor.newRow();
         this.lastNodes(row, visitor);
      });
      return visitor.formattedRows();
   }

   lastNodes(elem, visitor) {
      if ((elem.hasChildNodes())&!(this.hasOnlyTextChildren(elem.childNodes))) {
         Array.from(elem.childNodes).forEach(child => this.lastNodes(child,visitor));
      } else {
         visitor.addData(elem);
      }
   }

   hasOnlyTextChildren(col){
      return Array.from(col).every(child=> Boolean(child.nodeType===3));
   }
}
