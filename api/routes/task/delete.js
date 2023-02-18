const { app } = require('../../database/conn');
const Task = require('../../models/task');

module.exports = app.delete('/tasks/:id', async (req, res) => {
  try {
    const result = await Task.findByPk(req.params.id);
    
    if (!result)
      return res.status(422).json({ message: 'Record not found!' });

    try {
      await result.destroy();
  
      res.status(200).json({ message: 'Record deleted successfully!' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    };
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});
