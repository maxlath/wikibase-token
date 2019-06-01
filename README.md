# wikidata-token

This package has been renamed [`wikibase-token`](https://www.npmjs.com/package/wikibase-token), there will be no further updates on `wikidata-token` (out of security updates).

## Transition to wikibase-token
This old `wikidata-token` code
```js
const getToken = require('wikidata-token')({ username, password })
```
can be replaced by
```js
const instance = 'https://www.wikidata.org'
const getToken = require('wikidata-token')({ instance, username, password })
```
