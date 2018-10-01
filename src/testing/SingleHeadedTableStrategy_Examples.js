// For https://en.wikipedia.org/wiki/The_Rolling_Stones_discography 
(new SingleHeadedTableStrategy()).convertDataFrom(document.querySelectorAll(".wikitable")[3]);

//For https://safearound.com/es/danger-rankings/
(new SingleHeadedTableStrategy()).convertDataFrom(document.querySelector("table"));

//For http://merco.info/ar/ranking-merco-empresas
	// XPATH: //*[@id="tabla"]   --------> add an id to the dom elem, in this case "table"
(new SingleHeadedTableStrategy().convertDataFrom(document.querySelector("#table")));

//For https://es.fifa.com/fifa-world-ranking/ranking-table/men/index.html
	// XPATH: /html/body/div[1]/div[4]/div/div[3]/div/div[2]/table --------> add an id to the dom elem, in this case "table"
(new SingleHeadedTableStrategy().convertDataFrom(document.querySelector("#table")));

//For http://www.webometrics.info/es/world--------> add an id to the dom elem, in this case "table"
	// XPATH : /html/body/div[2]/div[3]/div[3]/div[2]/div[1]/div[2]/div/div/div/table[2]
(new SingleHeadedTableStrategy().convertDataFrom(document.querySelector("#table")));

//For https://www.worldrugby.org/rankings/mru?lang=es
	//XPATH : /html/body/section/div[6]/div/div/div[3]/section/section/div[2]/div/div/table--------> add an id to the dom elem, in this case "table"
(new SingleHeadedTableStrategy().convertDataFrom(document.querySelector("#table")));

//For https://www.scimagojr.com/journalrank.php
	//XPATH : /html/body/div[7]/div[7]/table--------> add an id to the dom elem, in this case "table"
(new SingleHeadedTableStrategy().convertDataFrom(document.querySelector("#table")));

//TODO: complete with other examples in https://docs.google.com/spreadsheets/d/1yNP9g8WUKFXFEjaJTGbIcg-HSwPsolSsEcc0ps4WN8Y/edit#gid=0