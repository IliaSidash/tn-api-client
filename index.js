const { create } = require('./lib/index.js');

const options = {
  host: 'freedom24.com',
  path: '/api',
  sid: 'YOUR_SID',
};

const { post } = create(options);

post('getSecurityInfo', { ticker: 'AAPL.US' })
  .then(console.log)
  .catch((error) => console.log('error', error));
