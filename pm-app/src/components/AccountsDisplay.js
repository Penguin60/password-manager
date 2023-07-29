import React, { useState, useEffect, useCallback } from "react";
import Account from "./Account";
import AddButton from "./AddButton";

const AccountDisplay = ({ accounts, setAccounts }) => {

  return (
    <div className="accounts">
      {accounts.map((account) => (
        <Account
          id={account.id}
          name={account.name}
          userName={account.userName}
          password={account.password}
          category={account.category}
          favourite={account.favourite}
          setAccounts={setAccounts}
        />
      ))}
      <AddButton setAccounts={setAccounts}/>
    </div>
  );
};

export default AccountDisplay;
