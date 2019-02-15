const express = require('express');
const router  = express.Router();

// users model
const users = require('../../db/models/usersModel');

// middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//     console.log('Time: ', Date.now());
//     next();
// });

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

// insert new user route (note: pw should already be hashed at this point)
router.post('/insertuser', (req, res) => {

    let user = req.query.name;
    let pw = req.query.pw;

    // check user fields
    if (user == null || pw == null || user == "" || pw == "") {
        res.status(500).send('ERROR: Unable to insert new user.');
        return;
    }

    // check user does not already exist
    users.getUser(user, (response) => {
        if (response.length > 0) {
            res.status(500).send('ERROR: User already exists.');
        } else {
            users.insertUser(user, pw);
            res.status(200).send('User successfully inserted.');
        }
    });
});

// update user route (note: pw should already be hashed at this point)
router.post('/updateuser', (req, res) => {
    
    let user = req.query.name;
    let pw = req.query.pw;

    // check if user exists
    users.getUser(user, (response) => {
        if (response.length > 0) {
            users.updateUser(user, pw);
            res.status(200).send('User successfully updated.');
        } else {
            res.status(500).send('ERROR: User does not exist.');
        }
    });
});

// delete user route
router.post('/deleteuser', (req, res) => {
    
    let user = req.query.name;

    // check if user exists
    users.getUser(user, (response) => {
        if (response.length > 0) {
            users.deleteUser(user);
            res.status(200).send('User successfully deleted.');
        } else {
            res.status(500).send('ERROR: User does not exist.');
        }
    });
});

module.exports = router;
