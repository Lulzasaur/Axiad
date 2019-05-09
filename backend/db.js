/** Database connection for Sinwaves. */

const { Client } = require("pg");

const client = new Client({connectionString:'sinwaves'});

client.connect();


module.exports = client;
