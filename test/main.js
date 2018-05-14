const should = require('should')
const CONFIG = require('config')
const wikidataToken = require('../wikidata-token.js')

describe('wikidata-token', function () {
  this.timeout(10000)

  it('should get token from username and password', done => {
    const tokenGetter = wikidataToken(CONFIG.credentials)
    tokenGetter.should.be.a.Function()
    tokenGetter()
    .then(res => {
      res.token.length.should.be.above(40)
      const { cookie } = res
      // \w{30} => at least 32 characters
      should(/wikidatawikiSession=\w{32}/.test(cookie)).be.true()
      should(/wikidatawikiUserID=\d{5}/.test(cookie)).be.true()
      should(/wikidatawikiUserName=\w+/.test(cookie)).be.true()
      should(/centralauth_Session=\w{32}/.test(cookie)).be.true()
      should(/centralauth_Token=\w{32}/.test(cookie)).be.true()
      done()
    })
    .catch(done)
  })

  it('should get token from oauth', done => {
    const { oauth } = CONFIG
    const tokenGetter = wikidataToken({ oauth })
    tokenGetter.should.be.a.Function()
    tokenGetter()
    .then(res => {
      res.token.length.should.be.above(40)
      done()
    })
    .catch(done)
  })
})
