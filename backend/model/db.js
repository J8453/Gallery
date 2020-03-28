require('dotenv').config();
// 透過 sequelize (library) 做到 ORM
// Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server.
// https://sequelize.org/
const Sequelize = require('sequelize');
const sequelize = new Sequelize('gallery', process.env.DB_USERNAME, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	dialect: 'mysql'
});

sequelize
	.authenticate()
	.then(()=>{
		console.log('connection has been established successfully.');
	})
	.catch(err=>{
		console.log('Unable to connect to the database:', err);
	});

module.exports = sequelize;