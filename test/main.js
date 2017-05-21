const test = require('ava')
const CONFIG = require('config')
const wikidataToken = require('../wikidata-token.js')

test('get token from username and password', t => {
  const tokenGetter = wikidataToken(CONFIG.credentials)
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

test('get token from oauth', t => {
  const { oauth } = CONFIG
  const tokenGetter = wikidataToken({ oauth })
  t.is(typeof tokenGetter, 'function')

  return tokenGetter()
  .then(res => {
    t.true(res.token.length > 40)
  })
})
