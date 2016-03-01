breq = require 'bluereq'
_ = require './utils'


module.exports = (config)->
  { username, password } = config

  loginUrl = "https://www.wikidata.org/w/api.php?action=login&lgname=#{username}&lgpassword=#{password}&format=json"

  login = ->
    getLoginToken()
    .then reallyLogin
    .catch _.Error('login')

  getLoginToken = ->
    breq.post loginUrl
    .then parseLoginToken

  parseLoginToken = (res)->
    loginCookies = _.extractCookies res
    return data =
      token: encodeURIComponent res.body.login.token
      cookies: loginCookies

  reallyLogin = (data)->
    { cookies, token } = data

    loginUrlWithToken = "#{loginUrl}&lgtoken=#{token}"

    breq.post _.requestParams(loginUrlWithToken, cookies)
    .then _.extractCookies

  # login just once, then use the same data consuming the same promise
  return login()