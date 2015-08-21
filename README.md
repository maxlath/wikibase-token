a promises-based lib abstracting authentification for write actions on the [Wikidata API](https://www.wikidata.org/w/api.php)

### How To

* install
```
npm install wikidata-token
```

* use
```
var config = {username: 'myWikidataUsername', password: 'pa55word'};
var wdToken = require('wikidata-token');
var getToken = wdToken(config);

```

`getToken` is then a function returning a [bluebird](https://github.com/petkaantonov/bluebird) promise, which when called returns an object that should look like:
```
{
  token: 'eb974a8adc9abacf7c9f3f94763ad92e51d76e57+\\',
  cookie: 'a very long cookie with your session data'
}
```
