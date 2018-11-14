class AbstractStrategy {
  createDataSetFrom(domElem) {
    let res = this.convertDataFrom(domElem);
    if(!res.headers){
      this.fillHeaders(res);
    }
    return res;
  }

  fillHeaders(data){
    data.headers = [];
    const leng = data.rows.reduce((row,rowL)=> row.length < rowL ? row.length : rowL,0).length;
    this.fillRows(data.rows,leng);
    for (var i = 0; i<leng; i++) {
      data.headers.push("attr"+i);
    }
  }

  fillRows(rows,len){
    rows.forEach(row=>{
      while(row.length<len){
        row.push(undefined);
      }
    });
  }

  canExtract(domElem){
    return this.couldExtract(domElem);
  }
}
