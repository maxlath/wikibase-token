const { red } = require('chalk')

module.exports = {
  extractCookies: (res) => res.headers['set-cookie'].join(' ; '),

  requestParams: (cookies, body) => {
    return {
      body: body,
      headers: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': cookies
      }
    }
  },

  ErrorRethrow: (label) => {
    return (err) => {
      // log the error
      console.log(`*******${red(label)}*******`)
      console.log(err)
      console.log('--------------------------')
      // and rethrow to let catchers down the promise chain handle the error
      throw err
    }
  }
}
