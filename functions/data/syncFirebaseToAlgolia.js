const dotenv = require('dotenv');
const firebaseAdmin = require("firebase-admin");
const algoliasearch = require('algoliasearch');

// load values from the .env file in this directory into process.env
dotenv.load();

const serviceAccount = require("./serviceAccountKey.json");
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});
const database = firebaseAdmin.database();

const algolia = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
const index = algolia.initIndex('tweets');

const tweetsRef = database.ref("/tweets");

tweetsRef.on('child_added', addOrUpdateIndexRecord);
tweetsRef.on('child_changed', addOrUpdateIndexRecord);
tweetsRef.on('child_removed', deleteIndexRecord);

function addOrUpdateIndexRecord(dataSnapshot) {
  // Get Firebase object
  var firebaseObject = dataSnapshot.val();
  // Specify Algolia's objectID using the Firebase object key
  firebaseObject.objectID = dataSnapshot.key;
  // Add or update object
  index.saveObject(firebaseObject, function(err, content) {
    if (err) {
      throw err;
    }
    console.log('Firebase<>Algolia object saved', firebaseObject.objectID);
  });
}

function deleteIndexRecord(dataSnapshot) {
  // Get Algolia's objectID from the Firebase object key
  var objectID = dataSnapshot.key;
  // Remove the object from Algolia
  index.deleteObject(objectID, function(err, content) {
    if (err) {
      throw err;
    }
    console.log('Firebase<>Algolia object deleted', objectID);
  });
}
