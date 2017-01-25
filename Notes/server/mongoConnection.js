const MongoClient = require('mongodb');

const connectionString = 'mongodb://ntrUser:ntr123@ds129179.mlab.com:29179/ntr';


export function insertCatalog(catalog) {
    MongoClient.connect(connectionString, function(err, db) {
        console.log("Connected successfully to server");
        console.log("err", err);

        addCatalogToCollection(db, catalog, () => {
            db.close();
        });
    });
}

export function getCatalogs(callback) {
    MongoClient.connect(connectionString, function(err, db) {
        console.log("Connected successfully to server");
        console.log("err", err);

        findCatalogs(db, function(catalogs) {
            db.close();
            callback(catalogs);
        });
    });
}


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