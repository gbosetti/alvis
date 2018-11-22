class ListVisitor extends Visitor {
  rows() {
    this.filter();
    return this.dataRows;
  }

  newRow() {
    this.dataRows[this.index] = [];
    this.index++;
  }

  filter() {
    this.dataRows = this.dataRows.filter(array => array.length);
  }
}
