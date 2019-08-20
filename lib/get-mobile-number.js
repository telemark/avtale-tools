// Retreives mobile phone number from KRR, returns false if reserved or not active
const axios = require('axios')
const generateSystemToken = require('./generate-token')
const logger = require('./logger')

function fixPhoneNumber (phone) {
  phone = phone.replace(/\D+/g, '')
  return phone.length === 8 ? `47${phone}` : phone
}

module.exports = async fnr => {
  logger('info', ['lib', 'get-mobile-number', 'start'])
  axios.defaults.headers.common['Authorization'] = generateSystemToken(process.env.KRR_SERVICE_SECRET)
  try {
    logger('info', ['lib', 'get-mobile-number', 'looking up data'])
    const { data } = await axios.post(process.env.KRR_SERVICE_URL, [fnr])
    logger('info', ['lib', 'get-mobile-number', 'got data', data.personer.length])
    const person = data.personer[0]
    if (person) {
      if (person.reservasjon === 'NEI' && person.status === 'AKTIV' && person.kontaktinformasjon && person.kontaktinformasjon.mobiltelefonnummer && person.kontaktinformasjon.mobiltelefonnummer !== '') {
        return fixPhoneNumber(person.kontaktinformasjon.mobiltelefonnummer)
      } else {
        return false
      }
    } else {
      return false
    }
  } catch (error) {
    logger('error', ['lib', 'get-mobile-number', error])
    return false
  }
}
