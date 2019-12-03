const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");
const genHTML = require("./generateHTML");
const createPDF = require("html-pdf");
const options = { format: "Letter"}


const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "username",
      message: "What is your GitHub username?"
    },
    {
      type: "list",
      message: "What is your favorite color?",
      name: "FavColor",
      choices: [
        "green",
        "blue",
        "pink",
        "red"
      ]
    }
  ]);
}

  function init() {
    promptUser()
    .then(function ({ username, FavColor }) {
      const color = FavColor

      const queryURL = `https://api.github.com/users/${username}`
      axios.get(queryURL).then(function (res) {
        console.log(res)

        res.data.color = color

        const html = genHTML(res.data);

        console.log(html)
        
        createPDF.create(html, options).toFile('./profile.pdf', function(err, res) {
          if (err) return console.log(err);
          console.log(res); // { filename: '/app/businesscard.pdf' }
        });


      })

    })
}

init();