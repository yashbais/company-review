const dotenv = require('dotenv').config();
exports.envConfig = {
   DATABASE:process.env.DATABASE,
   DB_ENDPOINT:process.env.DB_ENDPOINT,
   DB_AUTHKEY:process.env.DB_AUTHKEY,
   COMPANY_CONTAINER:process.env.COMPANY_CONTAINER,
}

