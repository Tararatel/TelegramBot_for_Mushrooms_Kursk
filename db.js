const { Sequelize } = require('sequelize');

module.exports = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
	host: DB_HOST,
	dialect: 'postgres',
	logging: false,
});
