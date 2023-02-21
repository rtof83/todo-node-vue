const Tag = require('../models/tag');
const defaultValues = require('./default');

module.exports = async () => {
  try {
    await Tag.sync();
    const tag = await Tag.findAll();

    if (!tag.length) {
      // await Tag.bulkCreate([{ name: 'em progresso',
      //                         color: '#EDE04D',
      //                       },
      //                       { name: 'pendente',
      //                         color: '#ED4F32',
      //                       },
      //                       { name: 'finalizado',
      //                         color: '#15CD72',
      //                       }]);

      await Tag.bulkCreate(defaultValues.tags);

      console.log('initials tags created...');
    };
  } catch (error) {
    console.log(error.message);
  };
};
