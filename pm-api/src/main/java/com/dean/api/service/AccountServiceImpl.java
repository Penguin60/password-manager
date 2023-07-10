package com.dean.api.service;

import com.dean.api.account.AccountDTO;
import com.dean.api.model.Account;
import com.dean.api.repository.AccountRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AccountServiceImpl implements AccountService{
    private AccountRepository accountRepository;

    @Override
    public String addAccount(AccountDTO account) {
        Account newAccount = Account.builder()
                .accountName(account.getName())
                .username(account.getUserName())
                .password(account.getPassword())
                .category(account.getCategory())
                .favourite(account.getFavourite())
                .build();
        accountRepository.save(newAccount);
        return "Created New Account";
    }

    @Override
    public List<AccountDTO> getAccounts() {
         return accountRepository.findAll().stream().map(acc ->
                 AccountDTO.builder()
                         .name(acc.getAccountName())
                         .userName(acc.getUsername())
                         .password(acc.getPassword())
                         .category(acc.getCategory())
                         .id(acc.getAccountId())
                         .favourite(acc.getFavourite())
                         .build()).collect(Collectors.toList());
    }

    @Override
    public String removeAccount(Integer id) {
        accountRepository.deleteById(id);
        return "Deleted Sucessfully";
    }

    @Override
    public String editAccount(AccountDTO account, Integer prevId) {

        Account newAccount = accountRepository.getReferenceById(prevId);

        newAccount.setAccountName(account.getName());
        newAccount.setUsername(account.getUserName());
        newAccount.setPassword(account.getPassword());
        newAccount.setCategory(account.getCategory());
        newAccount.setFavourite(account.getFavourite());
        accountRepository.save(newAccount);

        return "Edited Account";
    }

    @Override
    public List<String> getCategories() {
        return accountRepository.findUniqueCategories();
    }

    @Override
    public String favouriteAccount(Integer id) {

        Account account = accountRepository.getReferenceById(id);

        boolean status = account.getFavourite();

        account.setFavourite(!status);

        accountRepository.save(account);

        return String.valueOf(status);
    }

    @Override
    public Boolean validatePassword(String password) {

        boolean result = false;

        if (Objects.equals(password, "8xn8wvpm")) {
            result = true;
        }

        return result;
    }

    @Override
    public String returnPassword(Integer id) {
        return accountRepository.findById(id).get().getPassword();
    }
}
