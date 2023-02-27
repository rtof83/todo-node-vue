const { app } = require('./database/conn');

const cors = require('cors');
app.use(cors());

const Task = require('./models/task');
const Tag = require('./models/tag');
const Config = require('./models/config');

// tasks routes
require('./routes/task/getAllTasks');
require('./routes/task/getTaskById');
require('./routes/task/createTask');
require('./routes/task/deleteTask');
require('./commonMethods/update')('/tasks', Task);

// tags routes
require('./commonMethods/getAll')('/tags', Tag);
require('./commonMethods/update')('/tags', Tag);

// config routes
require('./commonMethods/getAll')('/configs', Config);
require('./commonMethods/update')('/configs', Config);
require('./routes/config/reset');

// services
require('./services/initialConfig')();
require('./services/initialTags')();
require('./services/checkDate')();
