class ListVisitor extends Visitor {
  constructor() {
   this.dataRows = [[]];
   this.index = 0;
  }

 getRows() {
   this.filter();
   return this.dataRows;
 }

 add(data) {
   if (data) {
     this.dataRows[this.index].push(data);
   }
 }

 newRow() {
   this.index++;
   this.dataRows[this.index] = [];
 }

 filter() {
   this.dataRows = this.dataRows.filter(array => array.length);
 }
}
