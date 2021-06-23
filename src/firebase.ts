// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from 'firebase/app';

// Add the Firebase services that you want to use
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/functions';
import 'firebase/storage';

export class Firebase {
  private firebaseConfig = {
    apiKey: 'AIzaSyDuffj-xTMV6_hfGxPRzXsPe1XUeJux1LU',
    authDomain: 'fir-pwa-empty.firebaseapp.com',
    projectId: 'fir-pwa-empty',
    storageBucket: 'fir-pwa-empty.appspot.com',
    messagingSenderId: '178771235375',
    appId: '1:178771235375:web:bf995f663ffadd027b6cda',
  };

  private app;
  public auth;
  public realtimeDb;
  public firestore;
  public firestoreInstance;
  public realtimeDbInstance;
  public functions;
  public storage;

  constructor() {
    // Initialize Firebase
    this.app = firebase.initializeApp(this.firebaseConfig);
    this.firestoreInstance = firebase.firestore;
    this.realtimeDbInstance = firebase.database;
    this.auth = firebase.auth();
    this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    this.firestore = firebase.firestore();
    this.functions = firebase.functions();
    this.realtimeDb = firebase.database();
    this.storage = firebase.storage;
  }

  public reInitiateApp() {
    // Initialize Firebase
    this.app.database().goOffline();
    this.app.delete().then(() => {
      this.app = firebase.initializeApp(this.firebaseConfig);
      this.app.database().goOnline();
      this.auth = this.app.auth();
      this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      this.firestore = this.app.firestore();
      this.functions = this.app.functions();
      this.realtimeDb = this.app.database();
      // this.storage = this.app.storage;
    });
  }
}

const fb = new Firebase();
export { fb };
