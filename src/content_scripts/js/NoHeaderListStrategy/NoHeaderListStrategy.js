class NoHeaderListStrategy {
  convertDataFrom(table) {
    return {rows: this.extractRows(table)};
  }

	convertDataFrom(domElem) {
		return {
			rows: this.extractRows(domElem)
		}
	}
	extractRows(domElem){
		let domRows = Array.from(domElem.querySelectorAll("li"));		
		let rows = []
		domRows.forEach(row=>rows.push(this.extractCell(row.children)));
		return rows;
	}
	extractCell(tds){
		var cells=[];
		Array.from(tds).forEach(td => cells.push( td.textContent.trim() ));
		return cells;
	}
	canExtract(domElem){
		return this.hasAList(Array.from(domElem.children));
	}
	hasAList(elementChilds){
		return (elementChilds.filter(el=>el.tagName.toLowerCase()=='li').length)? true : false
	}
	exportData(div,data){

	}
}
