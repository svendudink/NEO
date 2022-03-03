let saveItems = document.getElementById("saveItems");

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

export {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
};

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
  } else {
    googleLogin.innerHTML = "Login with google";
  }
}

// Saves a new message to Cloud Firestore.
async function SaveThoseNEOS(fields) {
  // Add a new message entry to the Firebase database.
  try {
    await addDoc(collection(getFirestore(), "NeoUserFields"), {
      name: getUserName(),
      text: fields,
      profilePicUrl: getProfilePicUrl(),
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error writing new message to Firebase Database", error);
  }
}
