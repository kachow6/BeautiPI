const dotenv = require('dotenv');

// access env variables
dotenv.config();

// set database name
let db;
if (process.env.NODE_ENV) {
    db = process.env.NODE_ENV === 'development' ? process.env.MONGO_TEST_DB_NAME : process.env.MONGO_PROD_DB_NAME;
} else {
    db = process.env.MONGO_TEST_DB_NAME;
}

module.exports = {
    'db' : db,
    'url': `mongodb+srv://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@beautipi-dev-hl414.mongodb.net/${db}?retryWrites=true&authMechanism=SCRAM-SHA-1&authSource=admin`,
    'options': {
        useNewUrlParser: true,
        reconnectTries: 60,
        reconnectInterval: 1000
    }
};
