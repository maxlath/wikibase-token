const login = require('./lib/login')
const getTokenGetter = require('./lib/get_token_getter')

module.exports = config => {
  if (!(config.oauth || (config.username && config.password))) {
    throw new Error('no authentification means provided')
  }

  var loginCookiesPromise
  const getLoginCookies = () => {
    if (loginCookiesPromise) return loginCookiesPromise
    if (config.oauth) loginCookiesPromise = Promise.resolve('')
    else loginCookiesPromise = login(config)
    return loginCookiesPromise
  }

  return getTokenGetter(config, getLoginCookies)
}
