class Visitor {
  constructor() {
    this.index = -1;
    this.dataRows = [];
  }

  getRows() {
    return this.rows();
  }

  newRow() {
    this.index++;
    this.dataRows[this.index] = [];
  }

  add(data) {
    if (data) {
      this.dataRows[this.index].push(data);
    }
  }

  filter() {

  }
}
