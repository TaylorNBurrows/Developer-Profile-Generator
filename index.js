const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");
const genHTML = require("./generateHTML")

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
      {
        type: "input",
        name: "username",
        message: "What is your GitHub username?"
      },
      {
        type: "input",
        name: "FavColor",
        message: "What is your favorite color?"
      },
      
    ]);
  }
  promptUser()
  .then(function(data) {
    const html = generateHTML(data);

    return writeFileAsync("index.html", html);
  })
  .then(function() {
    console.log("Successfully wrote to index.html");
  })
  .catch(function(err) {
    console.log(err);
  });


// function writeToFile(fileName, data) {
 
// }

// function init() {

// init();
