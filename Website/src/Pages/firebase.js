import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/performance';

firebase.initializeApp({
    apiKey: "AIzaSyCTr1p2ncqxzhyqCTkAM6T-kRloXX8NHEQ",
    authDomain: "gradproj-bb312.firebaseapp.com",
    databaseURL: "https://gradproj-bb312-default-rtdb.firebaseio.com",
    projectId: "gradproj-bb312",
    storageBucket: "gradproj-bb312.appspot.com",
    messagingSenderId: "992562444182",
    appId: "1:992562444182:web:6576b481ca9c9b76044fb7"

});


const auth=firebase.auth();
const db =firebase.firestore();
const firestore=firebase.firestore();
const storage=firebase.storage();
const performance=firebase.performance();
export {storage,auth,db,performance, firebase as default};
