const { Sequelize } = require('sequelize');
const { DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD, DATABASE_URL } = process.env;

module.exports = new Sequelize(DATABASE_URL, {
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false,
		},
	},
});
