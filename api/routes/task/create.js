const { app } = require('../../database/conn');
const Task = require('../../models/task');

module.exports = app.post('/tasks', async (req, res) => {
  try {
    const date = new Date();

    req.body.tagId = 1;
    req.body.startDate = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
    req.body.endDate = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate() + 1}`;
    
    await Task.create(req.body);

    res.status(201).json({ message: 'Record inserted successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});
