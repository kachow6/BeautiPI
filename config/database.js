const dotenv = require('dotenv');

// access env variables
dotenv.config();

// set database name
const db = process.env.NODE_ENV === 'development' ? 'test' : 'database';

module.exports = {
    'db' : db,
    'url': `mongodb+srv://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@beautipi-dev-hl414.mongodb.net/${db}?retryWrites=true&authMechanism=SCRAM-SHA-1&authSource=admin`,
    'options': {
        useNewUrlParser: true,
        reconnectTries: 60,
        reconnectInterval: 1000
    }
};
