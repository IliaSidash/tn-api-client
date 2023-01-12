# tn-api-client

Tradernet API nodejs client

# Usages

```
const { create } = require('tn-api-client');

const options = {
  host: 'freedom24.com',
  path: '/api',
  sid: 'YOUR_SID',
};

const { post } = create(options);

post('getSecurityInfo', { ticker: 'AAPL.US' })
  .then(console.log)
  .catch((error) => console.log('error', error));

```
