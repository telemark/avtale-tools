// Script for checking fresh avtaler
(async () => {
  require('dotenv').config()
  const axios = require('axios')
  const sleep = require('then-sleep')
  const generateToken = require('../lib/generate-token')
  const logger = require('../lib/logger')
  const avtaler = require('../data/fresh-avtaler.json')
  logger('info', ['utils', 'check-fresh-avtaler', `Got ${avtaler.length} avtaler`])
  while (avtaler.length > 0) {
    const avtale = avtaler.pop()
    logger('info', ['utils', 'check-fresh-avtaler', 'checking', 'aid', avtale.aid])
    const url = `${process.env.AVTALE_SERVICE_URL}/agreements/${avtale._id}`
    logger('info', ['utils', 'check-fresh-avtaler', 'checking', 'aid', avtale.aid, 'url', url])
    const token = generateToken(process.env.AVTALE_SERVICE_SECRET)
    axios.defaults.headers.common['Authorization'] = token
    const { data } = await axios.get(url)
    logger('info', ['utils', 'check-fresh-avtaler', 'checking', 'aid', avtale.aid, 'status', data.status])
    logger('info', ['utils', 'check-fresh-avtaler', avtaler.length, 'avtaler to check'])
    await sleep(250)
  }
  logger('info', ['utils', 'check-fresh-avtaler', 'finished'])
})()
