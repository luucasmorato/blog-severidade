var firebase = require("firebase-admin");

var serviceAccount = require("./firebasekey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://blogseveridade.firebaseio.com"
});

module.exports = firebase;