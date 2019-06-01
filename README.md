# wikibase-token

A promises-based lib abstracting authentification for write requests on a [Wikibase](http://wikiba.se) API.

See [Wikidata API](https://www.wikidata.org/w/api.php) for API reference.

This package was primarily published as `wikidata-token` but has now being generalized to support any Wikibase instance: [wikidata.org](https://www.wikidata.org) among others.

<div align="center">
  <a href="https://wikiba.se"><img height="150" src="https://raw.githubusercontent.com/maxlath/wikibase-sdk/master/assets/wikibase.png" alt="wikibase"></a>
  <!-- yeay hacky margin \o/ -->
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://wikidata.org"><img src="https://raw.githubusercontent.com/maxlath/wikibase-sdk/master/assets/wikidata.jpg" alt="wikidata"></a>
</div>

[![NPM](https://nodei.co/npm/wikibase-sdk.png?stars&downloads&downloadRank)](https://npmjs.com/package/wikibase-token/)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node](https://img.shields.io/badge/node-%3E=%20v6.4.0-brightgreen.svg)](http://nodejs.org)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Summary
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [How To](#how-to)
  - [install](#install)
  - [use](#use)
    - [with username / password](#with-username--password)
    - [with OAuth](#with-oauth)
- [Example](#example)
- [Development](#development)
- [Donate](#donate)
- [See Also](#see-also)
- [You may also like](#you-may-also-like)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## How To

### install
```bash
npm install wikibase-token
```

### use

#### with username / password

```javascript
var config = {
  // Required
  instance: 'https://mywikibase.instance', // For Wikidata, that would be 'https://www.wikidata.org'
  username: 'myUsername',
  password: 'pa55word',
  // Optional
  verbose: true, // Default: false
  userAgent: `your-module/${pkg.version} (https://git.repo/username/your-module)` // Default: to 'wikibase-token/${pkg.version} (${pkg.repository.url})`
}
var wbToken = require('wikibase-token')
var getToken = wbToken(config)
```

`getToken` is then a function, which when called returns an ES6 promise that shoud resolve to something looking like:
```javascript
{
  token: 'eb974a8adc9abacf7c9f3f94763ad92e51d76e57+\\',
  cookie: 'a very long cookie with your session data'
}
```

Your request header should then look like:
```
'cookie': cookie
'content-type': 'application/x-www-form-urlencoded'
```
and the token should then be passed in the body of your request as form data (thus the `x-www-form-urlencoded` header) and NOT ~~JSON~~ (this one got me crazy and made me realize that there was a time JSON wasn't obvious..! poor elders of the Internet), in addition with the other field expected by the API action you're using: contrary to what the API documentation seem to indicate, for POST action, parameters are passed in the body and not in the url (out of `action` and `format`)

#### with OAuth

same as with username / password but your config object will look like:
```js
var config = {
  // Required
  instance: 'https://mywikibase.instance', // For Wikidata, that would be 'https://www.wikidata.org'
  oauth: {
    // Obtained at registration
    // https://www.mediawiki.org/wiki/OAuth/For_Developers#Registration
    consumer_key: 'your-consumer-token',
    consumer_secret: 'your-secret-token',
    // Obtained when the user authorized your service
    // see https://www.mediawiki.org/wiki/OAuth/For_Developers#Authorization
    token: 'a-user-token',
    token_secret: 'a-secret-token'
  },
  // Then the optional parameters are the same
}
```

## Example
* [used by wikibase-edit](https://github.com/maxlath/wikibase-edit/blob/master/lib/request.js)

## Development

To run the tests, make sure to create a `config/local.js` overriding `config/default.js` with the username and password of a Wikibase instance

## Donate

We are developing and maintaining tools to work with Wikidata from NodeJS, the browser, or simply the command line, with quality and ease of use at heart. Any donation will be interpreted as a "please keep going, your work is very much needed and awesome. PS: love". [Donate](https://liberapay.com/WikidataJS)

## See Also
* [wikibase-sdk](https://www.npmjs.com/package/wikibase-sdk)
A javascript tool suite to query and work with Wikibase data, heavily used by wikibase-cli

* [wikibase-cli](https://www.npmjs.com/package/wikibase-cli)
The command-line interface to Wikibase

* [wikibase-edit](https://www.npmjs.com/package/wikibase-edit)
Edit Wikibase from NodeJS, used in wikibase-cli for all [write operations](#write-operations)

* [wikidata-filter](https://npmjs.com/package/wikidata-filter)
A command-line tool to filter a Wikidata dump by claim

* [wikidata-subset-search-engine](https://github.com/inventaire/wikidata-subset-search-engine)
Tools to setup an ElasticSearch instance fed with subsets of Wikidata

* [wikidata-taxonomy](https://github.com/nichtich/wikidata-taxonomy)
A command-line tool to extract taxonomies from Wikidata

* [Other Wikidata external tools](https://www.wikidata.org/wiki/Wikidata:Tools/External_tools)

## You may also like

[![inventaire banner](https://inventaire.io/public/images/inventaire-brittanystevens-13947832357-CC-BY-lighter-blue-4-banner-500px.png)](https://inventaire.io)

Do you know [inventaire.io](https://inventaire.io/)? It's a web app to share books with your friends, built on top of Wikidata! And its [libre software](http://github.com/inventaire/inventaire) too.

## License
[MIT](LICENSE.md)
