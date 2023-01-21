require("dotenv").config();
module.exports = {
  development: {
    database: "plantrade_development",
    dialect: "postgres",
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
  test: {
    database: "plantrade_test",
    dialect: "postgres",
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    database: "plantrade_production",
    dialect: "postgres",
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
