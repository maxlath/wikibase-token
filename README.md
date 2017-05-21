a promises-based lib abstracting authentification for write actions on the [Wikidata API](https://www.wikidata.org/w/api.php)

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
npm install wikidata-token
```

### use

#### with username / password

```javascript
var config = {
  // Required
  username: 'myWikidataUsername',
  password: 'pa55word',
  // Optional
  verbose: true // Default: false
  wikibaseInstance: 'https://mywikibase.instance/w/api.php' // Default: https://www.wikidata.org/w/api.php
  userAgent: `your-module/${pkg.version} (https://git.repo/username/your-module)` // Default: to 'wikidata-token/${pkg.version} (${pkg.repository.url})`
}
var wdToken = require('wikidata-token')
var getToken = wdToken(config)
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
  oauth: {
    // Obtained at registration
    // https://www.mediawiki.org/wiki/OAuth/For_Developers#Registration
    consumerKey: 'your-consumer-token',
    consumerSecret: 'your-secret-token',
    // Obtained when the user authorized your service
    // see https://www.mediawiki.org/wiki/OAuth/For_Developers#Authorization
    token: 'a-user-token',
    tokenSecret: 'a-secret-token'
  },
  // Then the optional parameters are the same
}
```

## Example

* [used in wikidata-agent to create claims](https://github.com/maxlath/wikidata-agent/blob/master/server/lib/create_claim.coffee)


## Development

To run the tests, make sure to create a `config/local.js` overriding `config/default.js` with your Wikidata username and password

## Donate

We are developing and maintaining tools to work with Wikidata from NodeJS, the browser, or simply the command line, with quality and ease of use at heart. Any donation will be interpreted as a "please keep going, your work is very much needed and awesome. PS: love". [Donate](https://liberapay.com/WikidataJS)

## See Also
* [wikidata-sdk](https://www.npmjs.com/package/wikidata-sdk)
A javascript tool suite to query and work with Wikidata data, heavily used by wikidata-cli

* [wikidata-cli](https://www.npmjs.com/package/wikidata-cli)
The command-line interface to Wikidata

* [wikidata-edit](https://www.npmjs.com/package/wikidata-edit)
Edit Wikidata from NodeJS, used in wikidata-cli for all [write operations](#write-operations)

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
