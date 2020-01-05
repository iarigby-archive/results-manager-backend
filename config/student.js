const config = require('../config/config')

module.exports.getUrl = student => `${config.url}?id=${student._id}`

module.exports.getId = student => student._source.id