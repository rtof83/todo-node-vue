const Task = require('../models/task');
const schedule = require('node-schedule');

module.exports = () => {
  const checkDate = async () => {
    try {
      const tasks = await Task.findAll();

      if (tasks.length) {
        const now = new Date();

        tasks.map(async item => {
          const deadline = new Date(item.deadline);

          if ((deadline - now <= -86400000) && item.tagId === 1)
            await item.update({ tagId: 2 })
        });
      };
    } catch (error) {
      console.log(error.message);
    };
  };

  schedule.scheduleJob('0 1 * * *',
//   schedule.scheduleJob('50 * * * * *',
    () => { checkDate() });
};
