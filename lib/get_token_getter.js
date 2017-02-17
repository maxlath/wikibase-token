const got = require('got')
const _ = require('./utils')

const getToken = (loginCookies) => {
  const url = 'https://www.wikidata.org/w/api.php?action=query&meta=tokens&format=json'
  return got.get(url, _.requestParams(loginCookies))
  .then(parseTokens.bind(null, loginCookies))
}

const parseTokens = (loginCookies, res) => {
  return {
    token: JSON.parse(res.body).query.tokens.csrftoken,
    cookie: loginCookies
  }
}

module.exports = (loginCookiesPromise) => {
  return () => {
    return loginCookiesPromise
    .then(getToken)
    .catch(_.ErrorRethrow('getToken'))
  }
}
