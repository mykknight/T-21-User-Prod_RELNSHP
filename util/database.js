const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_complete', 'root', 'mayank2310', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;