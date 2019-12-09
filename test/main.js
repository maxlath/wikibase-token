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
      should(/.+[sS]ession=\w{32}/.test(cookie)).be.true('should contain session ID')
      should(/.+UserID=\d+/.test(cookie)).be.true('should contain user ID')
      should(/.+UserName=\w+/.test(cookie)).be.true('should contain username')
      should(/.+Token=\w+/.test(cookie)).be.true('should contain token')
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

  it('should reject on invalid username/password credentials', done => {
    const tokenGetter = wikibaseToken({ instance, username: 'inva', password: 'lid' })
    tokenGetter.should.be.a.Function()
    tokenGetter()
    .then(undesiredRes(done))
    .catch(err => {
      err.message.should.startWith('failed to get login cookies')
      done()
    })
    .catch(done)
  })

  it('should reject on invalid oauth credentials', done => {
    const tokenGetter = wikibaseToken({
      instance,
      oauth: {
        consumer_key: 'in',
        consumer_secret: 'va',
        token: 'li',
        token_secret: 'd'
      }
    })
    tokenGetter.should.be.a.Function()
    tokenGetter()
    .then(undesiredRes(done))
    .catch(err => {
      err.message.should.endWith('Invalid consumer')
      done()
    })
    .catch(done)
  })
})

const undesiredRes = done => () => done(new Error("shouldn't have been called"))
