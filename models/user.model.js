// models/User.js
const { DataTypes } = require('sequelize');
const db = require('../config/database');
const User = db.define(
	'User',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		full_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		image: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: true, // This enables timestamps
		createdAt: 'created_at', // Customize the name of the createdAt column
		updatedAt: 'updated_at', // Customize the name of the updatedAt column
		deletedAt: 'deleted_at', // Enable soft deletes and customize the name of the deletedAt column
		paranoid: true, // Enable soft deletes (deletedAt)
	}
);

module.exports = User;
