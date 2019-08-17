const jwt = require('jsonwebtoken')
const { name, version } = require('../package.json')

module.exports = secret => {
  const payload = {
    system: name,
    version: version
  }

  const options = {
    expiresIn: '1m',
    issuer: 'https://auth.t-fk.no'
  }

  const token = jwt.sign(payload, secret, options)

  return `Bearer ${token}`
}
