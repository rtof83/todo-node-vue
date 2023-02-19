const { app } = require('./database/conn');

const cors = require('cors');
app.use(cors());

// tasks routes
require('./routes/task/getAllTasks');
require('./routes/task/createTask');
require('./routes/task/deleteTask');
require('./routes/task/updateTask');

// tags routes
require('./routes/tag/getAllTags');

// config routes
require('./routes/config/getAllConfigs');

// services
require('./services/initialConfig')();
require('./services/initialTags')();


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
