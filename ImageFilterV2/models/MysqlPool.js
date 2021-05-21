const config = require("config");
const {createPool} = require("mysql2/promise");

const mysqlPool = createPool(config.get("mysqlConfig"));

module.exports.mysqlPool = mysqlPool;