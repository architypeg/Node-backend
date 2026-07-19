const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    MongoClient.connect('YOUR_CONNECTION_STRING')
    .then(client => {
        console.log('connection successful');
        callback(client);
    })
    .catch(err => console.log(err))
}

module.exports = mongoConnect;



