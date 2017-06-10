import http    from 'http';
import express from 'express';
import colors  from 'colors';
import path    from 'path';
import bodyParser from 'body-parser';

// Security
// import passport from 'passport';
// import bcrypt   from 'bcrypt';
import session  from './session.js';

// Server Side Rendering
import {
  renderPage,
  renderDevPage
} from './ssr.js';

// ENV
// import dotenv from 'dotenv';
//
// // Import .env and expand variables: Sets process.env[VARS] as a side-effect.
// dotenv.config();

const PROD = process.env.NODE_ENV === 'production';

const app = express();
const httpServer = http.createServer(app);

const commonMiddleware = [
  session,
  // passport.initialize(),
  // passport.session()
];

app.use(bodyParser.json());

commonMiddleware.forEach((ware) => {
  app.use(ware);
});

// Password Configuration
// passport.use(UserAuthStrategy);
// passport.serializeUser(serializeUser);
// passport.deserializeUser(deserializeUser);


if (PROD) {
  app.use('/static', express.static('build'));
  app.get('*', renderPage);
} else {
  const HMR = require('./hmr.js');
  // Hot Module Reloading
  HMR(app);
  app.get('*', renderDevPage);
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
if (!PROD) {
  app.use(function(err, req, res, next) {
    console.error('error : ', err)
    res.status(err.status || 500);
  });
}

// production error handler
app.use(function(err, req, res, next) {
  console.error('error : ', err.message)
  res.status(err.status || 500);
});

const server = http.createServer(app);

server.listen(process.env.PORT, function() {
   const address = server.address();
   console.log(`${'>>>'.cyan} ${'Listening on:'.rainbow} ${`${address.address}`.magenta}${`${address.port}`.green}`);
 });
