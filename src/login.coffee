breq = require 'bluereq'
_ = require './utils'

module.exports = (config)->
  { username, password } = config

  loginUrl = "https://www.wikidata.org/w/api.php?action=login&lgname=#{username}&lgpassword=#{password}&format=json"

  login = ->
    getLoginToken()
    .then reallyLogin
    .catch _.ErrorRethrow('login')

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
    .then (res)->
      if res.headers['set-cookie']? then _.extractCookies res
      else
        console.log 'really login error headers'.red
        console.log res.statusCode
        console.log res.headers
        console.log 'really login error body'.red
        console.log res.body
        throw new Error 'really login error'

  # login just once, then use the same data consuming the same promise
  return login()