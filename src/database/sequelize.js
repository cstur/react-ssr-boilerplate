import Sequelize from 'sequelize';

// ENV
import dotenv from 'dotenv';

// Import .env and expand variables: Sets process.env[VARS] as a side-effect.
dotenv.config();


console.log(process.env.DATABASE_URL);
const sequelize = new Sequelize(process.env.DATABASE_URL);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
