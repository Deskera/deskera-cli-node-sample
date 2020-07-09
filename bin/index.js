#!/usr/bin/env node

const yargs = require("yargs");
const axios = require("axios");

const args = yargs
 .usage("Usage: -n <name>")
 .option("n", { alias: "name", describe: "Your name", type: "string", demandOption: true })
 .argv;

const sal = `Hello, ${args.name}!`;
console.log(sal);

console.log("Here is a random useless fact for you:");

const url = "https://uselessfacts.jsph.pl/random.json";

axios.get(url).then(res => {
   console.log(res.data.text);
 });
