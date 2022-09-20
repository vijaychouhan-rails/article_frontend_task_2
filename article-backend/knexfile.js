require('dotenv').config();
const { CLIENT, DATABASE, PG_USER, PG_PASSWORD, HOST, PG_PORT , TEST_DATABASE} = process.env
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: CLIENT,
    connection: {
      database: DATABASE,
      user: PG_USER,
      password: PG_PASSWORD,
      host: HOST,
      port: PG_PORT,
  }
  },

  test: {
    client: CLIENT,
    connection: {
      database: TEST_DATABASE,
      user: PG_USER,
      password: PG_PASSWORD,
      host: HOST,
      port: PG_PORT,
  }
  }

};
