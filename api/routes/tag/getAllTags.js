const { app } = require('../../database/conn');
const Tag = require('../../models/tag');

module.exports = app.get('/tags', async (_, res) => {
  try {
   
    const tags = await Tag.findAll();

    if (!tags)
      return res.status(422).json({ message: 'Record not found!' });

    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});
