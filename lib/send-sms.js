// Retreives mobile phone number from KRR, returns false if reserved or not active
const axios = require('axios')
const generateSystemToken = require('./generate-token')
const logger = require('./logger')

module.exports = async payload => {
  axios.defaults.headers.common['Authorization'] = generateSystemToken(process.env.SMS_SERVICE_SECRET)
  try {
    const { data } = await axios.post(process.env.SMS_SERVICE_URL, payload)
    logger('info', ['lib', 'send-sms', 'message sendt', payload.receivers.join(', ')])
    return data
  } catch (error) {
    logger('error', ['lib', 'send-sms', error])
    return false
  }
}
