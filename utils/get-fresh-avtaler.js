// Script for retreiving avtalers main part not signed
(async () => {
  require('dotenv').config()
  const { writeFile } = require('fs').promises
  const query = require('../lib/do-mongo-query')
  const logger = require('../lib/logger')
  const payload = {
    partOf: '',
    status: { $exists: false }
  }
  const avtaler = await query(payload)
  logger('info', ['utils', 'get-fresh-avtaler', `got ${avtaler.length} avtaler`])
  await writeFile('data/fresh-avtaler.json', JSON.stringify(avtaler, null, 2), 'utf-8')
  logger('info', ['utils', 'get-fresh-avtaler', 'data saved'])
  process.exit(0)
})()
