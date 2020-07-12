"use strict";

const axios = require( "axios" );
const crypto = require( "crypto" );
const hapi = require( "@hapi/hapi" );
const open = require( "open" );
const querystring = require( "querystring" );
const { v1: uuid } = require('uuid');

const base64url = str => {
  return str.replace( /\+/g, "-" ).replace( /\//g, "_" ).replace( /=+$/, "" );
};
module.exports = ( { deskeraAuthUrl, deskeraApiUrl, clientId, clientSecret, scopes, redirectUrl } ) => {
  if ( !deskeraAuthUrl || !deskeraApiUrl || !clientId || !clientSecret || !scopes || !redirectUrl ) {
   throw new Error( "Deskera URLs, client ID and Secret, scopes, and redirect URL are required." );
 }

 const redirectUri = `${redirectUrl}`;

 const buildAuthorizeUrl = () => {
   const data = {
     client_id: clientId,
     response_type: "code",
     scope: scopes,
     redirect_uri: redirectUri,
     state: uuid()
   };
   const params = querystring.stringify( data );
   const authorizeUrl = `${deskeraAuthUrl}?${params}`;
   return authorizeUrl;
 };
 
 const getToken = async code => {
   try {
     const config = {
       headers: { Authorization: `Basic `.concat(Buffer.from(`${clientId}:${clientSecret}`).toString('base64')) }
     };
     const request = {
       grant_type: "authorization_code",
       scope: scopes,
       code: code
     };
     const url = `${deskeraApiUrl}/oauth/token`;
     const data = querystring.stringify( request );

     const res = await axios.post( url, data, config);
     return res.data;
   } catch ( err ) {
     console.log( "error getting token", err );
     throw err;
   }
 };

 const executeAuthFlow = () => {
   return new Promise( async ( resolve, reject ) => {
     //Run a local web server
     const server = hapi.server( {
       port: 8080,
       host: "localhost",
       routes: {
         cors: true
       }
     } );

     server.route( {
       method: ['GET'],
       path: "/callback",
       handler: async request => {
         try {
           const code = request.query.code;
           const token = await getToken( code );
           resolve( token );
           return `Token received ${token['deskera-token']}`;
         } catch ( err ) {
           reject( err );
         } finally {
           server.stop();
         }
       }
     } );
     await server.start();

     const authorizeUrl = buildAuthorizeUrl();
     open( authorizeUrl );
   } );
 };
 return {
   executeAuthFlow
 };
};
