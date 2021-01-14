const { startServer, closeServer, restartServer } = require('./utils/server');
const handle = require('./router/handle');
const router = require('./router/index');

const { server, args } = startServer({ handle, router });
