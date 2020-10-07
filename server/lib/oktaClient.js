const okta = require("@okta/okta-sdk-nodejs");

const client = new okta.Client({
  orgUrl: "https://dev-587342.okta.com",
  token: "00q4Ex7qhrPw7U016JBXhBHG7flOuhbri0B8zoTgMq"
});

module.exports = client;
