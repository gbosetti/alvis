class NoHeaderDivStrategy{
	
	convertDataFrom(table){
		return {
			rows: this.extractRows(table)
		}
	}

	extractRows(table){
		var tds = Array.from(table.children).slice(1);
		tds = tds.filter(child => child.tagName === "DIV");
		var cells = [];
		tds.forEach(td=>cells.push(this.getTextContent(td)));
		return cells;
	}

	getTextContent(td){
		let row = [];
		row.push(td.children[3].textContent.trim());
		td.children[4].children.forEach(child=>{

		});
		return row;
	}

}