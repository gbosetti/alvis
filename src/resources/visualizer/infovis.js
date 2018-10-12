console.log("INFOVIS");

class Infovis{

	constructor(){

	}
	presentData(data){
		var div = document.createElement("div");
		div.innerHTML = JSON.stringify(data);
		document.body.appendChild(div);
	}
}


window.infovis = new Infovis();

browser.runtime.sendMessage({ 
	"call": "notifyDocumentLoaded"
}).then(dataset => {
	console.log("BACK");
	if(dataset && window.infovis)
		window.infovis.presentData(dataset);
}); 