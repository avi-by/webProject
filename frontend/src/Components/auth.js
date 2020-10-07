const OKTA_DOMAIN = process.env.REACT_APP_DOMAIN;
const CLIENT_ID = "0oa134osc0m6Ajlfl4x7";
const CALLBACK_PATH = "/implicit/callback";

const ISSUER = `https://${OKTA_DOMAIN}/oauth2/default`;
const HOST = window.location.host;
const REDIRECT_URI = `http://${HOST}${CALLBACK_PATH}`;
const SCOPES = "openid profile email";
export default {
  issuer: ISSUER,
  clientId: CLIENT_ID,
  redirectUri: REDIRECT_URI,
  scope: SCOPES.split(/\s+/),
  CALLBACK_PATH: CALLBACK_PATH
};
