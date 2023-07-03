package com.dean.api.account;

import com.dean.api.model.Account;
import com.dean.api.service.AccountService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/account")
@CrossOrigin
@AllArgsConstructor
public class AccountController {

    private AccountService accountService;

    @PostMapping("/newAccount")
    public ResponseEntity<String> addAccount(AccountDTO account) {
        return ResponseEntity.ok(accountService.addAccount(account));
    }

    @GetMapping("/getAccounts")
    public ResponseEntity<List<AccountDTO>> getAccounts() {
        return ResponseEntity.ok(accountService.getAccounts());
    }

    @PostMapping("/removeAccount")
    public ResponseEntity<String> removeAccount(Integer id) {
        return ResponseEntity.ok(accountService.removeAccount(id));
    }

    @PostMapping("/editAccount")
    public ResponseEntity<String> editAccount(AccountDTO account, @RequestParam("prevId") String deleteId) {
        return ResponseEntity.ok(accountService.editAccount(account, Integer.valueOf(deleteId)));
    }

    @GetMapping("/getCategories")
    public ResponseEntity<List<String>> getCategories() {
        return ResponseEntity.ok(accountService.getCategories());
    }

    @PostMapping("/favouriteAccount")
    public ResponseEntity<String> favouriteAccount(Integer id) {
        return ResponseEntity.ok(accountService.favouriteAccount(id));
    }

}
