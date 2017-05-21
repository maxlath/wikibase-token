/*
  eslint-disable camelcase
*/

module.exports = (data) => {
  const consumer_key = formatToken(data, 'consumerKey', 32)
  const consumer_secret = formatToken(data, 'consumerSecret', 40)
  const token = formatToken(data, 'token', 32)
  const token_secret = formatToken(data, 'tokenSecret', 40)
  // Preparing the case required by bluereq/request oauth object interface
  return { consumer_key, consumer_secret, token, token_secret }
}

const formatToken = (obj, tokenName, length) => {
  const token = obj[tokenName]
  if (!(token && (token.length === length) && /^[a-f0-9]+$/.test(token))) {
    throw new Error(`invalid ${tokenName}: ${token}`)
  }
  return token
}
