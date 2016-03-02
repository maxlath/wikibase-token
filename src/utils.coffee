require 'colors'

module.exports =
  extractCookies: (res)->
    res.headers['set-cookie'].join(' ; ')

  requestParams: (url, cookies, body)->
    url: url
    body: body
    headers:
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      'Cookie': cookies

  ErrorRethrow: (label)->
    return errorRethrow = (err)->
      # log the error
      console.log "*******#{label.red}*******"
      console.log err
      console.log '--------------------------'
      # and rethrow to let catchers down the promise chain handle the error
      throw err
