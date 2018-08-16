// For https://en.wikipedia.org/wiki/The_Rolling_Stones_discography 
(new SingleHeadedTableExtractor()).createDataSetFrom(document.querySelectorAll(".wikitable")[3]);

//For https://safearound.com/es/danger-rankings/
(new SingleHeadedTableExtractor()).createDataSetFrom(document.querySelector("table"));

//TODO: complete with other examples in https://docs.google.com/spreadsheets/d/1yNP9g8WUKFXFEjaJTGbIcg-HSwPsolSsEcc0ps4WN8Y/edit#gid=0