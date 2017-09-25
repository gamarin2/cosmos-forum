import * as firebase from 'firebase'

// Initialize Firebase
let config = {
  apiKey: 'AIzaSyDXTr5KYSyxgQxmwKf47hayMMrxerIJmeg',
  authDomain: 'cosmos-forum.firebaseapp.com',
  databaseURL: 'https://cosmos-forum.firebaseio.com',
  projectId: 'cosmos-forum',
  storageBucket: 'cosmos-forum.appspot.com',
  messagingSenderId: '378820889347'
}

firebase.initializeApp(config)

// let auth = firebase.auth()
// let db = firebase.database()
// let storage = firebase.storage

export default firebase

