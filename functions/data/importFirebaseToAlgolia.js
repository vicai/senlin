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

var tweetsRef = database.ref("/tweets");
tweetsRef.once('value', initialImport);
function initialImport(dataSnapshot) {
  // Array of data to index
  const objectsToIndex = [];
  // Get all objects
  const values = dataSnapshot.val();
  // Process each child Firebase object
  dataSnapshot.forEach((function(childSnapshot) {
    // get the key and data from the snapshot
    const childKey = childSnapshot.key;
    const childData = childSnapshot.val();
    // Specify Algolia's objectID using the Firebase object key
    childData.objectID = childKey;
    // Add object for indexing
    objectsToIndex.push(childData);
  }))
  // Add or update new objects
  index.saveObjects(objectsToIndex, function(err, content) {
    if (err) {
      throw err;
    }
    console.log('Firebase<>Algolia import done');
    process.exit(0);
  });
}
