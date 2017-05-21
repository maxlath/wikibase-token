const login = require('./lib/login')
const getTokenGetter = require('./lib/get_token_getter')
const formatOauthData = require('./lib/format_oauth_data')

module.exports = (config) => {
  if (config.oauth) {
    const oauth = formatOauthData(config.oauth)
    const loginCookiesPromise = Promise.resolve('')
    return getTokenGetter(config, loginCookiesPromise, oauth)
  } else if (config.username && config.password) {
    const loginCookiesPromise = login(config)
    return getTokenGetter(config, loginCookiesPromise)
  } else {
    throw new Error('no authentification means provided')
  }
}
