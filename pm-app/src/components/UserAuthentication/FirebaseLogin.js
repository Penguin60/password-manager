import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { useEffect } from "react";
import { app } from "../../firebase/Firebase";
import firebase from "firebase/compat/app";

const FirebaseLogin = (props) => {
  useEffect(() => {
    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(props.auth);

    ui.start(".loginUI", {
      callbacks: {
        uiShown: function () {
          // Apply custom CSS styles to the FirebaseUI widget
          document.body.style.backgroundImage = "white";
          document.body.style.backgroundSize = "cover";
          document.body.style.backgroundRepeat = "no-repeat";
          document.body.style.backgroundPosition = "center";
          document.body.style.display = "flex";
          document.body.style.justifyContent = "center";
          document.body.style.alignItems = "center";
          document.body.style.height = "100vh";
          document.body.style.margin = "0";
          document.body.style.padding = "0";
          document.querySelector(".loginUI").style.width = "100%";
          document.querySelector(".loginUI").style.maxWidth = "400px";
          document.querySelector(".loginUI").style.margin = "0 auto";
          document.querySelector(".loginUI").style.padding = "20px";
          document.querySelector(".loginUI").style.borderRadius = "10px";
          document.querySelector(".loginUI").style.boxSizing = "border-box";
          document.querySelector(".loginUI").style.backgroundColor = "white";
          document.querySelector(".loginUI").style.boxShadow =
            "0px 4px 8px rgba(0, 0, 0, 0.2)";
        },
      },
      signInFlow: "popup",
      signInOptions: [
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: false,
        },
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          requireDisplayName: false,
        },
      ],
    });
    return () => {
      document.body.style = "";
    };
  }, [props.auth]);

  return (
    <div className="loginUI">
      <h1>Log In</h1>
      <div></div>
    </div>
  );
};

export default FirebaseLogin;
