const { app } = require('./database/conn');

const cors = require('cors');
app.use(cors());

// require('./models/task');
// require('./models/log');

require('./routes/task/getAll');
require('./routes/task/create');
require('./routes/task/delete');
require('./routes/task/update');

// const models = require('./models');
// const methods = require('./methods');
// const routes = [ '/cars', '/stores', '/brands', '/users' ];

// // mount standard routes
// for (let i = 0; i < routes.length; i++) {
//   // for each method
//   for (let j = 0; j < methods.length; j++) {
//     methods[j](routes[i], models[i]);
//   };
// };


// // custom routes

// // login to sign token
// require('./routes/checkUserRoute')('/login');

// // validate access
// require('./routes/checkValidate')('/validate');

// // verify if any admin exists on database
// require('./middlewares/checkAdminExists')();

// // custom get query route
// require('./routes/searchByQuery');
