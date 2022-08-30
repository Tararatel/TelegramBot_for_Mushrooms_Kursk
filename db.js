const { Sequelize } = require('sequelize');
const { DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

module.exports = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
	host: DB_HOST,
	dialect: 'postgres',
	logging: false,
});
