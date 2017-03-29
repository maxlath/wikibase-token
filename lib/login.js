const got = require('got')
const _ = require('./utils')
const pkg = require('../package.json')
const defaultUserAgent = `wikidata-token/${pkg.version} (${pkg.repository.url})`

module.exports = (config) => {
  const { username, password, verbose } = config
  const headers = {
    'user-agent': config.userAgent || defaultUserAgent
  }

  const loginUrl = `https://www.wikidata.org/w/api.php?action=login&format=json`

  const login = () => {
    return getLoginToken()
    .then(reallyLogin)
  }

  const getLoginToken = () => {
    const body = {
      lgname: username,
      lgpassword: password
    }
    return got.post(loginUrl, { json: true, headers, body })
    .then(parseLoginToken)
  }

  const parseLoginToken = (res) => {
    const loginCookies = _.extractCookies(res)
    if (verbose) console.log('getLoginToken res', res.body)
    return {
      token: res.body.login.token,
      cookies: loginCookies
    }
  }

  const reallyLogin = (data) => {
    const { cookies, token } = data
    const body = {
      lgname: username,
      lgpassword: password,
      lgtoken: token
    }

    const headersWithCookies = Object.assign({}, headers, { 'Cookie': cookies })

    return got.post(loginUrl, { json: true, headers: headersWithCookies, body })
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
