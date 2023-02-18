const { app } = require('../../database/conn');
const Task = require('../../models/task');
const Tag = require('../../models/tag');

const Sequelize = require('sequelize');

module.exports = app.get('/tasks', async (req, res) => {
  try {
    const where = {};
    if (req.query) {
      if (req.query.tag)
        where.tagId = req.query.tag
    };

    const result = await Task.findAll({
      // where: {
      //   tagId: query
      // },
      where,

      attributes: {
        include: [[Sequelize.literal('tag.name'), 'tagName']],
        },
        include: [{ model: Tag, as: 'tag', attributes: [] }]
    });

    if (!result)
      return res.status(422).json({ message: 'Record not found!' });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});
