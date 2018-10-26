class Visitor {
  constructor() {
    this.dataRows = [[]];
    this.index = 0;
  }

  getRows() {
    return this.dataRows;
  }

  filter() {
    this.dataRows = this.dataRows.filter(array => array.length);
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
}
