const express   = require('express');
const dotenv    = require('dotenv');
const app       = express();

/* configure env variables */
dotenv.config();

/* list of middleware */
const users = require('./routes/middlewares/users');

/* register middleware to API */
app.use('/users', users);

console.log('listening...');
app.listen(process.env.PORT);
