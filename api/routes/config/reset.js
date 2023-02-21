const { app } = require('../../database/conn');
const Tag = require('../../models/tag');
const Config = require('../../models/config');
const defaultValues = require('../../services/default');

module.exports = app.post('/configs/reset', async (_, res) => {
  try {
    const config = await Config.findAll();
    const tags = await Tag.findAll();

    config.map(async (item) => {
      await item.update({ pageSize: defaultValues.config.pageSize,
                    dateSize: defaultValues.config.dateSize })
    });

    tags.map(async (item, index) => {
      await item.update({ name: defaultValues.tags[index].name,
                          color: defaultValues.tags[index].color })
    });

    res.status(200).json({ message: 'config and tags reset to default values!' });
  } catch (error) {
    res.status(500).json({ error: error });
  };
});
