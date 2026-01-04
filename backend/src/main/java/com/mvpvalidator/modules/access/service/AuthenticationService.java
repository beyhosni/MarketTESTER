package com.mvpvalidator.modules.access.service;

import com.mvpvalidator.config.security.JwtUtils;
import com.mvpvalidator.modules.access.domain.Role;
import com.mvpvalidator.modules.access.domain.Tenant;
import com.mvpvalidator.modules.access.domain.User;
import com.mvpvalidator.modules.access.repository.TenantRepository;
import com.mvpvalidator.modules.access.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final TenantRepository tenantRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        // 1. Create Tenant
        var tenant = Tenant.builder()
                .name(request.getTenantName())
                .build();
        tenantRepository.save(tenant);

        // 2. Create User
        var user = User.builder()
                .tenant(tenant)
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.OWNER)
                .build();
        userRepository.save(user);

        // 3. Generate Token
        var jwtToken = jwtUtils.generateToken(user, tenant.getId(), user.getId());
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        var user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtUtils.generateToken(user, user.getTenant().getId(), user.getId());
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
