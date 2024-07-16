package nus.mini.backend.configurations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    // @Autowired
    // private JwtAuthEntryPoint point;
    @Autowired
    private JwtRequestFilter filter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        ///////////// To implement for JWT check on every request
        // http.csrf(csrf -> csrf.disable())
        //         .authorizeRequests()
        //         .requestMatchers("/login").permitAll()
        //         .requestMatchers("/signup").permitAll()
        //         .requestMatchers("/recover").permitAll()
        //         .anyRequest().authenticated()
        //         .and().exceptionHandling(ex -> ex.authenticationEntryPoint((AuthenticationEntryPoint) point))
        //         .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        // http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
        // return http.build();

        http.csrf(csrf -> csrf.disable())
                .authorizeRequests()
                .anyRequest().permitAll()
                .and().exceptionHandling(ex -> {})
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
