login = require './login'
getTokenGetter = require './get_token_getter'

module.exports = (config)->
  loginCookiesPromise = login config
  return getTokenGetter loginCookiesPromise
