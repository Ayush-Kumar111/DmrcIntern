
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-auth.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.8.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD2TvE3Jz-Z4-psi8zGRwajv2olKme-g1E",
  authDomain: "dmrclogin.firebaseapp.com",
  databaseURL: "https://dmrclogin-default-rtdb.firebaseio.com",
  projectId: "dmrclogin",
  storageBucket: "dmrclogin.appspot.com",
  messagingSenderId: "488751840859",
  appId: "1:488751840859:web:074348edecb8f1ce46497e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
let signinButton = document.getElementById("signin-button");
let signupButton = document.getElementById("signup-button");

signupButton.addEventListener("click", (e) => {
  console.log("signup click 1");
  let name = document.getElementById("name").value;
  let nohp = document.getElementById("nohp").value;
  let emailSignup = document.getElementById("email_signup").value;
  let passwordSignup = document.getElementById("psw_signup").value;
  console.log("signup click");
  createUserWithEmailAndPassword(auth, emailSignup, passwordSignup)
    .then((userCredential) => {
      
      const user = userCredential.user;

      set(ref(database, "users/" + user.uid), {
        name: name,
        nohp: nohp,
        email: emailSignup,
        password: passwordSignup
      })
        .then(() => {
          
          alert("user's data saved successfully!!!");
        })
        .catch((error) => {
          
          alert(error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      console.log(errorCode);
      alert(errorMessage);
    });
});

signinButton.addEventListener("click", (e) => {
  console.log("signin click 1");
  let emailSignin = document.getElementById("email_signin").value;
  let passwordSignin = document.getElementById("psw_signin").value;
  console.log("signin click");
  signInWithEmailAndPassword(auth, emailSignin, passwordSignin)
    .then((userCredential) => {
      
      const user = userCredential.user;
      let lgDate = new Date();
      update(ref(database, "users/" + user.uid), {
        last_login: lgDate
      })
        .then(() => {
          
          location.href = "dmrccode/index.html";
        })
        .catch((error) => {
          
          alert(error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
  signOut(auth)
    .then(() => {})
    .catch((error) => {});
});
