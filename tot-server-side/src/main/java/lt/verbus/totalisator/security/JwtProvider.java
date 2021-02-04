package lt.verbus.totalisator.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lt.verbus.totalisator.domain.entity.User;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JwtProvider {
    @Value("#{${security.jwt.expire-in-mins} * 60000}")
    private long validityInMilis;

    @Value("${security.jwt.secret-key}")
    private byte[] secret;

    public String createToken(User user) {

        Date now = new Date();

        return Jwts.builder()
                .signWith(Keys.hmacShaKeyFor(secret), SignatureAlgorithm.HS512)
                .setHeaderParam("typ", "JWT")
                .setIssuer("totalisator-api")
                .setAudience("totalisator-front")
                .setIssuedAt(now)
                .setSubject(user.getUsername())
                .setExpiration(new Date(now.getTime() + validityInMilis))
                .claim("roles", user.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toList()))
                .claim("userId", user.getId())
                .compact();
    }

    public Authentication getAuthentication(String jwt) {

        // parse & validate JWT
        Jws<Claims> parsedJwt = Jwts.parserBuilder()
                .setSigningKey(secret)
                .build()
                .parseClaimsJws(jwt);

        String username = parsedJwt.getBody().getSubject();

        List<GrantedAuthority> roles = ((List<String>) parsedJwt.getBody().get("roles")).stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        Long userId = parsedJwt.getBody().get("userId", Long.class);

        // create Authentication
        if (StringUtils.isNotEmpty(username)) {
            return new UsernamePasswordAuthenticationToken(User.builder().id(userId).username(username).build(), null, roles);
        }

        return null;
    }
}
