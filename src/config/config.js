const dbSettings = {
  user: process.env.MONGO_USERNAME || 'visionpi',
  password: process.env.MONGO_PASSWORD || 'visionpiDev2019',
  name: process.env.MONGO_DB || 'visionpiStreamingDB',
  host: process.env.MONGO_HOSTNAME || 'localhost',
  port_db: process.env.MONGO_PORT || '27017',
  useNewUrlParser: true,
  customerCollection: 'customers',
  authentication: process.env.AUTHENTICATION_SERVICE || "localhost"
}


const serverSettings = {
  port: process.env.PORT || 4000,
  ssl: require('./ssl')
}

const dbInfo = {
  name: process.env.MONGO_NAME || 'visionpi_auth',
  uri: process.env.MONGO_URL || 'mongodb://127.0.0.1/',
  servers: (process.env.DB_SERVERS) ? process.env.DB_SERVERS.split(' ') : [
    '127.0.0.1:27017',
    '127.0.0.1:27017',
    '127.0.0.1:27017'
  ]
}

module.exports = Object.assign({}, { dbSettings, serverSettings, dbInfo, services })
