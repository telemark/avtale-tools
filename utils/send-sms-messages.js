(async () => {
  require('dotenv').config()
  const { writeFile } = require('fs').promises
  const logger = require('../lib/logger')
  const getMobilePhoneNumber = require('../lib/get-mobile-number')
  const sendSmsMessage = require('../lib/send-sms')
  const avtaler = require('../data/avtaler-query.json')
  let successCount = 0
  let failCount = 0
  logger('info', ['utils', 'send-sms-message', 'ready', `got ${avtaler.length} avtaler`])
  while (avtaler.length > 0) {
    const avtale = avtaler.pop()
    logger('info', ['utils', 'send-sms-message', 'avtale', avtale.aid])
    const mobileNumber = await getMobilePhoneNumber(avtale.uid)
    logger('info', ['utils', 'send-sms-message', 'avtale', avtale.aid, 'mobileNumber', mobileNumber])
    if (mobileNumber) {
      const message = {
        sender: 'VgsTelemark',
        receivers: [mobileNumber],
        message: `Husk å signere avtalen om ElevPC https://svarut.ks.no/forsendelse/${avtale.fid}/1/signering Velkommen til skolestart.`
      }
      const result = await sendSmsMessage(message)
      if (result) {
        logger('info', ['utils', 'send-sms-message', 'avtale', avtale.aid, 'message sendt'])
        successCount++
      } else {
        logger('info', ['utils', 'send-sms-message', 'avtale', avtale.aid, 'message not sendt'])
        failCount++
      }
    } else {
      failCount++
      logger('info', ['utils', 'send-sms-message', 'avtale', avtale.aid, 'mobile number not available'])
    }
    await writeFile('data/avtaler-query.json', JSON.stringify(avtaler, null, 2), 'utf-8')
    logger('info', ['utils', 'send-sms-message', `${avtaler.length} avtaler to go`])
  }
  logger('info', ['utils', 'send-sms-message', 'finished', 'success', successCount, 'fails', failCount])
})()
