const Config = require('../models/Config.js');

module.exports = async () => {
  try {
    await Config.sync();
    const config = await Config.findAll();

    if (!config.length) {
      await Config.create({ pageSize: process.env.PAGE_SIZE,
                            dateSize: process.env.DATE_SIZE,
                         });

      console.log('initial config created...');
    };
  } catch (error) {
    console.log(error.message);
  };
};
