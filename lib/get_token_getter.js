const breq = require('bluereq')
const getInstance = require('./get_instance')

const getToken = (instance, oauth) => loginCookies => {
  const params = { url: `${instance}?action=query&meta=tokens&format=json` }
  if (oauth) {
    params.oauth = oauth
  } else {
    params.headers = { 'cookie': loginCookies }
  }
  return breq.get(params)
  .then(parseTokens(loginCookies))
}

const parseTokens = loginCookies => res => {
  return {
    token: res.body.query.tokens.csrftoken,
    cookie: loginCookies
  }
}

module.exports = (config, loginCookiesPromise, oauth) => {
  const instance = getInstance(config)
  return () => loginCookiesPromise.then(getToken(instance, oauth))
}
