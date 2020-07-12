"use strict";
const axios = require( "axios" );

module.exports = ( { deskeraApiUrl } ) => {
  if ( !deskeraApiUrl ) {
   throw new Error( "Deskera API URL is required." );
  }

  const getInvoices = async accessToken => {
    try {
      const config = {
        headers: { 
        	"x-access-token": `${ accessToken }`
        }
      };
      const url = `${deskeraApiUrl}/v1/invoices/sales`;

      const res = await axios.get( url, config );
      return res.data;
    } catch ( err ) {
      console.log( "error getting invoices", err );
      throw err;
    }
  };
  return {
    getInvoices
  };
};
