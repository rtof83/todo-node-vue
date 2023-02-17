const { app } = require('../../database/conn');
const Task = require('../../models/task');

module.exports = 
// getAll = () => {
  // return (
    app.get('/tasks', async (_, res) => {
      try {
        const result = await Task.findAll();
    
        if (!result)
          return res.status(422).json({ message: 'Record not found!' });
    
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      };
    })
  // )
// };

// module.exports = getAll;
