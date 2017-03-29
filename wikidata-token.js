const login = require('./lib/login')
const getTokenGetter = require('./lib/get_token_getter')

module.exports = (config) => {
  const loginCookiesPromise = login(config)
  return getTokenGetter(config, loginCookiesPromise)
}
