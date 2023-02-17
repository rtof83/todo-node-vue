const Sequelize = require('sequelize');
const { conn } = require('../database/conn');

const Tag = conn.define('tag', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Tag;
