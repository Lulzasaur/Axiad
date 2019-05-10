/** Database connection for Axiad. */

const { Client } = require("pg");

const client = new Client({connectionString:'axiad'});

client.connect();


module.exports = client;
