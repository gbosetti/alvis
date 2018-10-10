
class TableManager{
	constructor(){
		this.hiddenClass="infovis-blurred";
		this.highlightedClass="infovis-highlight";
		this.hiddenContainerClass="infovis-container-hidden";
		this.containerClass="infovis-container";
		this.buttonClass="infovis-button";
		this.cluster;
		this.container;
	}

	initializeManager(){
		this.createContainer(this);
		this.createCluster();
	}

	createContainer(me){
		var cont = document.createElement("div");
		me.setClass(cont,me.hiddenContainerClass);
		var close = document.createElement("span");
		close.innerHTML="&times;";
		me.setClass(close,"close");
		close.addEventListener("click",function(){me.hideContainer()})
		cont.appendChild(close);
		document.querySelector("body").appendChild(cont);
		me.container=cont;
	}

	showDisplay(){
		this.container.classList.replace(this.hiddenContainerClass,this.containerClass);
	}

	hideContainer(){
		this.container.classList.replace(this.containerClass,this.hiddenContainerClass);
	}

	createCluster(){
		this.cluster = new StrategyCluster();
	}

	addStyleClasses(me, domElement){
		if (domElement.tagName.toLowerCase()=="table"){
			me.markTable(me,domElement);
		}else{
			if(domElement.children.length){
				Array.from(domElement.children).forEach(child =>{
					me.addStyleClasses(me,child);
				});
			}
			me.setClass(domElement,me.hiddenClass);
		}
	}

	removeStyleClasses(me, domElement){
		if (domElement.tagName.toLowerCase()=="table"){
			me.unmarkTable(me,domElement);
		}else{
			if(domElement.children.length){
				Array.from(domElement.children).forEach(child =>{
					me.removeStyleClasses(me,child);
				});
			}
			me.deleteClass(domElement,me.hiddenClass);
		}
	}

	setClass(domElement,newClass){
		if (domElement.classList.add){
			domElement.classList.add(newClass);
		}else{
			domElement.className+=" "+newClass;
		}
	}

	deleteClass(domElement,oldClass){
		//if (domElement.classList.remove){
			domElement.classList.remove(oldClass);
		/*}else{
			this.removeClassManually(domElement,oldClass);
		}*/
	}

	/*removeClassManually(domElement,oldClass){
		//code here...
	}*/

	createButton(me,text,func){
		var but = document.createElement("button");
		but.appendChild(document.createTextNode(text));
		but.addEventListener("click",func);
		but.className=me.buttonClass;
		return but;
	}

	markTable(me, domElement){
		me.setClass(domElement,me.highlightedClass)
		var button = me.createButton(me,"Export",function(){me.export(me,domElement)})
		domElement.append(button);
	}

	unmarkTable(me, domElement){
		me.deleteClass(domElement,me.highlightedClass);
		var buttons = Array.from(domElement.getElementsByTagName("button"));
		buttons.forEach(b=>b.remove());
	}

	highlightTableElements(){
		var me = this;
		var body = document.querySelector('body');
		me.setClass(body,me.hiddenClass);
		this.addStyleClasses(me,body);
		this.deleteClass(this.container,this.hiddenClass);
	}

	unhighlightTableElements(){
		var me = this;
		var body = document.querySelector('body');
		me.deleteClass(body,me.hiddenClass);
		this.removeStyleClasses(me,body);
	}

	defineStrategy(domElement){
		return this.cluster.rightStrategy(domElement);
	}

	export(me,domElement){
		var strategy = me.defineStrategy(domElement);
		var data = strategy.convertDataFrom(domElement);
		strategy.exportData(me,data);
	}

  defineStrategy(domElement) {
    this.tableDataSet = this.cluster.rightStrategy(domElement);

    /* var extractor = new SingleHeadedTableStrategy();
    this.tableDataSet = extractor.convertDataFrom(domElement);*/
    console.log(this.tableDataSet);
  }
}

const tableManager = new TableManager(); 

browser.runtime.onMessage.addListener(function callPageSideActions(request, sender) {
  console.log(`Message: ${request.message} in TableManager.`);

  if (tableManager[request.message]) {
    return tableManager[request.message](request.args); 
  }


browser.runtime.onMessage.addListener(function callPageSideActions(request, sender) {
	console.log("Message: " + request.message + " in TableManager.");
	if(tableManager[request.message]){
		return tableManager[request.message](request.args); 
	} else {
		console.log("Wrong message.");
	}
});




//
