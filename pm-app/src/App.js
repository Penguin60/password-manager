import "./App.css";
import FirebaseLogin from "./components/UserAuthentication/FirebaseLogin";
import PasswordManager from "./components/PasswordManager";
import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true)
        setUser(user.email);
        console.log(user.email);
      } else {
        setUser("")
        setLoggedIn(false)
      }
    });
  });

  return (
    <div className="App">
      {!loggedIn && <FirebaseLogin auth={firebase.auth()} />}
      {loggedIn && <PasswordManager userEmail={user} />}
    </div>
  );
}

export default App;
