const {
    Kuzzle,
    WebSocket
} = require('kuzzle-sdk');

// Replace 'kuzzle' with your Kuzzle server hostname (e.g. 'localhost')
const kuzzle = new Kuzzle(
    new WebSocket('localhost')
);

kuzzle.on('networkError', error => {
    console.error('Network Error: ', error);
});
const index = 'school-software'
const collection = 'id-mapping'

const connect = async() => {
    await kuzzle.connect()
    console.log('connected successfully')
}

connect()
module.exports.kuzzle = kuzzle
module.exports.get = async(id) => kuzzle.document.get(index, collection, id)
module.exports.create = async(object) => kuzzle.document.create(index, collection, object)
module.exports.createID = async(object, id) => kuzzle.document.create(index, collection, object, id)
module.exports.getAll = async() => kuzzle.document.search(index, collection)
module.exports.delete = async(id) => kuzzle.document.delete(index, collection, id)
module.exports.refresh = async() => kuzzle.collection.refresh(index, collection)
module.exports.update = async(id, data) => kuzzle.document.update(index, collection, id, data)