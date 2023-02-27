const { app } = require('../../database/conn');
const Task = require('../../models/task');
const Config = require('../../models/config');

module.exports = app.post('/tasks', async (req, res) => {
  try {
    const config = await Config.findAll({ where: { id: 1 } });

    const dateSize = config[0].dateSize ? config[0].dateSize : 3;

    // current date + (1 day in milliseconds x dateSize)
    const date = new Date(Date.now() + (86400000 * dateSize));

    req.body.tagId = 1;
    req.body.deadline = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
    
    await Task.create(req.body);

    res.status(201).json({ message: 'Record inserted successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  };
});
