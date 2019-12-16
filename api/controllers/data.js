const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


/**
 * Method to get Data By Event Type
 */
exports.getDataByEventType = (req, res, next) => {
  // const id = req.params.repoId;
  const eventType = req.params.eventType;

  // Connection URL
  const url = 'mongodb://localhost:27017';

  // Database Name
  const dbName = 'FirstScreen';

  // Create a new MongoClient
  const client = new MongoClient(url);


  // Use connect method to connect to the Server
  client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    findDocuments(db, function () {
      client.close();
    });
  });


  const findDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('data');
    // Find some documents
    collection.find({ type: eventType }).toArray(function (err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs);
      res.status(200).json({ docs });
      callback(docs);
    });
  }
}

/**
 * Method to get Data By Repo ID
 */
exports.getDataByRepoId = (req, res, next) => {
  const id = Number(req.params.repoId);

  // Connection URL
  const url = 'mongodb://localhost:27017';

  // Database Name
  const dbName = 'FirstScreen';

  // Create a new MongoClient
  const client = new MongoClient(url);


  // Use connect method to connect to the Server
  client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    findDocuments(db, function () {
      client.close();
    });
  });


  const findDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('data');

    // Find some documents
    collection.find({ 'repo.id': id }).toArray(function (err, docs) {
      console.log(id);
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs);
      res.status(200).json({ docs });
      callback(docs);
    });
  }
}

/**
 * Method to get Repos By Actors
 */
exports.getRepoByActor = (req, res, next) => {
  const actor = req.params.actor;

  // Connection URL
  const url = 'mongodb://localhost:27017';

  // Database Name
  const dbName = 'FirstScreen';

  // Create a new MongoClient
  const client = new MongoClient(url);


  // Use connect method to connect to the Server
  client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    findDocuments(db, function () {
      client.close();
    });
  });


  const findDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('data');

    // Find some documents
    collection.find({ 'actor.login': actor }).project({ 'actor': 1, 'repo': 1 }).toArray(function (err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs[0]);

      var actor = docs[0].actor;

      var repos = [];
      for (let key in docs) {
        repos.push(docs[key].repo);
      }

      res.status(200).json({ "actor": actor, "repos": repos });
      callback(docs);
    });
  }
}


/**
 * Method to get all Repos
 */
exports.getAllRepos = (req, res, next) => {

  // Connection URL
  const url = 'mongodb://localhost:27017';

  // Database Name
  const dbName = 'FirstScreen';

  // Create a new MongoClient
  const client = new MongoClient(url);


  // Use connect method to connect to the Server
  client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    findDocuments(db, function () {
      client.close();
    });
  });


  const findDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('data');

    // Find some documents
    collection.aggregate([
      {
        $group: {
          _id: "$repo.id",
          Actors: {
            $push: {
              "login": "$actor.login"
            }
          }
        }
      }
    ]).toArray(function (err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");

      res.status(200).json({docs});
      callback(docs);
    });
  }
}


/**
 * Method to Delete History by actor login
 */
exports.deleteByActorLogin = (req, res, next) => {


  var actorLogin = req.params.actorLogin;
  // Connection URL
  const url = 'mongodb://localhost:27017';

  // Database Name
  const dbName = 'FirstScreen';

  // Create a new MongoClient
  const client = new MongoClient(url);


  // Use connect method to connect to the Server
  client.connect(function (err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    findDocuments(db, function () {
      client.close();
    });
  });


  const findDocuments = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('data');

    // Find some documents
    collection.deleteMany({ 'actor.login': actorLogin }, function (err, r) {
      assert.equal(null, err);
      assert.equal(2, r.deletedCount);
      client.close();
    });
  }
}
