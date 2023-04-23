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
require('./common/update')('/tasks', Task);

// tags routes
require('./common/getAll')('/tags', Tag);
require('./common/update')('/tags', Tag);

// config routes
require('./common/getAll')('/configs', Config);
require('./common/update')('/configs', Config);
require('./routes/config/reset');

// services
require('./services/initialConfig')();
require('./services/initialTags')();
require('./services/checkDate')();
