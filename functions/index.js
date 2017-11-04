const app = require('express')();
const firebase = require('firebase');
const functions = require('firebase-functions');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

// React App
const ServerApp = React.createFactory(require('./build/server.bundle.js').default);
const template = require('./template');

// Server-side Data Loading
const appConfig = functions.config().firebase;
const database = require('./firebase-database');
database.initializeApp(appConfig);

// Helper function to get the markup from React, inject the initial state, and
// send the server-side markup to the client
const renderApplication = (url, res, initialState) => {
  const html = ReactDOMServer.renderToString(ServerApp({url: url, context: {}, initialState, appConfig}));
  const templatedHtml = template({body: html, initialState: JSON.stringify(initialState)});
  res.send(templatedHtml);
};

app.get('/favicon.ico', function(req, res) {
  res.send(204);
});

app.get('/', (req, res) => {
  renderApplication(req.url, res);
});

exports.app = functions.https.onRequest(app);
