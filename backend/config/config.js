// This is for sequelize. This is the default file path/name it looks for.
module.exports = {
  development: {
    username: 'rabble_rouser',
    password: 'rabble_rouser',
    database: 'rabble_rouser_core_db',
    host: '127.0.0.1',
    dialect: 'postgresql',
    logging: false,
  },
  test: {
    username: 'rabble_rouser',
    password: 'rabble_rouser',
    database: 'rabble_rouser_core_db_test',
    host: '127.0.0.1',
    dialect: 'postgresql',
    logging: false,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
  },
};
