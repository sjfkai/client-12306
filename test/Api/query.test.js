const moment = require('moment');
const assert = require('assert');

const Client = require('../../src/Client');

describe('api.query', () => {
  it('query', async function query() {
    this.timeout(10000);
    const client = new Client();
    const date = moment().format('YYYY-MM-DD');
    const rows = await client.api.query('BJP', 'HBB', date);
    console.log(rows);
    assert(rows[0]);
  });
});
