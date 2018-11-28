class ListVisitor extends Visitor {
  rows() {
    return this.filter(this.dataRows);
  }

  filter(rows) {
    return rows.filter(array => array.length);
  }
}
