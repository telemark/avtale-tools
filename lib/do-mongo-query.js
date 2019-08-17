const mongo = require('./mongo')
const logger = require('./logger')

module.exports = async payload => {
  const db = await mongo()
  const collection = db.collection(process.env.MONGODB_COLLECTION)
  try {
    const documents = await collection.find(payload).toArray()
    logger('info', ['lib', 'do-query', 'success', documents.length])
    return documents
  } catch (error) {
    logger('error', ['do-query', JSON.stringify(error)])
    throw error
  }
}
