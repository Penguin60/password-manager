import { db } from "./Firebase"
import "firebase/firestore";
import {
  where,
  doc,
  setDoc,
  addDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

export const loadAccounts = async () => {
  const accountsList = await getDocs(collection(db, "accounts"));

  const accountsArray = new Array();

  let i = 0;

  accountsList.docs.forEach((doc) => {
    const accountId = {
      id: doc.id,
    };

    const tempAccount = { ...doc.data(), ...accountId };

    accountsArray[i] = tempAccount;
    i++;
  });

  return accountsArray;
};

export const addAccount = async (name, userName, password, category) => {
  const docRef = await addDoc(collection(db, "accounts"), {
    name: name,
    userName: userName,
    password: password,
    category: category,
    favourite: false,
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
  const accountsList = await getDocs(collection(db, "accounts"));

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
