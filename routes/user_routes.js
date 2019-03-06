const express = require('express');
const router  = express.Router();

// user model
const User = require('../db/models/User');
const collection = 'users';

// router.use(function timeLog(req, res, next) {
//     console.log('Time: ', Date.now());
//     next();
// });

// default users route that retrieves all users
router.get('/', (req, res) => {
    req.app.locals.db.collection(collection).find({}).toArray((err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(result);
        }
    });
});

// retrieve single user
router.get('/getuser', (req, res) => {
    let search = { username: req.query.name };
    req.app.locals.db.collection(collection).find(search).toArray((err, result) => {
        if (err) res.status(500).send(err);
        if (result.length === 1) {
            res.status(200).send(result);
        } else {
            res.status(500).send('ERROR: Unable to retrieve user.');
        }
    });
});

// insert new user route (note: pw should already be hashed at this point)
router.post('/insertuser', (req, res) => {

    let user = req.body.name;
    let pw = req.body.pw;

    // check user fields
    if (user == null || pw == null || user == "" || pw == "") {
        res.status(500).send('ERROR: Unable to insert new user.');
        return;
    }

    // check user does not already exist
    let search = { username: user };

    req.app.locals.db.collection(collection).find(search).toArray((err, result) => {
        if (err) res.status(500).send(err);
        if (result.length > 0) {
            res.status(500).send('ERROR: User already exists.');
        } else {
            const newUser = new User(user, pw);
            req.app.locals.db.collection(collection).insertOne(newUser, (err, result) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).send('User successfully inserted.');
                }
            });
        }
    });
});

// update user route (note: pw should already be hashed at this point)
router.post('/updateuser', (req, res) => {
    
    let pw = req.body.pw;

    // check if user exists
    let search = { username: req.body.name };

    req.app.locals.db.collection(collection).find(search).toArray((err, result) => {
        if (err) res.status(500).send(err);
        if (result.length > 0) {
            let values = { $set: { password: pw } }; 
            req.app.locals.db.collection(collection).updateOne(search, values, (err, result) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).send('User successfully updated.');
                }
            });
        } else {
            res.status(500).send('ERROR: User does not exist.');
        }
    });
});

// delete user route
router.post('/deleteuser', (req, res) => {
    
    // check if user exists
    let search = { username: req.body.name };

    req.app.locals.db.collection(collection).find(search).toArray((err, result) => {
        if (err) res.status(500).send(err);
        if (result.length > 0) {
            req.app.locals.db.collection(collection).deleteOne(search, (err, result) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).send('User successfully deleted.');
                }
            });
        } else {
            res.status(500).send('ERROR: User does not exist.');
        }
    });
});

module.exports = router;
