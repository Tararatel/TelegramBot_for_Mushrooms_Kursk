const sequelize = require('./index');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
	id: { type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true },
	chatId: { type: DataTypes.STRING, unique: true },
	coordinates: { type: DataTypes.STRING, unique: true },
});

export default UserModel;
