package myapp.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import myapp.model.Account;

public interface AccountRepository extends CrudRepository<Account, Long> {

    List<Account> findByUsername(String username);
}