import "./App.css";
import React, { useState, useEffect, useCallback } from "react";
import Account from "./Account";

const AccountDisplay = ({ accounts, setAccounts }) => {
  useEffect(() => {
    fetch("http://192.168.11.11:8080/account/getAccounts")
      .then((response) => response.json())
      .then((data) => setAccounts(data));
  }, []);

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
        />
      ))}
    </>
  );
};

export default AccountDisplay;
