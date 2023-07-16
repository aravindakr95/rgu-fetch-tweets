require('dotenv').config();
export const projectConfig = {
  port: parseInt(process.env[`APP_SERVER_PORT`]),
  twitterBT: process.env[`API_BEARER_TOKEN`],
  watsonBT: process.env[`WATSON_API_TOKEN`],
  watsonAPIURL: process.env[`WATSON_API_URL`]
};

export default projectConfig;
