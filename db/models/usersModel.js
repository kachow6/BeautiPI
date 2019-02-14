let mongo   = require('mongodb').MongoClient;
const url   = "mongodb://localhost:27017/";

// db constants
const DB = 'test';
const COLLECTION = 'users';

let db;

// establish db connection
mongo.connect(url, { useNewUrlParser: true }, (err, client) => {
    if (err) throw err;
    db = client.db(DB);
});

module.exports = {

    // retrieve all users
    getUsers: (callback) => {
        db.collection(COLLECTION).find({}).toArray((err, result) => {
            if (err) throw err;
            callback(result);
        });
    },

    // retrieve user
    getUser: (userName, callback) => {
        let search = { username: userName };
        db.collection(COLLECTION).find(search).toArray((err, result) => {
            if (err) throw err;
            callback(result);
        });
    },

    // insert new user
    insertUser: (user, pw) => {
        let newUser = { username: user, password: pw };
        db.collection(COLLECTION).insertOne(newUser, (err, result) => {
            if (err) throw err;
        });
    },

    // update user
    updateUser: (userName, pw) => {
        let search = { username: userName };
        let values = { $set: { password: pw } }; 
        db.collection(COLLECTION).updateOne(search, values, (err, result) => {
            if (err) throw err;
        });
    },

    // delete user
    deleteUser: (userName) => {
        let search = { username: userName };
        db.collection(COLLECTION).deleteOne(search, (err, result) => {
            if (err) throw err;
        });
    } 
};