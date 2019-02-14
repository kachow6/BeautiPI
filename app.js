let express = require('express');
let app     = express();

/* list of middleware */
let users = require('./routes/middlewares/users');

/* register middleware to API */
app.use('/users', users);

console.log('listening...');
app.listen(8888);
