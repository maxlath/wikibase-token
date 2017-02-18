const test = require('ava')
const CONFIG = require('config')
const wikidataToken = require('../wikidata-token.js')

test('wikidata-token works', t => {
  const tokenGetter = wikidataToken(CONFIG)
  t.is(typeof tokenGetter, 'function')

  return tokenGetter()
  .then(res => {
    t.true(res.token.length > 40)
    const { cookie } = res
    // \w{30} => at least 32 characters
    t.true(/wikidatawikiSession=\w{32}/.test(cookie))
    t.true(/wikidatawikiUserID=\d{5}/.test(cookie))
    t.true(/wikidatawikiUserName=\w+/.test(cookie))
    t.true(/centralauth_Session=\w{32}/.test(cookie))
    t.true(/centralauth_Token=\w{32}/.test(cookie))
  })
})
