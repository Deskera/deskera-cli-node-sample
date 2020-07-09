#!/usr/bin/env node

const yargs = require("yargs");
const axios = require("axios");

const args = yargs
 .usage("Usage: -n <name>")
 .option("n", { alias: "name", describe: "Your name", type: "string", demandOption: true })
 .option("l", { alias: "lang", describe: "Language", type: "string" })
 .argv;

const sal = `Hello, ${args.name}!`;
console.log(sal);

if (args.lang) {
 console.log(`Here is a random useless fact in ${args.lang}...`)
} else {
 console.log("Here is a random useless fact for you:");
}

const url = args.lang ? `https://uselessfacts.jsph.pl/random.json?language=${escape(args.lang)}` : "https://uselessfacts.jsph.pl/random.json";

axios.get(url).then(res => {
    console.log(res.data.text);
  }).catch(err => {
    console.log(err.response.data.message);
  });
