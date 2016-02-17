var requireUncached = require("require-uncached");

var BaristaServer = requireUncached("./server.js");
var myServer = new BaristaServer();

myServer.createBaristaServer();

console.log('Press any key to exit');

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on('data', function () {
    console.log("Shutting down...");
    myServer.shutdown(function () {
        console.log("Goodbye!");
        process.exit(0);
    });
});