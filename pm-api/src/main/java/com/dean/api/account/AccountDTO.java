package com.dean.api.account;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AccountDTO {

    private String name;

    private String userName;

    private String password;

    private Integer id;

    private String category;

    private Boolean favourite;

}
