const breq = require('bluereq')
const getInstance = require('./get_instance')

const getToken = (instance, oauth, verbose) => loginCookies => {
  const params = { url: `${instance}?action=query&meta=tokens&format=json` }
  if (oauth) {
    params.oauth = oauth
  } else {
    params.headers = { 'cookie': loginCookies }
  }
  if (verbose) console.log('getToken params', params)
  return breq.get(params)
  .then(parseTokens(loginCookies, instance))
}

const parseTokens = (loginCookies, instance) => res => {
  const { error, query } = res.body
  if (error) {
    const err = new Error(`${instance} error response: ${error.info}`)
    Object.assign(err, error)
    throw err
  } else {
    return {
      token: query.tokens.csrftoken,
      cookie: loginCookies
    }
  }
}

module.exports = (config, loginCookiesPromise, oauth) => {
  const { verbose } = config
  const instance = getInstance(config)
  if (verbose) console.log('instance', instance)
  return () => loginCookiesPromise.then(getToken(instance, oauth, verbose))
}
