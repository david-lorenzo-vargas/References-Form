const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  env: {
    POST_URL: process.env.POST_URL,
  },
};
