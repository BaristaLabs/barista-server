# barista-server

Provides a headless, express based host for Barista, Barista Fiddle and Barista ScriptBox

If you have NodeJS installed, simply install and start the server with

```
$ npm install barista-server -g
$ barista-server
Barista listening at http://:::8000
```

then, simply point a browser to http://localhost:8000/fiddle

To uninstall:
```
$ npm uninstall barista-server -g
```

No NodeJS? See [this](https://nodejs.org/en/download/package-manager/)

Can be used in conjunction with strongloop or pm2 to provide production process management:

#### strongloop

TODO...

#### PM2
```
$ npm install pm2 -g					          # Install PM2
$ pm2 start barista-server              # Start, Daemonize and auto restart barista
```

to stop:
```   
$ pm2 stop barista-server                
$ pm2 delete barista-server
```
