class AbstractStrategy {
  createDataSetFrom(domElem) {
    const res = this.convertDataFrom(domElem);
    if (!res.headers) {
      this.fillHeaders(res);
    }
    return res;
  }

  fillHeaders(data) {
    data.headers = [];
    
    const length = data.rows.reduce(
      ((rowL, row) => (row.length > rowL ? row.length : rowL)), 0);

    this.fillRows(data.rows, length);

    for (let i = 0; i < length; i++) {
      data.headers.push(`attr${i}`);
    }
  }

  fillRows(rows, len) {
    rows.forEach(row => {
      while (row.length < len) {
        row.push(undefined);
      }
    });
  }

  canExtract(domElem) {
    return this.couldExtract(domElem);
  }
}
