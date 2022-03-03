let saveItems = document.getElementById("saveItems");
let myGoogleButton = document.getElementById("myGoogleButton");
let neosys = document.getElementById("neosys");
let NeoUserFields;
let myLoadButton = document.getElementById("myLoadButton");
let userName;
let userData;
let time;

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
const firebaseConfig = {
  apiKey: "AIzaSyDa0nouHGxaK074lR-w-8f0EUfLeblKq9c",
  authDomain: "neowarning-9e02d.firebaseapp.com",
  projectId: "neowarning-9e02d",
  storageBucket: "neowarning-9e02d.appspot.com",
  messagingSenderId: "386552954867",
  appId: "1:386552954867:web:ad22ddff3a7085666cdc86",
};
const app = initializeApp(firebaseConfig);

import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/9.6.7/firebase-firestore.js";

googleLogin.addEventListener("click", googleClick);
// Signs-out of Friendly Chat.
// Signs-in Friendly Chat.
async function signIn() {
  // Sign in Firebase using popup auth and Google as the identity provider.
  let provider = new GoogleAuthProvider();
  await signInWithPopup(getAuth(), provider);
}

function googleClick() {
  if (googleLogin.innerHTML == "Login with google") {
    signIn();
  } else {
    signOutUser();
  }
}

// Signs-out of Friendly Chat.
function signOutUser() {
  // Sign out of Firebase.
  signOut(getAuth());
}

initFirebaseAuth();
function initFirebaseAuth() {
  // Listen to auth state changes.
  onAuthStateChanged(getAuth(), authStateObserver);
}

function getUserName() {
  return getAuth().currentUser.displayName;
}

function isUserSignedIn() {
  return !!getAuth().currentUser;
}

function authStateObserver() {
  if (isUserSignedIn() == true) {
    googleLogin.innerHTML = `Welcome ${getUserName()}. Click her to Log out`;
    saveItems.style.visibility = "visible";
  } else {
    googleLogin.innerHTML = "Login with google";
    saveItems.style.visibility = "hidden";
  }
}

// Saves a new message to Cloud Firestore.
async function SaveThoseNEOS(fields) {
  // Add a new message entry to the Firebase database.
  try {
    await addDoc(collection(getFirestore(), "NeoUserFields"), {
      name: getUserName(),
      text: fields,
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error writing new message to Firebase Database", error);
  }
}

myGoogleButton.addEventListener("click", googleSave);

function googleSave() {
  let temp = JSON.stringify(neosys.innerHTML);
  SaveThoseNEOS(temp);
}
loadNeos();
// Loads chat messages history and listens for upcoming ones.
function loadNeos() {
  // Create the query to load the last 12 messages and listen for new ones.
  const recentMessagesQuery = query(
    collection(getFirestore(), "NeoUserFields"),
    orderBy("timestamp", "desc"),
    limit(2)
  );
  // Start listening to the query.
  onSnapshot(recentMessagesQuery, function (snapshot) {
    userName =
      snapshot._snapshot.docChanges[0].doc.data.value.mapValue.fields.name;
    userData = JSON.parse(
      snapshot._snapshot.docChanges[0].doc.data.value.mapValue.fields.text
        .stringValue
    );
    time =
      snapshot._snapshot.docChanges[0].doc.data.value.mapValue.fields.timestamp;
  });
}

myLoadButton.addEventListener("click", listenneo);

function listenneo() {
  neosys.innerHTML = userData;
}

//show hide view last saved search button
function showAndHide() {
  if (userdata == "undefined") console.log("letmed");
}
//end of show hide view last saved search button
