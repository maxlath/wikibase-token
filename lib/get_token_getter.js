const breq = require('bluereq')
const getInstanceApiEndpoint = require('./get_instance_api_endpoint')

const getToken = (instanceApiEndpoint, oauth, verbose) => loginCookies => {
  const params = { url: `${instanceApiEndpoint}?action=query&meta=tokens&format=json` }
  if (oauth) {
    params.oauth = oauth
  } else {
    params.headers = { 'cookie': loginCookies }
  }
  if (verbose) console.log('getToken params', params)
  return breq.get(params)
  .then(parseTokens(loginCookies, instanceApiEndpoint))
}

const parseTokens = (loginCookies, instanceApiEndpoint) => res => {
  const { error, query } = res.body
  if (error) {
    const err = new Error(`${instanceApiEndpoint} error response: ${error.info}`)
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
  const instanceApiEndpoint = getInstanceApiEndpoint(config)
  if (verbose) console.log('instanceApiEndpoint', instanceApiEndpoint)
  return () => loginCookiesPromise.then(getToken(instanceApiEndpoint, oauth, verbose))
}
