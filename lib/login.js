const breq = require('bluereq')
const _ = require('./utils')
const pkg = require('../package.json')
const getInstance = require('./get_instance')
const defaultUserAgent = `wikidata-token/${pkg.version} (${pkg.repository.url})`
const qs = require('querystring')

module.exports = config => {
  const { username, password, verbose } = config
  const headers = {
    'user-agent': config.userAgent || defaultUserAgent,
    'content-type': 'application/x-www-form-urlencoded'
  }
  const instance = getInstance(config)
  const loginUrl = `${instance}?action=login&format=json`

  const login = () => {
    return getLoginToken()
    .then(reallyLogin)
  }

  const getLoginToken = () => {
    const body = qs.stringify({
      lgname: username,
      lgpassword: password
    })
    return breq.post({ url: loginUrl, headers, body })
    .then(parseLoginToken)
  }

  const parseLoginToken = res => {
    const loginCookies = _.extractCookies(res)
    if (verbose) console.log('getLoginToken res', res.body)
    return {
      token: res.body.login.token,
      cookies: loginCookies
    }
  }

  const reallyLogin = data => {
    const { cookies, token } = data
    const body = qs.stringify({
      lgname: username,
      lgpassword: password,
      lgtoken: token
    })

    const headersWithCookies = Object.assign({}, headers, { 'Cookie': cookies })

    return breq.post({ url: loginUrl, headers: headersWithCookies, body })
    .then(res => {
      if (verbose) console.log('reallyLogin res', res.body)
      if (res.headers['set-cookie']) {
        return _.extractCookies(res)
      } else {
        const err = new Error('login error')
        err.statusCode = res.statusCode
        err.body = res.body
        throw err
      }
    })
  }

  // login just once, then use the same data consuming the same promise
  return login()
}
