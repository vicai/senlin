const dotenv = require('dotenv');
const firebaseAdmin = require("firebase-admin");
const algoliasearch = require('algoliasearch');

// load values from the .env file in this directory into process.env
dotenv.load();

// configure firebase
const serviceAccount = require("./serviceAccountKey.json");
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});
const database = firebaseAdmin.database();

// configure algolia
const algolia = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
const index = algolia.initIndex('tweets');
index.setSettings({
  searchableAttributes: [
    'created_at',
    'text',
    'user_id',
  ],
  customRanking: ['desc(created_at)'],
});
