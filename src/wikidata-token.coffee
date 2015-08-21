login = require './login'
getToken = require './get_token'

module.exports = (config)->
  loginCookiesPromise = login config

  return getToken(loginCookiesPromise)
