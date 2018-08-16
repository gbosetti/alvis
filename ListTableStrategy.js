function convertDataFromTable(table) {
	let tds = Array.from(table.querySelectorAll("li"));		
	let ths = tds.shift().getElementsByTagName('div');
	let json = {};
	let headers = [];
	Array.from(ths).forEach(th =>{	
		headers.push(new Array(th.textContent));
	});
	tds.forEach(td=>{
		var i = 0;
		Array.from(td.children).forEach(div =>{			//itera por el resto y toma los datos de la tabla
			headers[i].push(div.textContent);
			i++;
		});
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