require("dotenv").config();
module.exports = {
  development: {
    database: "plantrade_development",
    dialect: "postgres",
    host: process.env.DB_HOST,
  },
  test: {
    database: "plantrade_test",
    dialect: "postgres",
    host: process.env.DB_HOST,
  },
  production: {
    database: "plantrade_production",
    dialect: "postgres",
    host: process.env.DB_HOST,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        require: true,
      },
    },
  },
};
