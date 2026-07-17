const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'YOUR_PASSWORD_HERE', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;