// Script for downloading avtaler from template query
(async () => {
  require('dotenv').config()
  const axios = require('axios')
  const sleep = require('then-sleep')
  const { writeFile } = require('fs').promises
  const generateToken = require('../lib/generate-token')
  const logger = require('../lib/logger')
  const avtaler = require('../data/avtaler-query.json')
  const result = []
  logger('info', ['utils', 'check-avtaler-template', `Got ${avtaler.length} avtaler`])
  while (avtaler.length > 0) {
    const avtale = avtaler.pop()
    logger('info', ['utils', 'check-avtaler-template', 'checking', 'aid', avtale.aid])
    const url = `${process.env.AVTALE_SERVICE_URL}/agreements/${avtale._id}`
    logger('info', ['utils', 'check-avtaler-template', 'checking', 'aid', avtale.aid, 'url', url])
    const token = generateToken(process.env.AVTALE_SERVICE_SECRET)
    axios.defaults.headers.common['Authorization'] = token
    const { data } = await axios.get(url)
    logger('info', ['utils', 'check-avtaler-template', 'checking', 'aid', avtale.aid, 'status', data.status])
    result.push(data)
    logger('info', ['utils', 'check-avtaler-template', avtaler.length, 'avtaler to check'])
    await sleep(250)
  }
  logger('info', ['utils', 'check-fresh-avtaler', 'saving', result.length, 'avtaler'])
  await writeFile('data/avtaler-downloaded.json', JSON.stringify(avtaler, null, 2), 'utf-8')
  logger('info', ['utils', 'check-fresh-avtaler', 'finished'])
})()
