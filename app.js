const express   = require('express');
const dotenv    = require('dotenv');
const mongo     = require('mongodb').MongoClient;
const dbconfig  = require('./config/database.js')
const app       = express();

/* configure env variables */
dotenv.config();

const port = process.env.PORT || 80;

/* list of middleware */
const users = require('./routes/middlewares/user_routes');

/* register middleware to API */
app.use('/users', users);

/* establish db connection */
mongo.connect(dbconfig.url, dbconfig.options, (err, client) => {
    if (err) {
        console.log(err.stack);
        process.exit(1);
    }
    app.locals.db = client.db(dbconfig.db);
});

app.listen(port, () => {
    console.log(`listening on port ${port}...`);
});

module.exports = app;
