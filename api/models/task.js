const Sequelize = require('sequelize');
const { conn } = require('../database/conn');

const Tag = require('./tag');

const Task = conn.define('task', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    startDate: Sequelize.DATEONLY,
    endDate: Sequelize.DATEONLY
});

Task.belongsTo(Tag, {
    constraint: true,
    foreignKey: 'TagId'
});

module.exports = Task;
