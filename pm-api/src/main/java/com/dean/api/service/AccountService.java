package com.dean.api.service;

import com.dean.api.account.AccountDTO;
import com.dean.api.model.Account;

import java.util.List;

public interface AccountService {

    String addAccount(AccountDTO account);

    List<AccountDTO> getAccounts();

    String removeAccount(Integer id);

    String editAccount(AccountDTO account, Integer prevId);

    List<String> getCategories();

    String favouriteAccount(Integer id);

    Boolean validatePassword(String password);

    String returnPassword(Integer id);

}
