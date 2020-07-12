"use strict";

module.exports = () => {

  const getUserDetails = accessToken => {
    try {
      const tokenParts = accessToken.split(".");
      const userDetails = Buffer.from(tokenParts[1], 'base64').toString('ascii');
      return JSON.parse(userDetails);
    } catch ( err ) {
      console.log( "error obtaining user details from token", err );
      throw err;
    }
  };
  return {
    getUserDetails
  };
};
