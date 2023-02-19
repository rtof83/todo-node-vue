const { app } = require('../../database/conn');
const Task = require('../../models/task');
const Config = require('../../models/config');

module.exports = app.post('/tasks', async (req, res) => {
  try {
    const config = await Config.findAll();
    const dateSize = config.dateSize ? config.dateSize : 3;

    const date = new Date();

    req.body.tagId = 1;
    req.body.deadline = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate() + dateSize}`;
    
    await Task.create(req.body);

    res.status(201).json({ message: 'Record inserted successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});
