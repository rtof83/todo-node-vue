const Config = require('../models/config');
const defaultValues = require('./default');

module.exports = async () => {
  try {
    await Config.sync();
    const config = await Config.findAll();

    if (!config.length) {
      await Config.create(defaultValues.config);
      console.log('initial config created...');
    };
  } catch (error) {
    console.log(error.message);
  };
};
