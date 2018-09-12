//TODO: create the superclasses. Consider TableExtractor and AbstractExtractor
//Create one file for each class, so we can reuse them. Superclasses shouldn't be here.

class SingleHeadedTableStrategy { /*extends TableExtractor*/
	convertDataFrom(domElem){   // Expects a table with headers
		return{
			headers: this.extractHeaders(domElem),
			rows: this.extractRows(domElem)
		}
	}
	extractHeaders(domElem){
		var domHeaders = domElem.querySelectorAll("th");
		var jsonHeader = [];
		domHeaders.forEach(header => jsonHeader.push(header.textContent.trim())); //to json
		return jsonHeader;
	}
	extractRows(domElem){
		var domRows = domElem.querySelectorAll("tr");
		var jsonRows = [];
		domRows.forEach(row => jsonRows.push(this.extractCells(row))); //to json
		jsonRows = jsonRows.slice(1); //remove header
		return jsonRows;
	}
	extractCells(rowElem){
		var domCells = rowElem.querySelectorAll("td");
		var jsonCells = [];
		domCells.forEach(cell => jsonCells.push(cell.textContent.trim())); //to json
		return jsonCells;
	}
	canExtract(domElem){		//temporal in testing's sake
		return true;
	}
}