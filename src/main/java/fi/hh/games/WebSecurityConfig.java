package fi.hh.games;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;


@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	    @Autowired
	    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
	        auth
	                .inMemoryAuthentication()
	                .withUser("Admin").password("Admin").roles("ADMIN");
	    }



	    @Override
	    protected void configure(HttpSecurity http) throws Exception {
	        http
	                .authorizeRequests()
	                .antMatchers("/public/**").permitAll()
	                .anyRequest().authenticated()
	                .and()
	                .formLogin()
	                .defaultSuccessUrl("/index", true)
	                .permitAll()
	                .and()
	                .httpBasic()
	                .and()
	                .csrf().disable()
	                .logout()
	                .logoutSuccessUrl("/");
	    }

	    @Override
	    public void configure(WebSecurity web) throws Exception {
	        web.debug(true);
	    }
	}
