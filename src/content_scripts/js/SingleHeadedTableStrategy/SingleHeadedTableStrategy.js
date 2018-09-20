//TODO: extender para que el metodo canExtract para chequear tablas que contengan <theads>
//considerar extender a otra subclase que redefina ese metodo (onlyBodySingleHeadedTableStrategy?).

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
	canExtract(domElem){
		var childs = Array.from(domElem.querySelector("tbody").children);
		return (this.firstLineHeader(childs[0])&&this.uniqueHeader(childs.slice(1)));
	}
	firstLineHeader(childs){
		var res = true;
		for (var i = 0; i < childs.cells.length; i++) {
			if(childs.cells[i].tagName.toLowerCase() != "th"){
				res = false;
				break;
			}
		}
		return res;
	}
	uniqueHeader(childs){
		var res=true;
		for (var i = 0; i < childs.length; i++) {
			if(!this.checkAllHeaders(childs[i])){
				res=false;
				break;
			}
		}
		return res;
	}
	checkAllHeaders(col){
		var res = true;
		Array.from(col).forEach(elem=>res=res&&(elem.tagName.toLowerCase()!="th"));
		return res;
	}
}