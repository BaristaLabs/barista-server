# barista-server

Provides a headless, express based host for Barista, Barista Fiddle and Barista ScriptBox

Simply start the server using

```
npm start
```

then, simply point a browser to localhost:8000/fiddle

Can be used in conjunction with strongloop or pm2 to provide production process management:

#### strongloop

TODO...

#### PM2
```
$ npm install pm2 -g					          # Install PM2
$ pm2 start app.js --name="barista-server" -i 1   # Start, Daemonize and auto restart barista
```

to stop:
```
$ pm2 stop barista-server
$ pm2 delete barista-server
```