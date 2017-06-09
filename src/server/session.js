import expressSession from 'express-session'
import sequilzeSession from 'connect-session-sequelize';
import sequelize from 'database/sequelize.js';

// ENV
import dotenv from 'dotenv';

// Import .env and expand variables: Sets process.env[VARS] as a side-effect.
dotenv.config();

const PROD = process.env.NODE_ENV === 'production';


const SQLStore = sequilzeSession(expressSession.Store);

const store = new SQLStore({
  db: sequelize,
});

const sessionConfig = {
  // https://github.com/expressjs/session#options
  secret: process.env.SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // One day
  },
  secure: PROD,
  store: store,
  resave: true,
  saveUninitialized: true
};

export default expressSession(sessionConfig);
