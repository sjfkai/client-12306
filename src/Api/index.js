const getCaptcha = require('./getCaptcha');
const checkCaptcha = require('./checkCaptcha');
const query = require('./query');

class Api {
  constructor(httpClient) {
    this.httpClient = httpClient;

    this.getCaptcha = getCaptcha(this.httpClient);
    this.checkCaptcha = checkCaptcha(this.httpClient);
    this.query = query(this.httpClient);
  }
}

module.exports = Api;
