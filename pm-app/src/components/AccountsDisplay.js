import React, { useState, useEffect, useCallback } from "react";
import Account from "./Account";
import AddButton from "./AddButton";

const AccountDisplay = ({ accounts, setAccounts }) => {

  useEffect(() => {
      fetch("http://localhost:8080/account/getAccounts")
        .then((response) => response.json())
        .then((data) => setAccounts(data));
  }, []);

  const updateAccounts = () => {

      fetch("http://localhost:8080/account/getAccounts")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setAccounts(data)
        })
  }

  return (
    <>
      {accounts.map((account) => (
        <Account
          id={account.id}
          name={account.name}
          userName={account.userName}
          password={account.password}
          category={account.category}
          favourite={account.favourite}
          onUpdate={updateAccounts}
        />
      ))}
      <AddButton onUpdate={updateAccounts}/>
    </>
  );
};

export default AccountDisplay;
