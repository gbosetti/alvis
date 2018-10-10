class SingleHeadedTableStrategy { 
	convertDataFrom(domElem){   
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
		return this.checkHeadAndBody(domElem)||this.checkOnlyBody(domElem); //check wether it has or not thead
	}
	checkHeadAndBody(domElem){		
		return (this.checkHeadAndBodyExistance(domElem)&&this.uniqueHeader(Array.from(domElem.querySelector('tbody').children)));
	}
	checkHeadAndBodyExistance(domElem){
		return ((domElem.querySelector("thead"))&&(domElem.querySelector("tbody")));
	}
	checkOnlyBody(domElem){
		var childs = Array.from(domElem.querySelector("tbody").children);
		return (this.firstLineHeader(childs[0])&&this.uniqueHeader(childs.slice(1)));
	}
	firstLineHeader(childs){
		var res = true;
		for (var i = 0; i < childs.cells.length; i++) {
			if((childs.cells[i].tagName.toLowerCase() != "th")&&(childs.cells[i].tagName.toLowerCase() != "td")){
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

	setString(ar){
		var str;
		ar.forEach(s =>{ str+=s+" | "});
		console.log(str);
		return str;
	}

	exportData(manager,data){
		var heads = document.createElement("span");
		var str = this.setString(data.headers);
		heads.appendChild(document.createTextNode(("Headers: "+str)));
		var rows = document.createElement("span");
		rows.appendChild(document.createTextNode("Rows: "));
		rows.appendChild(document.createElement("br"));
		data.rows.forEach(row=>{
			str = ""+this.setString(row);
			rows.appendChild(document.createTextNode(str));
			rows.appendChild(document.createElement("br"));
		});
		manager.container.appendChild(heads);
		manager.container.appendChild(document.createElement("br"));
		manager.container.appendChild(rows);
		manager.showDisplay();
	}
}