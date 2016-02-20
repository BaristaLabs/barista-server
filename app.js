#!/usr/bin/env node
'use strict';
var bs = require(".");
var myServer = new bs.BaristaServer();

myServer.createBaristaServer();

var shutdown = function (cb) {
    myServer.shutdown(function () {
        process.exit(0);
    });
};

process.on('exit', function () {
    shutdown();
});

process.on('SIGTERM', function () {
    shutdown();
});
