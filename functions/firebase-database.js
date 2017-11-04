const firebase = global.firebase || require('firebase');

const initializeApp = config => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(config);
  }
};

const getAllTweets = () => {
  return firebase.database()
    .ref('/tweets')
    .orderByChild('created_at')
    .limite
    .once('value')
    .then(snap => {
      return {tweets: snap.children()};
    });
};

const searchTweets = (queryText) => {
  if (!queryText) {
    return {tweets: null}
  }
  return firebase.database()
    .ref('/tweets')
    .orderByChild('created_at')
    .limitToFirst(10)
    .once('value')
    .then(snap => {
      return {tweets: snap.val()};
    });
}

module.exports = {
  initializeApp,
  getAllTweets,
  searchTweets
}
