const storage = require('node-persist')

storage.init({dir: "./.node-persist/storage"})

module.exports = storage