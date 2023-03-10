const { app } = require('../../database/conn');
const Task = require('../../models/task');

module.exports = app.get('/tasks/:id', async (req, res) => {
  try {
    const result = await Task.findByPk(req.params.id);
  
    if (!result)
      return res.status(422).json({ message: 'Record not found!' });
  
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});
