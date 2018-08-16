class ListTableStrategy{

	convertDataFromTable(table) {
		let tds = Array.from(table.querySelectorAll("li"));		
		let json = {};
		let headers = [tds.length];
		var i = 0;
		tds.forEach(td=>{
			headers[i] = [];
			Array.from(td.children).forEach(div =>{		
				headers[i].push(div.textContent);
			});
			i++;
		});
		json = headers.reduce((obj, header) => {
			let [id, ...rest]= header;
			return {
				...obj,
				[id]: rest,
			};
		}, {});
		return json;
	}
}