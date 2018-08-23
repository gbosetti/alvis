class ListTableStrategy{

	convertDataFromTable(table) {
		return{
			titles: this.extractHeaders(table),
			rows: this.extractRows(table)
		}
	}

	extractRows(table){
		let trs = Array.from(table.querySelectorAll("li"));
		let rows = []
		trs.forEach(tr=>rows.push(this.extractCell(tr.children)));
		rows = rows.slice(1);
		return rows;
	}

	extractCell(tds){
		var cells=[];
		Array.from(tds).forEach(td => cells.push( td.textContent.trim() ));
		return cells;
	}

	extractHeaders(table) {
		let ths = Array.from(table.querySelectorAll("li"));
		ths.shift().getElementsByTagName('div');		
		let headers = [];
		ths.forEach(header => headers.push(header.textContent.splice()));
		return headers;
	}
}