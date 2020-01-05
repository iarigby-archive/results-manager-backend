const PORT = 3000

const app = require('./api/app.js')

const kuzzle = require('./services/kuzzle.js')

kuzzle.connect()
    .then(() => app.listen(PORT, () => console.log('server started')))
    .catch(err => console.log(err, 'error connecting to the database'))