breq = require 'bluereq'
_ = require './utils'

getToken = (loginCookies)->
  url = "https://www.wikidata.org/w/api.php?action=query&meta=tokens&format=json"
  breq.get _.requestParams(url, loginCookies)
  .then parseTokens.bind(null, loginCookies)

parseTokens = (loginCookies, res)->
  newCookies = _.extractCookies res
  fullCookies = loginCookies + ';\n'+ newCookies

  return data =
    token: res.body.query.tokens.csrftoken
    cookie: fullCookies

module.exports = (loginCookiesPromise)->
  return tokenGetter = ->
    loginCookiesPromise
    .then getToken
    .catch _.Error('getToken')
