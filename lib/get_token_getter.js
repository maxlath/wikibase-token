const got = require('got')
const getInstance = require('./get_instance')

const getToken = (instance) => (loginCookies) => {
  const url = `${instance}?action=query&meta=tokens&format=json`
  const headers = { 'cookie': loginCookies }
  return got.get(url, { headers })
  .then(parseTokens.bind(null, loginCookies))
}

const parseTokens = (loginCookies, res) => {
  return {
    token: JSON.parse(res.body).query.tokens.csrftoken,
    cookie: loginCookies
  }
}

module.exports = (config, loginCookiesPromise) => {
  const instance = getInstance(config)
  return () => loginCookiesPromise.then(getToken(instance))
}
