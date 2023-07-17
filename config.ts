require('dotenv').config();
export const projectConfig = {
  port: parseInt(process.env[`APP_SERVER_PORT`]),
  tw: {
    twitterBT: process.env[`TW_BEARER_TOKEN`],
  },
  ibm: {
    nluToken: process.env[`NLU_TOKEN`],
    nluInstanceUrl: process.env[`NLU_URL`],
    translateToken: process.env[`TRANSLATE_TOKEN`],
    translateInstanceUrl: process.env[`TRANSLATE_URL`]
  }
};

export default projectConfig;
