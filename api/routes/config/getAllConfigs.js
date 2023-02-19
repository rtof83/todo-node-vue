const { app } = require('../../database/conn');
const Config = require('../../models/config');

module.exports = app.get('/configs', async (_, res) => {
  try {
    const configs = await Config.findAll();

    if (!configs)
      return res.status(422).json({ message: 'Record not found!' });

    res.status(200).json(configs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});
