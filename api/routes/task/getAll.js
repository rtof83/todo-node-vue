const { app } = require('../../database/conn');
const Task = require('../../models/task');
const Config = require('../../models/config');
// const checkUser = require('../middlewares/checkUser');

module.exports = app.get('/tasksall', async (req, res) => {
  let result;

  try {
    if (req.query.page || req.query.name) {
      let search = {};

      if (req.query.name) {
        const Sequelize = require('sequelize');
        const Op = Sequelize.Op;

        search.name = { [Op.substring]: req.query.name };
      };

      const configs = await Config.findAll();

        // const pageSize = parseInt(process.env.PAGE_SIZE);
      const pageSize = configs.length ? configs[0].pageSize : 10;
      const total = await Task.count({ where: search });
      const pages = Math.ceil(total / pageSize);
      const pageNumber = !req.query.page ? 1 : req.query.page;
      const startFrom = (pageNumber - 1) * pageSize;

      result = await Task.findAll({ limit: pageSize, offset: startFrom, where: search}, { order: [['name']] });

      // adding pagination to array
      if (result.length > 0)
        result.push({ page: parseInt(pageNumber), from: pages });
    } else {
      // GET ALL
      result = await Task.findAll();
    };

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
