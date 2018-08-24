// For https://en.wikipedia.org/wiki/The_Rolling_Stones_discography 
(new SingleHeadedTableStrategy()).convertDataFrom(document.querySelectorAll(".wikitable")[3]);

//For https://safearound.com/es/danger-rankings/
(new SingleHeadedTableStrategy()).convertDataFrom(document.querySelector("table"));

//For http://merco.info/ar/ranking-merco-empresas
	// XPATH: //*[@id="tabla"]   --------> add an id to the dom elem, in this case "table"
(new SingleHeadedTableStrategy().convertDataFrom(document.querySelector("table")));



//TODO: complete with other examples in https://docs.google.com/spreadsheets/d/1yNP9g8WUKFXFEjaJTGbIcg-HSwPsolSsEcc0ps4WN8Y/edit#gid=0