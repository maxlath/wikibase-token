const { red } = require('chalk')

module.exports = {
  extractCookies: (res) => res.headers['set-cookie'].join(' ; '),

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
