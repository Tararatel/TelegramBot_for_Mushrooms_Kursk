const sequelize = require('./db');
const { DataTypes } = require('sequelize');

const DataBase = sequelize.define(
	'DataBase',
	{
		chatId: DataTypes.BIGINT,
		latitude: DataTypes.STRING,
		longitude: DataTypes.STRING,
	},
	{
		tableName: 'Coordinates',
		timestamps: false,
	}
);

module.exports = DataBase;
