## Kickstarter Project

This project is a modified copy of the code as used in the udemy course:
https://www.udemy.com/course/ethereum-and-solidity-the-complete-developers-guide/

The modification considers a weighted election system that feels more natural.

## Open kickstarter web API in browser

Navigate to kickstarter homefolder and run

`npm run dev`

Open http://localhost:3000 in any browser.

## Run tests

`npm test`

The tests are located in the test/Campaign.test.js and run via the mocha library

## Redeploy contract

Navigate to etherium folder and run

`node deploy.js`

Add the contract key given in _Contract deployed to_ line to factory.js
