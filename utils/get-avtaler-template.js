// Template for retreiving avtaler - do your own query in payload
(async () => {
  require('dotenv').config()
  const { writeFile } = require('fs').promises
  const query = require('../lib/do-mongo-query')
  const logger = require('../lib/logger')
  const payload = {
    uid: 'true',
    canBeDigital: true,
    partOf: ''
  }
  const avtaler = await query(payload)
  logger('info', ['utils', 'get-avtaler-template', `got ${avtaler.length} avtaler`])
  await writeFile('data/avtaler-query.json', JSON.stringify(avtaler, null, 2), 'utf-8')
  logger('info', ['utils', 'get-avtaler-template', 'data saved'])
  process.exit(0)
})()
