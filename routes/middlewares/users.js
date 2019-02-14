let express = require('express');
let router  = express.Router();

// users model
let users = require('../../db/models/usersModel');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

// default users route that retrieves all users
router.get('/', (req, res) => {
    users.getUsers((response) => {
        res.status(200).send(response);
    });
});

// retrieve single user
router.get('/getuser', (req, res) => {
    users.getUser(req.query.name, (response) => {
        if (response.length === 1) {
            res.status(200).send(response);
        } else {
            res.status(500).send('ERROR: Unable to retrieve user.');
        }
    });
});

// insert new user route
router.post('/insertuser', (req, res) => {

    let user = req.query.name;
    let pw = req.query.pw;

    // check user fields
    if (user == null || pw == null || user == "" || pw == "") {
        res.status(500).send('ERROR: Unable to insert new user.');
        return;
    }

    // check user does not already exist
    users.getUser(req.query.name, (response) => {
        if (response.length > 0) {
            res.status(500).send('ERROR: User already exists.');
        } else {
            users.insertUser(user, pw);
            res.status(200).send('User successfully inserted.');
        }
    });
});

// update user route
router.post('/userupdate', (req, res) => {
    console.log('User updated');
});

// delete user route
router.post('/deleteuser', (req, res) => {
    console.log('User deleted')
});

module.exports = router;
