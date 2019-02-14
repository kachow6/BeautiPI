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
        let search = { username: userName }
        db.collection(COLLECTION).find(search).toArray((err, result) => {
            if (err) throw err;
            callback(result);
        });
    },

    // insert new user
    insertUser: (user, pw) => {
        db.collection(COLLECTION).insertOne({ username: user, password: pw });
    }
};