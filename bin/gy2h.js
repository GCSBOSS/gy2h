var args = process.argv.splice(process.execArgv.length + 2);
var gy2hServer = require('../lib/index.js');
gy2hServer.start(args[0]);
