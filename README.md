# README #

As it's right now this project contains:  
A class diagram of the extractors (readable from [draw.io](https://www.draw.io/)).  
A set of scripts, one for each class, palced at the /src folder.  
  
As the proyect it's brand new, the scripts are prepared to run **only** on the test pages provided, although it's intended to improve the functionality and range of the scripts in the future.  
  
The pages and tables we're actually using as guide are the ones listed [here](https://docs.google.com/spreadsheets/d/1yNP9g8WUKFXFEjaJTGbIcg-HSwPsolSsEcc0ps4WN8Y/edit#gid=0).  

# INSTALL #

Clone the repo
`git clone https://gabybosetti@bitbucket.org/gabybosetti/infovis.git`

Check out which is the more convenient branch and move there. E.g.
`git checkout Development`

Change to the src dir where the extension is installed
`cd src`

Install the dependencies
`npm install`

Open chrome:about with the Chrome/Chromium browser, and install the extension by selecting the src folder "as an unpackaged extension".

# USE #

Visit https://en.wikipedia.org/wiki/The_Rolling_Stones_discography

Click on the extension icon (yellow with a black bar). The tables will be  highlighted and a button will be added on their bottom.

Go down in the page to the "charted songs from 2016" section. Click on the "Export button". You can check the logged results in the Javascript console. 