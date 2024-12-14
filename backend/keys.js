
require('dotenv').config();  

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET= process.env.REFRESH_TOKEN_SECRET;

module.exports = {
  JWT_SECRET,
};

module.exports = {
  REFRESH_TOKEN_SECRET,
};
