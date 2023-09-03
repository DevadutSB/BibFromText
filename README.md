# BibFromText 📚✨
Given a list of reference papers separated by new lines 📜, the program will automatically retrieve all Bibs 📖 and save them to a .bib file 💾

## How to Install 🚀
Install NodeJS 🌐

## Install Puppeteer 🤖
```shell
npm install puppeteer
```
This will also download Chromium 🌐. This is to avoid manual configuration of the browser binary path 🛠️. If you don’t want Chromium and only want Puppeteer, just install puppeteer-core 🤷‍

Note: Puppeteer only works with Chromium-based browsers (Brave, Chrome, etc.) 🤖

## How to Use 🤓
- Make a list of your reference papers based on your order 📝 and save it as a text file (.txt) 📄
- Rename values of input_path and output_path variables based on your text file name and desired output name 🔄
- Run bib.js 🏃‍♂️
```shell
node bib.js
```
- The first run will show a reCAPTCHA 🔐, solve it and prove you are not a bot 🤖 and not trying to spam the site 🚫
- Sit back and wait for it to fetch all the reference papers and cite them… ✨
