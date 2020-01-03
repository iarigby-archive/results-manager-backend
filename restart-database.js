const {
    Kuzzle,
    WebSocket
} = require('kuzzle-sdk');

// Replace 'kuzzle' with your Kuzzle server hostname (e.g. 'localhost')
const kuzzle = new Kuzzle(
    new WebSocket('localhost')
);
const main = async() => {
    try {
        await kuzzle.connect()
            // await kuzzle.index.delete('school-software');
            // console.log('Index deleted');
            // TODO refresh after delete or this doesn't work
        await kuzzle.index.create('school-software')
        await kuzzle.collection.create('school-software', 'id-mapping')
        kuzzle.disconnect()
    } catch (error) {
        console.error(error.message);
    }
}

main() ~