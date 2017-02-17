const test = require('ava')
const CONFIG = require('config')
const wikidataToken = require('../index.js')

test('wikidata-token works', t => {
  const tokenGetter = wikidataToken(CONFIG)
  t.is(typeof tokenGetter, 'function')

  return tokenGetter()
  .then(res => {
    t.true(res.token.length > 40)
    t.true(res.cookie.length > 1000)
  })
})
