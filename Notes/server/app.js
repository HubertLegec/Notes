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
    getCatalogs(function (catalogs) {
        res.send(catalogs);
    });
});

app.post('/catalog', (req, res) => {
    const catalog = req.body;
    insertCatalog(catalog);
    res.send('OK');
});

app.delete('/catalog/:id', (req, res) => {
    const id = req.params.id;
    deleteCatalog(id);
    res.send('OK');
});

app.post('/notes', (req, res) => {
    updateNotes(req.body.id, req.body.notes);
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

const deleteCatalog = function (id) {
    MongoClient.connect(connectionString, function(err, db) {
        console.log("Connected successfully to server");
        console.log("err", err);
        const parsed = Number.parseInt(id);
        const collection = db.collection('catalogs');
        collection.deleteOne({id: parsed}, (err, res) => {
            console.log('err', err);
            db.close()});
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
    collection.findOneAndUpdate({id: catalog.id}, {$set: {name: catalog.name, notes: catalog.notes}}, {
        returnOriginal: false
        , upsert: true
    }, function(err, r) {
        if (err) {
            collection.insertOne(catalog, callback);
        } else {
            callback();
        }

    });
};

const updateNotes = function (catalogId, notes) {
    MongoClient.connect(connectionString, function(err, db) {
        console.log("Connected successfully to server");
        console.log("err", err);

        updateCatalogNotes(db, catalogId, notes, () => {
            db.close();
        });
    });
};

const updateCatalogNotes = function (db, catalogId, notes, callback) {
    console.log('update notes: ', notes);
    const collection = db.collection('catalogs');
    const parsedId = Number.parseInt(catalogId);
    console.log('catalog to update id:', catalogId, parsedId);
    collection.findOneAndUpdate({id: parsedId}, {$set: {notes: notes}}, {
        returnOriginal: false
        , upsert: true
    }, function(err, r) {
        if (err) {
            console.log('update catalog notes error', err);
            callback();
        } else {
            callback();
        }
    });
};
