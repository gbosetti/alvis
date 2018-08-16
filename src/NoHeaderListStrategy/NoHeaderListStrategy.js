class NoHeaderListStrategy{

	convertDataFromTable(table) {
		return {
			rows: this.extractRows(table)
		}
	}

	extractRows(table){
		let trs = Array.from(table.querySelectorAll("li"));		
		let rows = []
		trs.forEach(tr=>rows.push(this.extractCell(tr.children));
		return rows;
	}

	extractCell(tds){
		var cells=[];
		Array.from(tds).forEach(td => cells.push( td.textContent.trim() );
		return cells;
	}
}