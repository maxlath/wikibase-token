module.exports = _ = require 'inv-loggers'

_.extractCookies = (res)->
  res.headers['set-cookie'].join(' ; ')

_.requestParams = (url, cookies, body)->
  url: url
  body: body
  headers:
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
    'Cookie': cookies