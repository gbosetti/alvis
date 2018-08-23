class NoHeaderDivStrategy{
	
	extractDataFromTable(table){
		return {
			rows: this.extractRows(table)
		}
	}

	extractRows(table){
		var tds = Array.from(table.children).slice(2);
	}

}