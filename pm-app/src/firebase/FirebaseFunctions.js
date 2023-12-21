import { db } from "./Firebase";
import "firebase/firestore";
import {
  where,
  doc,
  setDoc,
  addDoc,
  getDoc,
  deleteDoc,
  collection,
  getDocs,
  query,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import firebase from "firebase/compat/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const loadAccounts = async () => {
  const user = firebase.auth().currentUser;

  const accountsList = await getDocs(
    query(collection(db, "accounts"), where("userId", "==", user.email))
  );

  const accountsArray = new Array();

  let i = 0;

  accountsList.forEach((doc) => {
    const accountId = {
      id: doc.id,
    };

    const tempAccount = { ...doc.data(), ...accountId };

    accountsArray[i] = tempAccount;
    i++;
  });

  return accountsArray;
};

export const addAccount = async (
  name,
  userName,
  password,
  category,
  imageID
) => {
  const docRef = await addDoc(collection(db, "accounts"), {
    name: name,
    userName: userName,
    password: password,
    category: category,
    imageID: imageID,
    favourite: false,
    userId: getAuth().currentUser.email,
  });
};

export const favouriteAccount = (id, favourited, setFavourited) => {
  const accountRef = doc(db, "accounts", id);

  setDoc(accountRef, { favourite: !favourited }, { merge: true });
  setFavourited(!favourited);
};

export const deleteAccount = async (id) => {
  await deleteDoc(doc(db, "accounts", id));
};

export const returnPassword = async (id) => {
  const accountRef = doc(db, "accounts", id);
  const account = await getDoc(accountRef);

  navigator.clipboard.writeText(account.data().password);
};

export const loadCategories = async () => {
  const user = firebase.auth().currentUser;

  const accountsList = await getDocs(
    query(collection(db, "accounts"), where("userId", "==", user.email))
  );

  const categoriesArray = new Array();

  let i = 0;

  accountsList.docs.forEach((doc) => {
    const account = doc.data();

    const category = account.category;

    if (!categoriesArray.includes(category)) {
      categoriesArray[i] = category;
    }

    i++;
  });

  return categoriesArray;
};

export const createUser = (email, password) => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user.getIdToken);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
    });
};

export const loginUser = (email, password) => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return true;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
      return false;
    });
  return true;
};

export const uploadProfilePicture = (file, id) => {
  const auth = getAuth();
  const user = auth.currentUser.email;

  const storage = getStorage();
  const storageRef = ref(storage, "profilePictures/" + user + "/" + id);

  uploadBytes(storageRef, file).then((snapshot) => {
    console.log("Uploaded a blob or file!");
  });
};

export const getImage = (imageID) => {
  const auth = getAuth();
  const user = auth.currentUser.email;

  const storage = getStorage();
  const storageRef = ref(storage, "profilePictures/" + user + "/" + imageID);

  // Get the download URL
  return getDownloadURL(storageRef)
    .then((url) => {
      return url;
    })
    .catch((error) => {
      console.error('Error getting download URL: ', error);
    });
};