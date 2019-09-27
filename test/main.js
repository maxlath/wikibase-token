const should = require('should')
const { instance, credentials, oauth } = require('config')
const { username, password } = credentials
const wikibaseToken = require('../wikibase-token.js')

describe('wikibase-token', function () {
  this.timeout(10000)

  it('should get token from username and password', done => {
    const tokenGetter = wikibaseToken({ instance, username, password })
    tokenGetter.should.be.a.Function()
    tokenGetter()
    .then(res => {
      res.token.length.should.be.above(40)
      const { cookie } = res
      should(/wikibase_session=\w{32}/.test(cookie)).be.true()
      should(/wikibaseUserID=\d+/.test(cookie)).be.true()
      should(/wikibaseUserName=\w+/.test(cookie)).be.true()
      should(/wikibaseToken=\w+/.test(cookie)).be.true()
      done()
    })
    .catch(done)
  })

  it('should get token from oauth', done => {
    const tokenGetter = wikibaseToken({ instance, oauth })
    tokenGetter.should.be.a.Function()
    tokenGetter()
    .then(res => {
      res.token.length.should.be.above(40)
      done()
    })
    .catch(done)
  })
})
