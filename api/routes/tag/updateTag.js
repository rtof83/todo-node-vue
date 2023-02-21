const { app } = require('../../database/conn');
const Tag = require('../../models/tag');

module.exports = app.put('/tags/:id', async (req, res) => {
  const result = await Tag.findByPk(req.params.id);
    
  if (!result)
    return res.status(422).json({ message: 'Record not found!' });

  try {
    await result.update(req.body);

    res.status(200).json({ message: 'Record updated successfully!' });
  } catch (error) {
    res.status(500).json({ error: error });
  };
});
