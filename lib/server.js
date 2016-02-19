"use strict"
var express = require('express');
var portfinder = require("portfinder");
var requireUncached = require('require-uncached');
var bodyParser = require('body-parser');
var multer = require('multer');
var _ = require("lodash");
var upload = multer();

class BaristaServer {
    constructor() {
        this._barista = requireUncached("barista-core");
    }

    start(callback) {
        
        var baristaFiddle = require("barista-fiddle");
        var baristaScriptbox = require("barista-scriptbox");

        this._barista.app = express();
        this._barista.app.use(bodyParser.json()); // for parsing application/json
        this._barista.app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

        this._barista.app.use("/api/eval*", this._barista.middleware.brew);
        this._barista.app.get("/api/consoleMessages/:correlationId", this._barista.middleware.consoleMessages);
        this._barista.app.use("/fiddle", baristaFiddle);
        this._barista.app.use("/scriptbox", baristaScriptbox);

        var that = this;
        return portfinder.getPort(function (err, port) {

            that._barista.server = that._barista.app.listen(port, function () {
                var host = that._barista.server.address().address;
                var port = that._barista.server.address().port;

                console.log("Barista listening at http://%s:%s", host, port);
                callback(that._barista);
            });

            return that._barista;
        });
    }

    createBaristaServer(callback) {
        this.shutdown();

        var that = this;
        //Start a Barista Server
        this.start(function (result) {
            
            var baristaServer = result.server;

            // Maintain a hash of all connected sockets so we can close them later.
            baristaServer.sockets = {};
            baristaServer.nextSocketId = 0;

            baristaServer.on('connection', function (socket) {
                // Add a newly connected socket
                var socketId = baristaServer.nextSocketId++;
                baristaServer.sockets[socketId] = socket;

                // Remove the socket when it closes
                socket.on('close', function () {
                    _.unset(baristaServer.sockets, socketId);
                });
            });

            if (callback)
                callback(baristaServer);
        });
    }

    shutdown(callback) {
        if (this._barista.server) {
            this._barista.middleware.shutdown();

            //Close all the sockets we know about.
            for (var socketId in this._barista.server.sockets) {
                this._barista.server.sockets[socketId].destroy();
            }
            this._barista.server.close(callback);
            this._barista = null;
        }
    }
}

module.exports = BaristaServer;