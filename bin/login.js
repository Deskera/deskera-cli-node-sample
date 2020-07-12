#!/usr/bin/env node

"use strict";

const chalk = require( "chalk" );
const dotenv = require( "dotenv" );
const authClient = require( "../src/auth" );
const userClient = require( "../src/user" );
const invoiceClient = require( "../src/invoice" );

dotenv.config();

const config = {
 deskeraAuthUrl: process.env.DESKERA_AUTH_URL,
 deskeraApiUrl: process.env.DESKERA_API_URL,
 clientId: process.env.DESKERA_CLIENT_ID,
 clientSecret: process.env.DESKERA_CLIENT_SECRET,
 scopes: process.env.DESKERA_SCOPES,
 redirectUrl: process.env.DESKERA_REDIRECT_URL
};

const main = async () => {
 try {
   const auth = authClient( config );
   const token = await auth.executeAuthFlow();

   const user = userClient();
   const userDetails = user.getUserDetails ( token['deskera-token'] );
   console.log( chalk.green.bold( "Successfully authenticated Deskera CLI application for " + userDetails.name + "!") );

   const invoice = invoiceClient( config );
   const invoices = await invoice.getInvoices( token['deskera-token'] );
   console.log( chalk.blue ("Invoices:") );
   console.dir( invoices, { depth: 2 } ); //showing only 2 levels of data; set it to null to show all the levels
 } catch ( err ) {
   console.log( chalk.red( err ) );
 }
};
main();
