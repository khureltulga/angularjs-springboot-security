package myapp.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import myapp.model.Account;
import myapp.model.UserRole;
import myapp.repository.AccountRepository;

@Service("userDetailsService")
public class MyUserDetailsService implements UserDetailsService {

	@Autowired
	private AccountRepository AccountRepository;

	@Transactional(readOnly=true)
	@Override
	public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException {
	
		List<Account> user = AccountRepository.findByUsername(username);
		Account account = null;
		if (user.size() > 0){
			account = user.get(0);
		}
		//System.out.println("=== LOGGED IN " + account.getFirstname() + " " + account.getLastname() + " " + account.getEmail() + " ===");
		List<GrantedAuthority> authorities = buildUserAuthority(account.getUserRoles());
		/*for(GrantedAuthority a : authorities){
			System.out.println("=== ROLE : " + a.toString() + " ===");
		}*/
		return buildUserForAuthentication(account, authorities);
	}

	private User buildUserForAuthentication(Account account, List<GrantedAuthority> authorities) {
		return new User(account.getUsername(), account.getPassword(), true, true, true, true, authorities);
	}

	private List<GrantedAuthority> buildUserAuthority(List<UserRole> list) {
		Set<GrantedAuthority> setAuths = new HashSet<GrantedAuthority>();
		for (UserRole userRole : list) {
			setAuths.add(new SimpleGrantedAuthority(userRole.getRole().getName()));
		}
		List<GrantedAuthority> Result = new ArrayList<GrantedAuthority>(setAuths);
		return Result;
	}

}