const HttpClient = require('./utils/HttpClient');
const Api = require('./Api');

class Client {
  constructor() {
    this.httpClient = new HttpClient();
    this.api = new Api(this.httpClient);
  }
}

module.exports = Client;
