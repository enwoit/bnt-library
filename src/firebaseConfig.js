const VueFire = require('vuefire')
const firebase = require('firebase')

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCdnXgdYKmneNnhkH8TuZIB2hVuy7iQ7Q8",
    authDomain: "biblioteka-bnt.firebaseapp.com",
    databaseURL: "https://biblioteka-bnt.firebaseio.com",
    projectId: "biblioteka-bnt",
    storageBucket: "biblioteka-bnt.appspot.com",
    messagingSenderId: "982361016456"
})

const db = firebaseApp.database();