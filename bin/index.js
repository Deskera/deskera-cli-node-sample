#!/usr/bin/env node

const yargs = require("yargs");

const args = yargs
 .usage("Usage: -n <name>")
 .option("n", { alias: "name", describe: "Your name", type: "string", demandOption: true })
 .argv;
 
const greeting = `Hello, ${args.name}!`;

console.log(greeting);