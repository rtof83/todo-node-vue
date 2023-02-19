const Sequelize = require('sequelize');
const { conn } = require('../database/conn');

const Config = conn.define('config', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    pageSize: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    dateSize: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = Config;
