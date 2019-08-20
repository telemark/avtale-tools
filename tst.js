(async () => {
  require('dotenv').config()
  const getMobilePhoneNumber = require('./lib/get-mobile-number')
  const sendSmsMessage = require('./lib/send-sms')
  const uid = '18117147130'
  const mobileNumber = await getMobilePhoneNumber(uid)
  const message = {
    sender: 'VgsTelemark',
    receivers: [mobileNumber],
    message: `Husk å signere avtalen om ElevPC. https://svarut.ks.no/forsendelse/123456/1/signering Velkommen til skolestart.`
  }
  const result = await sendSmsMessage(message)
  console.log(result)
})()
