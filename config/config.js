require("dotenv").config();
module.exports = {
  development: {
    database: "plantrade_development",
    dialect: "postgres",
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  test: {
    database: "plantrade_test",
    dialect: "postgres",
    host: process.env.DB_HOST,
    ssl: true,
  },
  production: {
    database: "plantrade_production",
    dialect: "postgres",
    host: process.env.DB_HOST,
    ssl: true,
  },
};
