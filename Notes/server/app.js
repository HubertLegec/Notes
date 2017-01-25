// server/app.js
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const MongoClient = require('mongodb');
const bodyParser = require('body-parser');

const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

app.use(bodyParser.json());

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Always return the main index.html, so react-router render the route in the client
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.get('note', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.get('/catalogs', (req, res) => {
    console.log('request catalogs');
    getCatalogs(function (catalogs) {
        res.send(catalogs);
    });
});

app.post('/catalog', (req, res) => {
    const catalog = req.body;
    console.log('POST catalog', catalog);
    insertCatalog(catalog);
    res.send('OK')
});

module.exports = app;


const connectionString = 'mongodb://ntrUser:ntr123@ds129179.mlab.com:29179/ntr';

const insertCatalog = function(catalog) {
    MongoClient.connect(connectionString, function(err, db) {
        console.log("Connected successfully to server");
        console.log("err", err);

        addCatalogToCollection(db, catalog, () => {
            db.close();
        });
    });
};

const getCatalogs = function(callback) {
    MongoClient.connect(connectionString, function(err, db) {
        console.log("Connected successfully to server");
        console.log("err", err);

        findCatalogs(db, function(catalogs) {
            db.close();
            callback(catalogs);
        });
    });
};

const findCatalogs = function(db, callback) {
    const collection = db.collection('catalogs');
    collection.find({}).toArray(function(err, catalogs) {
        console.log("Found the following records");
        console.log(catalogs);
        callback(catalogs);
    });
};

const addCatalogToCollection = function (db, catalog, callback) {
    const collection = db.collection('catalogs');
    collection.insertOne(catalog, callback);
};
