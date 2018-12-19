# Infovis

* * *

## About the project

As it's right now this project contains:  
A class diagram of the extractors (readable from [draw.io](https://www.draw.io/)).  
A set of scripts, one for each class, palced at the /src folder.  
  
As the proyect it's brand new, the scripts are prepared to run **only** on the test pages provided, although it's intended to improve the functionality and range of the scripts in the future.  
  
The pages and tables we're actually using as guide are the ones listed [here](https://docs.google.com/spreadsheets/d/1yNP9g8WUKFXFEjaJTGbIcg-HSwPsolSsEcc0ps4WN8Y/edit#gid=0).  

## Building the extension

Clone the repo:

```bash
$ git clone https://gabybosetti@bitbucket.org/gabybosetti/infovis.git
```

Download the dependencies:

```bash
$ cd infovis
$ yarn
```

In case the app inside the iframe is not loaded or you want to modify it, also run:

```bash
$ cd src/visualizer
$ yarn
$ yarn build:dev
```

## Installing the extension in Chrome

After performing the steps described above,

1.  Open "chrome://extensions/" in Chrome
2.  Click "Load not packaged extension"
3.  Select any file in your add-on's root directory, `infovis/src/`

or run the following scripts,

```bash
$ yarn start:chrome # yarn start:chromium, for chromium
```

## Using the tool

Visit https://en.wikipedia.org/wiki/The_Rolling_Stones_discography

Click on the extension icon (yellow with a black bar). The tables will be  highlighted and a button will be added on their bottom.

Go down in the page to the "charted songs from 2016" section. Click on the "Export button". You can check the logged results in the Javascript console.
