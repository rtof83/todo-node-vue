const { app } = require('../../database/conn');
const Task = require('../../models/task');
const Tag = require('../../models/tag');
const Config = require('../../models/config');

const Sequelize = require('sequelize');

module.exports = app.get('/tasks', async (req, res) => {
  let result;

  try {
    if (req.query.page || req.query.name || req.query.tag) {
      let search = {};

      if (req.query.name) {
        const Sequelize = require('sequelize');
        const Op = Sequelize.Op;

        search.name = { [Op.substring]: req.query.name };
      };

      if (req.query.tag)
        search.tagId = req.query.tag;

      const configs = await Config.findAll();

      const pageSize = configs.length ? configs[0].pageSize : 10;
      const total = await Task.count({ where: search });
      const pages = Math.ceil(total / pageSize);
      const pageNumber = !req.query.page ? 1 : req.query.page;
      const startFrom = (pageNumber - 1) * pageSize;

      result = await Task.findAll({ limit: pageSize, offset: startFrom, where: search, attributes: {
        include: [[Sequelize.literal('tag.name'), 'tagName'],
                  [Sequelize.literal('tag.color'), 'tagColor']],
        },

      include: [{ model: Tag, as: 'tag', attributes: [] }]}, { order: [['name']] });

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
