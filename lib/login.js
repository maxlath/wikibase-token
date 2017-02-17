const got = require('got')
const _ = require('./utils')
const { red } = require('chalk')

module.exports = (config) => {
  const { username, password } = config

  const loginUrl = `https://www.wikidata.org/w/api.php?action=login&lgname=${username}&lgpassword=${password}&format=json`

  const login = () => {
    return getLoginToken()
    .then(reallyLogin)
    .catch(_.ErrorRethrow('login'))
  }

  const getLoginToken = () => {
    return got.post(loginUrl, { json: true })
    .then(parseLoginToken)
  }

  const parseLoginToken = (res) => {
    const loginCookies = _.extractCookies(res)
    return {
      token: encodeURIComponent(res.body.login.token),
      cookies: loginCookies
    }
  }

  const reallyLogin = (data) => {
    const { cookies, token } = data
    const loginUrlWithToken = `${loginUrl}&lgtoken=${token}`

    return got.post(loginUrlWithToken, _.requestParams(cookies))
    .then(res => {
      if (res.headers['set-cookie']) {
        return _.extractCookies(res)
      } else {
        console.log(red('really login error headers'))
        console.log(res.statusCode)
        console.log(res.headers)
        console.log(res('really login error body'))
        console.log(res.body)
        throw new Error('really login error')
      }
    })
  }

  // login just once, then use the same data consuming the same promise
  return login()
}
