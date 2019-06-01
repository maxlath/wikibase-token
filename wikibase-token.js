const login = require('./lib/login')
const getTokenGetter = require('./lib/get_token_getter')

module.exports = (config) => {
  if (config.oauth) {
    const loginCookiesPromise = Promise.resolve('')
    return getTokenGetter(config, loginCookiesPromise, config.oauth)
  } else if (config.username && config.password) {
    const loginCookiesPromise = login(config)
    return getTokenGetter(config, loginCookiesPromise)
  } else {
    throw new Error('no authentification means provided')
  }
}
