require('dotenv').config()
module.exports = {
  development: {
    database: 'plantrade_development',
    dialect: 'postgres'
  },
  test: {
    database: 'plantrade_test',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'plantrade_production',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        require: true
      }
    }
  }
}
