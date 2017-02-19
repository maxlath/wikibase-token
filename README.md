a promises-based lib abstracting authentification for write actions on the [Wikidata API](https://www.wikidata.org/w/api.php)

## Summary
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [How To](#how-to)
- [Example](#example)
- [Development](#development)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## How To

* install
```bash
npm install wikidata-token
```

* use
```javascript
var config = {
  // Required
  username: 'myWikidataUsername',
  password: 'pa55word',
  // Optional
  verbose: true // Default: false
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

## Example

* [used in wikidata-agent to create claims](https://github.com/maxlath/wikidata-agent/blob/master/server/lib/create_claim.coffee)


## Development

To run the tests, make sure to create a `config/local.js` overriding `config/default.js` with your Wikidata username and password
